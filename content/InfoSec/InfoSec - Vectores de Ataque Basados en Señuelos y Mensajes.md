---
title: Vectores de Ataque Basados en Señuelos y Mensajes
description: En ciberseguridad, los señuelos y los vectores basados en mensajes representan tácticas comunes utilizadas por los actores de amenaza para engañar a sus víctimas y lograr la ejecución de código malicioso.
---

En ciberseguridad, los señuelos y los vectores basados en mensajes representan tácticas comunes utilizadas por los actores de amenaza para engañar a sus víctimas y lograr la ejecución de código malicioso.

### 1. Vectores de Ataque Basados en Señuelos (Lure-Based Attacks)

Un señuelo es un elemento o contenido que, a primera vista, parece atractivo o inofensivo, pero que oculta una carga útil maliciosa. El objetivo es inducir al usuario a interactuar con él (abrir un archivo, conectar un dispositivo) para que el malware se active, entregando al actor de amenaza control sobre el sistema o causando una interrupción del servicio.

A continuación, se describen los tipos comunes de señuelos:

#### 1.1. Dispositivos Extraíbles Maliciosos

Este vector explota la curiosidad humana o el descuido.

* Descripción: Un atacante oculta malware en dispositivos de almacenamiento extraíbles como unidades USB o tarjetas de memoria.
* Táctica de Entrega: La técnica más común es el ataque de abandono (drop attack), donde los ciberdelincuentes dejan estos dispositivos en lugares estratégicos (ej. estacionamientos de la organización, cafeterías cercanas) con la esperanza de que un empleado los encuentre y, por curiosidad o necesidad, los conecte a un PC o smartphone corporativo.
* Resultado: Una vez conectado, el dispositivo infecta el sistema con el malware, que puede robar datos, instalar backdoors o realizar otras acciones maliciosas.

Ejemplo : Un empleado encuentra una memoria USB etiquetada como "Nóminas confidenciales Q2" en el estacionamiento de la empresa. Al insertarla en su estación de trabajo para investigar, activa un ransomware que encripta los archivos de la red.

#### 1.2. Archivos Ejecutables Maliciosos

Este señuelo disfraza el malware como software legítimo.

* Descripción: El actor de amenaza oculta código de exploit dentro de un archivo de programa ejecutable (ej. `.exe`, `.msi`).
* Táctica Común: El malware troyano es un ejemplo clásico. Se disfraza de una aplicación legítima y aparentemente inofensiva (ej. un juego, una utilidad de software), pero en segundo plano, realiza actividades maliciosas.
* Resultado: El usuario instala la aplicación creyendo que es legítima, y el troyano ejecuta su carga útil sin el conocimiento del usuario.

Ejemplo : Un usuario descarga un "programa de optimización de sistema" gratuito de un sitio web no oficial. Al ejecutarlo, el programa parece funcionar normalmente, pero en secreto instala un keylogger que registra todas las pulsaciones de teclado del usuario, incluyendo credenciales.

#### 1.3. Archivos de Documento Maliciosos

Aprovechan la funcionalidad de macros o incrustaciones en formatos de documento populares.

* Descripción: El malware se incrusta en archivos de formato de procesador de textos (ej. `.docx`, `.xlsx`) o PDF (Portable Document Format).
* Mecanismo: A menudo, el malware se activa a través de macros maliciosas que el usuario habilita sin saberlo, o explotando vulnerabilidades en el software de visualización de documentos.
* Resultado: Al abrir el documento, se ejecuta el código malicioso que puede comprometer el sistema.

Ejemplo : Un correo electrónico de phishing incluye un archivo adjunto PDF llamado "Factura Pendiente". Al abrirlo, el documento solicita habilitar macros para "ver el contenido completo", y al hacerlo, se instala un spyware en el equipo.

#### 1.4. Archivos de Imagen Maliciosos

Utiliza una técnica más avanzada para la ocultación.

* Descripción: El código de exploit se oculta dentro de un archivo de imagen (ej. `.jpg`, `.png`).
* Mecanismo: La explotación ocurre cuando el archivo de imagen se visualiza o edita, apuntando a una vulnerabilidad en el navegador web o en el software de edición de imágenes que procesa el archivo.
* Técnica Relacionada: La esteganografía es una técnica que puede usarse para ocultar datos (incluyendo malware) dentro de archivos de imagen sin alterar significativamente su apariencia.

Ejemplo : Un atacante sube una imagen a un foro público que, al ser procesada por una versión vulnerable de un navegador web, ejecuta un script que redirige al usuario a un sitio web de phishing o descarga malware en segundo plano.

