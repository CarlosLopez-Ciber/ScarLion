---
title: Comments
tags:
  - component
---

Quartz también tiene la capacidad de integrarse con distintos proveedores para permitir que los lectores dejen comentarios en tu sitio.

![[giscus-example.png]]

Actualmente, solo [Giscus](https://giscus.app/) está soportado de forma nativa, pero se aceptan _pull requests_ para añadir compatibilidad con otros proveedores.

---

## Proveedores

### Giscus

Primero, asegúrate de que el repositorio de [[setting up your GitHub repository|GitHub]] que estás utilizando para tu Quartz cumpla con los siguientes requisitos:

1. El **repositorio es público**, de lo contrario los visitantes no podrán ver la discusión.
    
2. La aplicación **[giscus](https://github.com/apps/giscus) está instalada**, de lo contrario los visitantes no podrán comentar ni reaccionar.
    
3. La funcionalidad **Discussions está habilitada** en el repositorio.
    

Luego, utiliza el sitio de [Giscus](https://giscus.app/#repository) para obtener los valores de `repoId` y `categoryId`. Asegúrate de seleccionar `Announcements` como categoría de discusión.

![[giscus-repo.png]]

![[giscus-discussion.png]]

Después de ingresar tu repositorio y seleccionar la categoría de discusión, Giscus calculará algunos identificadores que necesitarás proporcionar a Quartz. No tendrás que agregar manualmente el script, ya que Quartz se encargará de eso, pero sí necesitarás estos valores para el siguiente paso.

![[giscus-results.png]]

Finalmente, en `quartz.layout.ts`, edita el campo `afterBody` de `sharedPageComponents` para incluir las siguientes opciones, reemplazando los valores con los que obtuviste:

```ts
afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // de data-repo
      repo: 'jackyzha0/quartz',
      // de data-repo-id
      repoId: 'MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg',
      // de data-category
      category: 'Announcements',
      // de data-category-id
      categoryId: 'DIC_kwDOFxRnmM4B-Xg6',
      // de data-lang
      lang: 'en'
    }
  }),
],
```

---

## Personalización

Quartz también expone varias opciones adicionales de Giscus, que puedes proporcionar del mismo modo que `repo`, `repoId`, `category` y `categoryId`.

```ts
type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string

    // URL a la carpeta con temas personalizados
    // por defecto: 'https://${cfg.baseUrl}/static/giscus'
    themeUrl?: string

    // nombre del archivo .css para el tema claro
    // por defecto: 'light'
    lightTheme?: string

    // nombre del archivo .css para el tema oscuro
    // por defecto: 'dark'
    darkTheme?: string

    // cómo mapear páginas → discusiones
    // por defecto: 'url'
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"

    // usar coincidencia estricta de título
    // por defecto: true
    strict?: boolean

    // habilitar reacciones para la publicación principal
    // por defecto: true
    reactionsEnabled?: boolean

    // posición del cuadro de comentarios respecto a los comentarios existentes
    // por defecto: 'bottom'
    inputPosition?: "top" | "bottom"

    // idioma preferido
    // por defecto: 'en'
    lang?: string
  }
}
```

---

### Tema CSS personalizado

Quartz admite temas personalizados para Giscus. Para utilizarlos, coloca el archivo `.css` dentro de la carpeta `quartz/static` y configura los valores correspondientes.

Por ejemplo, si tienes un tema claro `light-theme.css`, un tema oscuro `dark-theme.css`, y tu sitio Quartz está alojado en `https://example.com/`:

```ts
afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // Otras opciones

      themeUrl: "https://example.com/static/giscus", // corresponde a quartz/static/giscus/
      lightTheme: "light-theme", // corresponde a light-theme.css
      darkTheme: "dark-theme", // corresponde a dark-theme.css
    }
  }),
],
```

---

### Mostrar comentarios de forma condicional

Quartz puede mostrar el cuadro de comentarios de forma condicional basándose en el campo `comments` del _frontmatter_.

Por defecto, todas las páginas muestran comentarios. Para deshabilitarlos en una página específica, establece `comments` en `false`:

```
---
title: ¡Comentarios deshabilitados aquí!
comments: false
---
```