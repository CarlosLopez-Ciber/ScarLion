---
title: Callouts
tags:
  - feature/transformer
---

Quartz admite la misma sintaxis de _Admonition-callouts_ que Obsidian.

Esto incluye:

- 12 tipos distintos de callouts (cada uno con varios alias)
    
- Callouts colapsables
    

```
> [!info] Título
> ¡Esto es un callout!
```

Consulta la [documentación sobre los tipos y la sintaxis admitidos aquí](https://help.obsidian.md/Editing+and+formatting/Callouts).

> [!warning]  
> ¿Te preguntas por qué los callouts no aparecen aunque los tengas habilitados? Puede que necesites reordenar tus plugins para que [[ObsidianFlavoredMarkdown]] esté _después_ de [[SyntaxHighlighting]].

---

## Personalización

Los callouts son una funcionalidad del plugin [[ObsidianFlavoredMarkdown]]. Consulta la página del plugin para saber cómo habilitarlos o deshabilitarlos.

Puedes editar los íconos personalizando el archivo `quartz/styles/callouts.scss`.

### Agregar callouts personalizados

De forma predeterminada, los callouts personalizados utilizan el estilo `note`. Para crear estilos personalizados más avanzados, debes agregar las siguientes líneas en `custom.scss`:

```scss
.callout {
  &[data-callout="custom"] {
    --color: #customcolor;
    --border: #custombordercolor;
    --bg: #custombg;
    --callout-icon: url("data:image/svg+xml; utf8, <custom formatted svg>"); // Código del ícono SVG
  }
}
```

> [!warning]  
> No olvides asegurarte de que el SVG esté codificado en formato URL antes de insertarlo en el CSS. Puedes utilizar herramientas como [esta](https://yoksel.github.io/url-encoder/) para hacerlo.

---

## Ejemplos

> [!info]  
> Título predeterminado

> [!question]+ ¿Los callouts pueden estar _anidados_?
> 
> > [!todo]- ¡Sí!, pueden. ¡Y también colapsarse!
> > 
> > > [!example] Incluso puedes usar múltiples niveles de anidación.

> [!note]  
> Alias: "note"

> [!abstract]  
> Alias: "abstract", "summary", "tldr"

> [!info]  
> Alias: "info"

> [!todo]  
> Alias: "todo"

> [!tip]  
> Alias: "tip", "hint", "important"

> [!success]  
> Alias: "success", "check", "done"

> [!question]  
> Alias: "question", "help", "faq"

> [!warning]  
> Alias: "warning", "attention", "caution"

> [!failure]  
> Alias: "failure", "missing", "fail"

> [!danger]  
> Alias: "danger", "error"

> [!bug]  
> Alias: "bug"

> [!example]  
> Alias: "example"

> [!quote]  
> Alias: "quote", "cite"


