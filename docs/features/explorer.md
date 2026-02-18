---
title: "Explorer"
tags:
  - component
---

Quartz incluye un **explorador** que te permite navegar por todos los archivos y carpetas de tu sitio. Es compatible con carpetas anidadas y es altamente personalizable.

De forma predeterminada, muestra todas las carpetas y archivos de tu sitio. Para mostrar el explorador en una ubicación diferente, puedes editar el [[layout]].

Los nombres visibles de las carpetas se determinan mediante el campo `title` del _frontmatter_ en `folder/index.md` (más detalles en [[authoring content | Creación de contenido]]).  
Si este archivo no existe o no contiene _frontmatter_, se utilizará el nombre local de la carpeta.

> [!info]  
> El explorador utiliza **local storage** por defecto para guardar su estado. Esto garantiza una experiencia fluida al navegar entre páginas.
> 
> Para eliminar el estado guardado del explorador, borra la entrada `fileTree` del almacenamiento local (puedes encontrar una guía para navegadores basados en Chromium [aquí](https://docs.devolutions.net/kb/general-knowledge-base/clear-browser-local-storage/clear-chrome-local-storage/)).  
> Puedes deshabilitar esta funcionalidad pasando `useSavedState: false` como argumento.

---

## Personalización

La mayor parte de la configuración se realiza pasando opciones a `Component.Explorer()`.

Por ejemplo, esta es la configuración predeterminada:

```typescript
Component.Explorer({
  title: "Explorer", // título del componente explorador
  folderClickBehavior: "collapse", // qué ocurre al hacer clic en una carpeta ("link" para navegar a la página de la carpeta o "collapse" para contraerla)
  folderDefaultState: "collapsed", // estado predeterminado de las carpetas ("collapsed" o "open")
  useSavedState: true, // si se debe usar local storage para guardar el estado (qué carpetas están abiertas)
  // omitido pero mostrado más adelante
  sortFn: ...,
  filterFn: ...,
  mapFn: ...,
  // orden en que se aplican las funciones
  order: ["filter", "map", "sort"],
})
```

Al proporcionar tus propias opciones, puedes omitir cualquiera de estos campos si deseas mantener el valor predeterminado.

¿Quieres personalizarlo aún más?

- **Eliminar el explorador:** elimina `Component.Explorer()` de `quartz.layout.ts`.
    
    - (Opcional): Después de eliminarlo, puedes mover el componente [[table of contents | Tabla de Contenidos]] nuevamente a la parte `left` del diseño.
        
- **Cambiar el comportamiento de `sort`, `filter` y `map`:** explicado en [[#Advanced customization]].
    
- **Componente:** `quartz/components/Explorer.tsx`
    
- **Estilos:** `quartz/components/styles/explorer.scss`
    
- **Script:** `quartz/components/scripts/explorer.inline.ts`
## Personalización avanzada

Este componente te permite personalizar completamente su comportamiento. Puedes proporcionar funciones personalizadas para `sort`, `filter` y `map`.

Todas las funciones que puedes pasar trabajan con la clase `FileTrieNode`, que tiene las siguientes propiedades:

```ts
class FileTrieNode {
  isFolder: boolean
  children: Array<FileTrieNode>
  data: ContentDetails | null
}
```

```ts
export type ContentDetails = {
  slug: FullSlug
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
}
```

Cada función que puedes proporcionar es opcional. Por defecto, solo se utiliza una función `sort`:

```ts
// Orden: primero carpetas, luego archivos. Carpetas y archivos ordenados alfabéticamente
Component.Explorer({
  sortFn: (a, b) => {
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (!a.isFolder && b.isFolder) {
      return 1
    } else {
      return -1
    }
  },
})
```

---

Puedes proporcionar tus propias funciones para `sortFn`, `filterFn` y `mapFn`. Todas las funciones se ejecutarán en el orden especificado por la opción `order` (ver [[#Customization]]).

Estas funciones se comportan de forma similar a sus equivalentes en `Array.prototype`, excepto que modifican el árbol completo de `FileTrieNode` directamente (_in place_) en lugar de devolver uno nuevo.

Para más información sobre cómo usar `sort`, `filter` y `map`, puedes consultar:

- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
    
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
    
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
    

Las definiciones de tipos son las siguientes:

```ts
type SortFn = (a: FileTrieNode, b: FileTrieNode) => number
type FilterFn = (node: FileTrieNode) => boolean
type MapFn = (node: FileTrieNode) => void
```

---

## Ejemplos básicos

Estos ejemplos muestran el uso básico de `sort`, `map` y `filter`.

### Usar `sort` para colocar los archivos primero

Con este ejemplo, el explorador ordenará todo alfabéticamente.

```ts
Component.Explorer({
  sortFn: (a, b) => {
    return a.displayName.localeCompare(b.displayName)
  },
})
```
### Cambiar nombres visibles (`map`)

Con este ejemplo, los nombres visibles de todos los `FileNode` (carpetas y archivos) se convertirán completamente a mayúsculas.

```ts
Component.Explorer({
  mapFn: (node) => {
    node.displayName = node.displayName.toUpperCase()
    return node
  },
})
```

---

### Eliminar elementos de la lista (`filter`)

Con este ejemplo, puedes eliminar elementos del explorador proporcionando un arreglo de carpetas/archivos que deseas excluir.

Ten en cuenta que este ejemplo filtra por el título, pero también puedes hacerlo por `slug` o cualquier otro campo disponible en `FileTrieNode`.

```ts
Component.Explorer({
  filterFn: (node) => {
    // conjunto con los nombres que deseas excluir
    const omit = new Set(["authoring content", "tags", "advanced"])

    // también puedes usar node.slug o cualquier propiedad de node.data
    // recuerda que node.data solo existe para archivos presentes en disco
    // (por ejemplo, nodos de carpetas implícitas sin index.md asociado)
    return !omit.has(node.displayName.toLowerCase())
  },
})
```

---

### Eliminar archivos por etiqueta

Puedes acceder a las etiquetas de un archivo mediante `node.data.tags`.

```ts
Component.Explorer({
  filterFn: (node) => {
    // excluir archivos con la etiqueta "explorerexclude"
    return node.data?.tags?.includes("explorerexclude") !== true
  },
})
```

---

### Mostrar todos los elementos en el explorador

Por defecto, el explorador filtra la carpeta `tags`.

Para sobrescribir la función de filtrado predeterminada, puedes establecer `filterFn` como `undefined`.

```ts
Component.Explorer({
  filterFn: undefined, // no aplicar filtro, todos los archivos y carpetas serán visibles
})
```

---

## Ejemplos avanzados

> [!tip]  
> Al escribir funciones más complejas, el archivo `layout` puede verse muy sobrecargado.  
> Puedes solucionarlo definiendo las funciones fuera del componente y luego pasándolas como referencia.
> 
> ```ts
> import { Options } from "./quartz/components/Explorer"
> 
> export const mapFn: Options["mapFn"] = (node) => {
>   // implementa tu función aquí
> }
> export const filterFn: Options["filterFn"] = (node) => {
>   // implementa tu función aquí
> }
> export const sortFn: Options["sortFn"] = (a, b) => {
>   // implementa tu función aquí
> }
> 
> Component.Explorer({
>   // ... otras opciones
>   mapFn,
>   filterFn,
>   sortFn,
> })
> ```

---

### Agregar prefijo con emoji

Para agregar prefijos con emoji (📁 para carpetas, 📄 para archivos), puedes usar una función `map` como esta:

```ts
Component.Explorer({
  mapFn: (node) => {
    if (node.isFolder) {
      node.displayName = "📁 " + node.displayName
    } else {
      node.displayName = "📄 " + node.displayName
    }
  },
})
```