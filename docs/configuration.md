---
title: Configuration
---

Quartz está diseñado para ser extremadamente configurable, incluso si no sabes programar. La mayor parte de la configuración que necesitarás puede realizarse simplemente editando `quartz.config.ts` o modificando [[layout|el layout]] en `quartz.layout.ts`.

> [!tip]  
> Si editas la configuración de Quartz usando un editor de texto con soporte para TypeScript como VSCode, este te avisará cuando hayas cometido un error en tu configuración, ayudándote a evitar errores de configuración.

La configuración de Quartz puede dividirse en dos partes principales:

```ts
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

## Configuración General

Esta parte de la configuración abarca todo lo que puede afectar al sitio completo. A continuación, se detalla todo lo que puedes configurar:

- `pageTitle`: título del sitio. También se utiliza al generar el [[RSS Feed]] de tu sitio.
    
- `pageTitleSuffix`: cadena que se añade al final del título de la página. Solo se aplica al título de la pestaña del navegador, no al título mostrado en la parte superior de la página.
    
- `enableSPA`: habilita o deshabilita [[SPA Routing]] en tu sitio.
    
- `enablePopovers`: habilita o deshabilita las [[popover previews]] en tu sitio.
    
- `analytics`: define qué servicio de analítica utilizar en tu sitio. Los valores pueden ser:
    
    - `null`: no usar analítica;
        
    - `{ provider: 'google', tagId: '<tu-google-tag>' }`: usar Google Analytics;
        
    - `{ provider: 'plausible' }` (gestionado) o `{ provider: 'plausible', host: 'https://<tu-plausible-host>' }` (autoalojado, asegúrate de incluir el prefijo `https://`): usar [Plausible](https://plausible.io/);
        
    - `{ provider: 'umami', host: '<tu-umami-host>', websiteId: '<tu-umami-website-id>' }`: usar [Umami](https://umami.is/);
        
    - `{ provider: 'goatcounter', websiteId: 'mi-goatcounter-id' }` (gestionado) o `{ provider: 'goatcounter', websiteId: 'mi-goatcounter-id', host: 'mi-dominio-goatcounter.com', scriptSrc: 'https://mi-url.to/counter.js' }` (autoalojado): usar [GoatCounter](https://goatcounter.com/);
        
    - `{ provider: 'posthog', apiKey: '<tu-posthog-project-apiKey>', host: '<tu-posthog-host>' }`: usar [Posthog](https://posthog.com/);
        
    - `{ provider: 'tinylytics', siteId: '<tu-site-id>' }`: usar [Tinylytics](https://tinylytics.app/);
        
    - `{ provider: 'cabin' }` o `{ provider: 'cabin', host: 'https://cabin.example.com' }` (dominio personalizado): usar [Cabin](https://withcabin.com/);
        
    - `{ provider: 'clarity', projectId: '<tu-clarity-id-code>' }`: usar [Microsoft Clarity](https://clarity.microsoft.com/). El ID del proyecto se encuentra en la parte superior de la página de resumen.
        
    - `{ provider: 'matomo', siteId: '<tu-matomo-id-code>', host: 'matomo.example.com' }`: usar [Matomo](https://matomo.org/), sin protocolo.
        
    - `{ provider: 'vercel' }`: usar [Vercel Web Analytics](https://vercel.com/docs/concepts/analytics).
        
    - `{ provider: 'rybbit', siteId: 'mi-rybbit-id' }` (gestionado) o `{ provider: 'rybbit', siteId: 'mi-rybbit-id', host: 'mi-dominio-rybbit.com' }` (autoalojado): usar [Rybbit](https://rybbit.com/);
        
- `locale`: se utiliza para [[i18n]] y el formateo de fechas.
    
- `baseUrl`: se usa para mapas del sitio (sitemaps) y feeds RSS que requieren una URL absoluta para identificar el “hogar” canónico de tu sitio. Normalmente es la URL donde está desplegado tu sitio (por ejemplo, `quartz.jzhao.xyz` para este sitio). No incluyas el protocolo (es decir, `https://`) ni barras iniciales o finales.
    
    - También debe incluir el subpath si estás [[hosting]] en GitHub Pages sin un dominio personalizado. Por ejemplo, si mi repositorio es `jackyzha0/quartz`, GitHub Pages lo desplegaría en `https://jackyzha0.github.io/quartz` y el `baseUrl` sería `jackyzha0.github.io/quartz`.
        
    - Ten en cuenta que Quartz 4 intentará evitar usar esta propiedad siempre que sea posible y utilizará URLs relativas para asegurarse de que tu sitio funcione sin importar dónde lo despliegues.
        
- `ignorePatterns`: lista de patrones [glob](https://en.wikipedia.org/wiki/Glob_\(programming\)) que Quartz debe ignorar y no examinar al buscar archivos dentro de la carpeta `content`. Consulta [[private pages]] para más detalles.
    
- `defaultDateType`: define si se debe usar la fecha de creación, modificación o publicación como fecha predeterminada a mostrar en las páginas y listados.
    
- `theme`: configura la apariencia del sitio.
    
    - `cdnCaching`: si es `true` (por defecto), usa Google CDN para almacenar en caché las fuentes. Generalmente será más rápido. Desactívalo (`false`) si quieres que Quartz descargue las fuentes para que el sitio sea completamente autónomo.
        
    - `typography`: define qué fuentes utilizar. Cualquier fuente disponible en [Google Fonts](https://fonts.google.com/) funciona aquí.
        
        - `title`: fuente para el título del sitio (opcional, por defecto es la misma que `header`)
            
        - `header`: fuente para los encabezados
            
        - `code`: fuente para código en línea y bloques
            
        - `body`: fuente para el contenido general
            
    - `colors`: controla la tematización del sitio.
        
        - `light`: fondo de la página
            
        - `lightgray`: bordes
            
        - `gray`: enlaces del grafo, bordes más marcados
            
        - `darkgray`: texto del cuerpo
            
        - `dark`: texto de encabezados e íconos
            
        - `secondary`: color de enlaces, nodo actual en [[graph view|graph]]
            
        - `tertiary`: estados hover y nodos visitados en [[graph view|graph]]
            
        - `highlight`: fondo de enlaces internos, texto resaltado, [[syntax highlighting|líneas de código resaltadas]]
            
        - `textHighlight`: fondo del texto resaltado en Markdown


## Plugins

Puedes pensar en los plugins de Quartz como una serie de transformaciones aplicadas sobre el contenido.

![[quartz transform pipeline.png]]

```ts
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

- [[tags/plugin/transformer|Transformers]] **mapean** el contenido (por ejemplo, analizando el _frontmatter_ o generando una descripción).
    
- [[tags/plugin/filter|Filters]] **filtran** el contenido (por ejemplo, excluyendo borradores).
    
- [[tags/plugin/emitter|Emitters]] **reducen** el contenido (por ejemplo, creando un feed RSS o páginas que listan todos los archivos con una etiqueta específica).
    

Puedes personalizar el comportamiento de Quartz agregando, eliminando y reordenando plugins en los campos `transformers`, `filters` y `emitters`.

> [!note]  
> Cada nodo es modificado por cada transformer _en orden_. Algunos transformers son sensibles a la posición, por lo que puede que necesites prestar especial atención a si deben colocarse antes o después de ciertos otros plugins.

Debes asegurarte de agregar el plugin en la sección correspondiente según su tipo. Por ejemplo, para agregar el plugin [[ExplicitPublish]] (un [[tags/plugin/filter|Filter]]), deberías añadir la siguiente línea:

```ts
filters: [
  ...
  Plugin.ExplicitPublish(),
  ...
],
```

Para eliminar un plugin, debes borrar todas sus apariciones en `quartz.config.ts`.

Para personalizar aún más los plugins, algunos permiten recibir opciones de configuración propias. Si no proporcionas una configuración, el plugin utilizará sus valores predeterminados.

Por ejemplo, el plugin [[plugins/Latex|Latex]] permite especificar el campo `renderEngine` para elegir entre Katex y MathJax:

```ts
transformers: [
  Plugin.FrontMatter(), // usa opciones por defecto
  Plugin.Latex({ renderEngine: "katex" }), // establece opciones personalizadas
]
```

Algunos plugins están incluidos por defecto en [`quartz.config.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz.config.ts), pero hay más disponibles.

Puedes ver una lista de todos los plugins y sus opciones de configuración [[tags/plugin|aquí]].

Si deseas crear tus propios plugins, consulta la guía [[making plugins|creación de plugins personalizados]].

---

## Fuentes

Las fuentes pueden especificarse como un `string` o como una `FontSpecification`:

```ts
// string
typography: {
  header: "Schibsted Grotesk",
  ...
}

// FontSpecification
typography: {
  header: {
    name: "Schibsted Grotesk",
    weights: [400, 700],
    includeItalic: true,
  },
  ...
}
```