### 2. Vectores de Ataque Basados en Mensajes

Los vectores basados en mensajes implican la entrega de contenido malicioso a través de diversas plataformas de comunicación digital.

#### 2.1. Correo Electrónico

El vector más extendido y con mayor trayectoria.

* Descripción: El atacante envía un archivo adjunto malicioso (ej. documentos con macros, ejecutables disfrazados) o un enlace a un sitio web comprometido/falso a través de correo electrónico.
* Táctica Principal: El phishing es la técnica más común, donde el correo electrónico se disfraza de una comunicación legítima para engañar al destinatario.
* Resultado: El usuario, al interactuar con el contenido malicioso (abrir el adjunto o hacer clic en el enlace), compromete su sistema.

Ejemplo : Un departamento recibe un correo electrónico que parece ser de Recursos Humanos con el asunto "Actualización de política de vacaciones". El adjunto es un documento de Word con macros que, al habilitarse, instalan un backdoor en las computadoras de los empleados.

#### 2.2. Servicio de Mensajes Cortos (SMS)

Ataques dirigidos a dispositivos móviles.

* Descripción: Un mensaje SMS se envía al teléfono de la víctima conteniendo un enlace malicioso (smishing) o, en ocasiones, un texto que induce a la descarga de una aplicación infectada.
* Riesgo: La naturaleza concisa y la confianza en los mensajes de texto a menudo llevan a los usuarios a hacer clic sin verificar.

Ejemplo : Un usuario recibe un SMS que dice "Su paquete está en espera. Haga clic aquí para reprogramar la entrega: \[enlace malicioso]". Al hacer clic, se le dirige a una página falsa que solicita sus credenciales bancarias.

#### 2.3. Mensajería Instantánea (IM)

Aprovecha la inmediatez y la confianza en las comunicaciones directas.

* Descripción: Aunque muchas aplicaciones de mensajería instantánea modernas utilizan cifrado, aún pueden ser vectores para la entrega de enlaces maliciosos, archivos infectados o la explotación de vulnerabilidades de software en la propia aplicación.
* Riesgo: La percepción de que una conversación es "privada" o proviene de un contacto conocido puede reducir la cautela del usuario.

Ejemplo : Un contacto de un usuario en una aplicación de mensajería envía un mensaje con un enlace a un "video divertido" o un "documento compartido". Sin embargo, la cuenta del contacto ha sido comprometida, y el enlace conduce a un sitio de malvertising o descarga un troyano.

#### 2.4. Web y Redes Sociales

Plataformas con alta interacción y difusión.

* Descripción: El malware puede ocultarse en archivos adjuntos a publicaciones, enlaces acortados, anuncios maliciosos (malvertising) o presentarse como descargas falsas en sitios web o plataformas de redes sociales.
* Uso en Ingeniería Social: Las redes sociales también son usadas sutilmente para recopilar información sobre los objetivos, reforzar campañas de ingeniería social o difundir enlaces de phishing disfrazados de noticias o contenido viral.
* Riesgo: La amplia superficie de usuarios y la velocidad de propagación de contenido hacen de estas plataformas un vector potente.

Ejemplo : Un atacante publica un anuncio falso en una red social ofreciendo un descuento exclusivo. Al hacer clic, el usuario es redirigido a un sitio web malicioso que explota una vulnerabilidad del navegador para instalar un spyware.

### 3. Exploits de Cero Clic (Zero-Click Exploits)

Los exploits de cero clic representan la forma más peligrosa y sofisticada de ataque.

* Descripción: A diferencia de la mayoría de los exploits que requieren que la víctima interactúe de alguna manera (hacer clic en un enlace, abrir un archivo, instalar una aplicación), los exploits de cero clic no requieren ninguna interacción del usuario.
* Mecanismo: La simple recepción de un archivo adjunto malicioso, la visualización de una imagen en una página web, o incluso una llamada perdida a través de una aplicación de mensajería puede ser suficiente para activar el exploit y comprometer el dispositivo.
* Riesgo: Son extremadamente difíciles de detectar y prevenir, ya que el usuario no realiza ninguna acción que levante sospechas. A menudo, explotan vulnerabilidades en el procesamiento de datos de aplicaciones de mensajería o sistemas operativos.

Ejemplo : Un atacante envía un mensaje SMS o un mensaje a través de una aplicación de chat. El mensaje no necesita ser abierto. Simplemente el hecho de que el dispositivo lo reciba y lo procese (ej. para mostrar una vista previa) es suficiente para ejecutar el exploit y tomar control del dispositivo. Estos son comúnmente utilizados por actores de amenaza avanzados, como los patrocinados por estados.