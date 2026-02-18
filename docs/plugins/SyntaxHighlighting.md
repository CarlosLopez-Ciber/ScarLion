---
title: "SyntaxHighlighting"
tags:
  - plugin/transformer
---

Este plugin se utiliza para agregar resaltado de sintaxis a los bloques de código en Quartz. Consulta [[syntax highlighting]] para obtener más información.

> [!note]  
> Para información sobre cómo agregar, eliminar o configurar plugins, consulta la página [[configuration#Plugins|Configuration]].

Este plugin acepta las siguientes opciones de configuración:

- `theme`: identificador de uno de los [temas incluidos con Shikiji](https://shikiji.netlify.app/themes). Se define uno para el modo claro y otro para el modo oscuro.  
    Por defecto:  
    `theme: { light: "github-light", dark: "github-dark" }`.
    
- `keepBackground`: si se establece en `true`, se utilizará el fondo del tema de Shikiji. Con `false` (valor por defecto), se utilizará en su lugar el color de fondo del tema de Quartz.
    

Además, puedes sobrescribir los colores en el archivo `quartz/styles/syntax.scss`.

## API

- Categoría: Transformer
    
- Nombre de la función: `Plugin.SyntaxHighlighting()`
    
- Código fuente: `quartz/plugins/transformers/syntax.ts` ([https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/syntax.ts](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/syntax.ts))
