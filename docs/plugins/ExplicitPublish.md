---
title: ExplicitPublish
tags:
  - plugin/filter
---

Este plugin filtra el contenido basándose en una bandera explícita `publish` en el _frontmatter_, permitiendo que solo pase el contenido que esté marcado explícitamente para su publicación. Es la versión de inclusión voluntaria (_opt-in_) de [[RemoveDrafts]]. Consulta [[private pages]] para obtener más información.

> [!note]  
> Para información sobre cómo agregar, eliminar o configurar plugins, consulta la página [[configuration#Plugins|Configuration]].

Este plugin no tiene opciones de configuración.

## API

- Categoría: Filter
    
- Nombre de la función: `Plugin.ExplicitPublish()`
    
- Código fuente: `quartz/plugins/filters/explicit.ts` ([https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/filters/explicit.ts](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/filters/explicit.ts))