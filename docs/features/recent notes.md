---
title: Recent Notes
tags: component
---

Quartz puede generar una lista de notas recientes basándose en ciertos criterios de filtrado y ordenamiento. Aunque este componente no está incluido en ningún [[layout]] por defecto, puedes agregarlo utilizando `Component.RecentNotes` en `quartz.layout.ts`.

## Personalización

- Cambiar el título de "Recent notes": pasa un parámetro adicional a `Component.RecentNotes({ title: "Recent writing" })`
    
- Cambiar el número de notas recientes: pasa un parámetro adicional a `Component.RecentNotes({ limit: 5 })`
    
- Mostrar las etiquetas (por defecto es `true`): `Component.RecentNotes({ showTags: false })`
    
- Mostrar un enlace de “ver más”: pasa un parámetro adicional a `Component.RecentNotes({ linkToMore: "tags/components" })`. Este campo debe ser un _slug_ completo que corresponda a una página existente.
    
- Personalizar el filtrado: pasa un parámetro adicional a `Component.RecentNotes({ filter: someFilterFunction })`. La función de filtrado debe tener la firma `(f: QuartzPluginData) => boolean`.
    
- Personalizar el ordenamiento: pasa un parámetro adicional a `Component.RecentNotes({ sort: someSortFunction })`. Por defecto, Quartz ordena por fecha y, en caso de empate, utiliza un criterio lexicográfico. La función de ordenamiento debe tener la firma `(f1: QuartzPluginData, f2: QuartzPluginData) => number`. Consulta `byDateAndAlphabetical` en `quartz/components/PageList.tsx` como ejemplo.
    
- Componente: `quartz/components/RecentNotes.tsx`
    
- Estilo: `quartz/components/styles/recentNotes.scss`