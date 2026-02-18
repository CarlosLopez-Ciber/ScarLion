---
title: Favicon
tags:
  - plugin/emitter
---

Este plugin genera un archivo `favicon.ico` dentro de la carpeta `public`. Crea el favicon a partir de `icon.png`, ubicado en la carpeta `quartz/static`. El plugin redimensiona `icon.png` a 48x48 px para que el archivo resultante sea lo más pequeño posible.

> **Nota**  
> Para obtener información sobre cómo agregar, eliminar o configurar plugins, consulta la página de [Configuration](https://quartz.jzhao.xyz/configuration#plugins).

Este plugin no tiene opciones de configuración.

---

## API

- **Categoría:** Emitter
    
- **Nombre de la función:** `Plugin.Favicon()`
    
- **Fuente:** [`quartz/plugins/emitters/favicon.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/favicon.ts)