---
title: Reader Mode
tags:
  - component
---

El **Modo Lectura** es una funcionalidad que permite a los usuarios concentrarse en el contenido ocultando las barras laterales y otros elementos de la interfaz. Cuando está habilitado, ofrece una experiencia de lectura limpia y sin distracciones.

---

## Configuración

El Modo Lectura está habilitado por defecto. Para desactivarlo, puedes eliminar el componente de la configuración de tu diseño en `quartz.layout.ts`:

```ts
// Elimina o comenta esta línea
Component.ReaderMode(),
```

---

## Uso

El botón para activar el Modo Lectura aparece con un ícono de libro. Al hacer clic:

- Se ocultan las barras laterales.
    
- Al pasar el cursor sobre el área de contenido, las barras laterales se muestran temporalmente.
    

A diferencia del Modo Oscuro, el estado del Modo Lectura **no se conserva** al recargar la página, pero sí se mantiene durante la navegación SPA dentro del sitio.

---

## Personalización

Puedes personalizar la apariencia del Modo Lectura mediante variables y estilos CSS. El componente utiliza las siguientes clases:

- `.readermode`: El botón de activación.
    
- `.readerIcon`: El ícono de libro.
    
- `[reader-mode="on"]`: Se aplica al elemento raíz cuando el Modo Lectura está activo.
    

Ejemplo de personalización en tu CSS personalizado:

```scss
.readermode {
  // Personalizar el botón
  svg {
    stroke: var(--custom-color);
  }
}
```