Quartz genera un feed RSS para todo el contenido de tu sitio mediante la creación de un archivo `index.xml` al que los lectores RSS pueden suscribirse. Debido a la especificación de RSS, es necesario que la propiedad `baseUrl` en tu [[configuration]] esté correctamente configurada para que los lectores RSS puedan detectarlo adecuadamente.

> [!info]  
> Después de desplegar el sitio, el enlace RSS generado estará disponible por defecto en `https://${baseUrl}/index.xml`.
> 
> La ruta `index.xml` puede personalizarse pasando la opción `rssSlug` al plugin [[ContentIndex]].

## Configuración

Esta funcionalidad es proporcionada por el plugin [[ContentIndex]]. Consulta la página del plugin para ver las opciones de personalización disponibles.

