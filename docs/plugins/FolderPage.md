---
title: FolderPage
tags:
  - plugin/emitter
---

Este plugin genera páginas índice para carpetas, creando una página de listado para cada carpeta que contenga múltiples archivos de contenido. Consulta [[folder and tag listings]] para más información.

Ejemplo: [[advanced/|Advanced]]

> [!note]  
> Para obtener información sobre cómo agregar, eliminar o configurar plugins, consulta la página de [[configuration#Plugins|Configuration]].

Las páginas se muestran utilizando `defaultListPageLayout` en `quartz.layouts.ts`. Para el contenido, se utiliza el componente `FolderContent`. Si deseas modificar el diseño (_layout_), debes editarlo directamente en `quartz/components/pages/FolderContent.tsx`.

Este plugin acepta las siguientes opciones de configuración:

- `sort`: Una función de tipo `(f1: QuartzPluginData, f2: QuartzPluginData) => number{:ts}` utilizada para ordenar las entradas. Por defecto, ordena por fecha y, en caso de empate, por orden lexicográfico.
    

---

## API

- **Categoría:** Emitter
    
- **Nombre de la función:** `Plugin.FolderPage()`
    
- **Fuente:** [`quartz/plugins/emitters/folderPage.tsx`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/folderPage.tsx)