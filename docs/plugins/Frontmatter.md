---
title: "Frontmatter"
tags:
  - plugin/transformer
---

Este plugin analiza el _frontmatter_ de la página utilizando la biblioteca [gray-matter](https://github.com/jonschlinkert/gray-matter). Consulta [[authoring content#Syntax]], [[Obsidian compatibility]] y [[OxHugo compatibility]] para más información.

> [!note]  
> Para obtener información sobre cómo agregar, eliminar o configurar plugins, consulta la página de [[configuration#Plugins|Configuration]].

Este plugin acepta las siguientes opciones de configuración:

- `delimiters`: delimitadores utilizados para el _frontmatter_. Puede tener un solo valor (por ejemplo, `"---"`) o valores distintos para el delimitador de apertura y cierre (por ejemplo, `["---", "~~~"]`). El valor predeterminado es `"---"`.
    
- `language`: lenguaje utilizado para analizar el _frontmatter_. Puede ser `yaml` (valor predeterminado) o `toml`.
    

> [!warning]  
> Este plugin no debe eliminarse; de lo contrario, Quartz dejará de funcionar.

---

## Lista

Quartz admite los siguientes campos de _frontmatter_:

- title
    
    - `title`
        
- description
    
    - `description`
        
- permalink
    
    - `permalink`
        
- comments
    
    - `comments`
        
- lang
    
    - `lang`
        
- publish
    
    - `publish`
        
- draft
    
    - `draft`
        
- enableToc
    
    - `enableToc`
        
- tags
    
    - `tags`
        
    - `tag`
        
- aliases
    
    - `aliases`
        
    - `alias`
        
- cssclasses
    
    - `cssclasses`
        
    - `cssclass`
        
- socialDescription
    
    - `socialDescription`
        
- socialImage
    
    - `socialImage`
        
    - `image`
        
    - `cover`
        
- created
    
    - `created`
        
    - `date`
        
- modified
    
    - `modified`
        
    - `lastmod`
        
    - `updated`
        
    - `last-modified`
        
- published
    
    - `published`
        
    - `publishDate`
        
    - `date`
        

---

## API

- **Categoría:** Transformer
    
- **Nombre de la función:** `Plugin.Frontmatter()`
    
- **Fuente:** [`quartz/plugins/transformers/frontmatter.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/frontmatter.ts)