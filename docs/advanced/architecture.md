---
title: Architecture
---

Quartz es un generador de sitios estáticos. ¿Cómo funciona?

La mejor forma de responder a esta pregunta es seguir el flujo de lo que ocurre cuando un usuario (¡tú!) ejecuta `npx quartz build` en la línea de comandos:

---

# En el servidor

1. Después de ejecutar `npx quartz build`, npm revisa el archivo `package.json` para encontrar la entrada `bin` de `quartz`, que apunta a `./quartz/bootstrap-cli.mjs`.
    
2. Este archivo contiene una línea [shebang](https://en.wikipedia.org/wiki/Shebang_\(Unix\)) al inicio que le indica a npm que debe ejecutarlo usando Node.
    
3. `bootstrap-cli.mjs` es responsable de varias tareas:
    
    1. Analizar los argumentos de la línea de comandos utilizando [yargs](http://yargs.js.org/).
        
    2. Transpilar y empaquetar el resto de Quartz (escrito en TypeScript) a JavaScript estándar utilizando [esbuild](https://esbuild.github.io/).  
        La configuración de `esbuild` aquí es especial porque también maneja importaciones de archivos `.scss` mediante [esbuild-sass-plugin v2](https://www.npmjs.com/package/esbuild-sass-plugin).  
        Además, se empaquetan scripts del lado del cliente “inline” (archivos `.inline.ts`) usando un plugin personalizado de `esbuild` que ejecuta otra instancia de `esbuild` orientada al navegador en lugar de `node`. Ambos tipos de módulos se importan como texto plano.
        
    3. Ejecutar el servidor de vista previa local si se establece la bandera `--serve`. Esto inicia dos servidores:
        
        1. Un servidor WebSocket en el puerto 3001 para manejar señales de _hot-reload_. Rastrea todas las conexiones entrantes y envía un mensaje de “rebuild” cuando detecta un cambio del lado del servidor (contenido o configuración).
            
        2. Un servidor HTTP de archivos en el puerto definido por el usuario (normalmente 8080) para servir los archivos reales del sitio web.
            
    4. Si la bandera `--serve` está activa, también inicia un observador de archivos (_file watcher_) para detectar cambios en el código fuente (`.ts`, `.tsx`, `.scss` o archivos del empaquetador).  
        Ante un cambio, se reconstruye el módulo (paso 2) usando la [API de rebuild](https://esbuild.github.io/api/#rebuild) de esbuild, lo que reduce drásticamente los tiempos de compilación.
        
    5. Tras transpilar el módulo principal (`quartz/build.ts`), se escribe en caché como `.quartz-cache/transpiled-build.mjs` y luego se importa dinámicamente con `await import(cacheFile)`.  
        Para invalidar la caché de importación de Node, se añade una cadena de consulta aleatoria para forzar a Node a tratarlo como un módulo nuevo. Esto genera pequeñas fugas de memoria (~350 kB por recarga), pero se asume que el usuario no recargará demasiadas veces la configuración en una sola sesión.  
        Finalmente, se invoca el módulo, pasándole los argumentos de la línea de comandos y una función de callback para indicar al cliente que debe refrescar.
        
4. En `build.ts`, primero se instala manualmente el soporte para _source maps_ debido al truco de invalidación de caché. Luego comienza el procesamiento del contenido:
    
    1. Limpiar el directorio de salida.
        
    2. Buscar recursivamente todos los archivos en la carpeta `content`, respetando el `.gitignore`.
        
    3. Analizar los archivos Markdown:
        
        1. Quartz detecta el número de hilos disponibles y crea _worker threads_ si hay más de 128 archivos (heurística aproximada).  
            Si se necesitan workers, se transpila `quartz/worker.ts` y se crea un _workerpool_ con distribución dinámica de trabajo en lotes de 128 archivos.
            
        2. Cada worker (o el hilo principal si no hay concurrencia) crea un parser [unified](https://github.com/unifiedjs/unified) basado en los plugins definidos en la [[configuration]].
            
        3. El proceso de análisis tiene varias etapas:
            
            1. Leer el archivo en un objeto [vfile](https://github.com/vfile/vfile).
                
            2. Aplicar transformaciones de texto definidas por plugins.
                
            3. Generar el _slug_ de la ruta del archivo y almacenarlo en sus datos. (La lógica de rutas es compleja; ver [[paths]]).
                
            4. Analizar Markdown con [remark-parse](https://www.npmjs.com/package/remark-parse) (texto → [mdast](https://github.com/syntax-tree/mdast)).
                
            5. Aplicar transformaciones Markdown→Markdown definidas por plugins.
                
            6. Convertir Markdown a HTML con [remark-rehype](https://github.com/remarkjs/remark-rehype) (mdast → [hast](https://github.com/syntax-tree/hast)).
                
            7. Aplicar transformaciones HTML→HTML definidas por plugins.
                
    4. Filtrar contenido no deseado mediante plugins.
        
    5. Emitir archivos usando plugins:
        
        1. Recolectar recursos estáticos declarados por cada plugin (CSS externo, módulos JS, etc.).
            
        2. Los emisores que generan HTML transforman el `hast` a JSX usando `hast-util-to-jsx-runtime` con el runtime de [Preact](https://preactjs.com/).  
            Luego el JSX se renderiza a HTML estático con `preact-render-to-string`.  
            Aquí también se ensamblan el [[layout]] (`quartz.layout.ts`), scripts inline y estilos transp ilados. La mayor parte de esta lógica está en `quartz/components/renderPage.tsx`.
            
            - El CSS se minimiza y transforma con [Lightning CSS](https://github.com/parcel-bundler/lightningcss).
                
            - Los scripts se dividen en `beforeDOMLoaded` (insertados en `<head>`) y `afterDOMLoaded` (insertados en `<body>`).
                
        3. Cada plugin emisor es responsable de escribir sus archivos generados en disco.
            
    6. Si `--serve` está activo, se inicia otro observador de archivos para detectar cambios en contenido (`.md`).  
        Se mantiene un mapa de contenido con el AST analizado y los datos de plugins para cada _slug_.  
        Archivos nuevos o modificados se reconstruyen y actualizan en el mapa. Luego se ejecutan filtros y emisores.  
        Este watcher usa _debounce_ de 250 ms. Si la reconstrucción es exitosa, se envía una señal al cliente para refrescar.
        

---

# En el cliente

1. El navegador abre una página de Quartz y carga el HTML.  
    El `<head>` enlaza los estilos (`public/index.css`) y el JS crítico (`public/prescript.js`).
    
2. Una vez cargado el cuerpo, el navegador carga el JS no crítico (`public/postscript.js`).
    
3. Cuando la página termina de cargarse, se dispara un evento sintético personalizado `"nav"`.  
    Esto permite que scripts del lado del cliente inicialicen comportamientos que requieren acceso al DOM.
    
    1. Si la opción [[SPA Routing|enableSPA option]] está activada en la [[configuration]], el evento `"nav"` también se dispara en cada navegación interna para permitir que los componentes registren y desregistren manejadores de eventos y estado.
        
    2. Si no está activada, el evento `"nav"` se dispara una sola vez tras la carga inicial para mantener consistencia entre entornos SPA y no-SPA.
        

---

La arquitectura y el diseño del sistema de plugins se describieron de manera general aquí, ya que se explican con mucho más detalle en la guía sobre [[making plugins|crear tu propio plugin]].