---
title: Modelos de Red
description: Los modelos de red son marcos que definen las diversas funciones necesarias para permitir que los datos viajen desde el origen hasta el destino a través de una red. Estas funciones generalmente se dividen en capas (layers), y cada capa describe un cierto rol requerido para habilitar las comunicaciones de red. A partir de ahí, se pueden diseñar protocolos para cumplir esos roles. 
---

Los modelos de red son marcos que definen las diversas funciones necesarias para permitir que los datos viajen desde el origen hasta el destino a través de una red. Estas funciones generalmente se dividen en capas (layers), y cada capa describe un cierto rol requerido para habilitar las comunicaciones de red. A partir de ahí, se pueden diseñar protocolos para cumplir esos roles. 
## El Modelo Cliente-Servidor

Comencemos con el modelo que verás en la gran mayoría de entornos empresariales: el modelo cliente-servidor.

Este modelo utiliza un **servidor dedicado** para proporcionar acceso a archivos, escáneres, impresoras y otros recursos de la red. Piensa en el servidor como una biblioteca central y en los clientes (tus computadoras) como las personas que van a pedir libros.

La administración y las copias de seguridad son relativamente fáciles aquí. ¿Por qué? Porque tenemos una máquina central (el servidor) donde residen todos los recursos. Si queremos hacer una copia de seguridad de todos los archivos, simplemente hacemos la copia de seguridad de ese servidor. Si necesitamos configurar permisos de acceso, configuramos ese servidor.

Esta simplicidad en la gestión hace que el modelo cliente-servidor sea la opción principal en las redes corporativas.

### Beneficios del Modelo Cliente-Servidor

- **Administración Centralizada:** Este es el punto clave. Tienes uno o varios servidores principales donde puedes centrar todos tus esfuerzos de gestión.
    
- **Gestión más Sencilla:** Como todo está en uno o dos lugares, la gestión diaria se simplifica enormemente.
    
- **Mejor Escalabilidad:** Este modelo crece contigo. Si necesitas expandir tu capacidad, puedes hacerlo añadiendo más servidores, integrándote con arquitecturas en la nube o implementando técnicas como el **balanceo de carga** para distribuir el trabajo. Esto te da una flexibilidad que el modelo P2P no puede ofrecer.
    

### Desventajas del Modelo Cliente-Servidor

- **Costo Elevado:** Esta es la principal desventaja. Requiere hardware dedicado (servidores potentes) y, a menudo, software de sistema operativo específico (como Windows Server, Red Hat Linux, etc.), que suelen tener costos de licencia.
    
- **Requiere Personal Especializado:** No cualquiera puede administrar un servidor empresarial. Se necesita un conjunto de habilidades altamente especializado para configurar, mantener y securizar estos sistemas.
    
- **Punto Único de Fallo (Single Point of Failure):** Si ese servidor central falla y no tienes redundancia, nadie en la red puede acceder a los recursos.
    

A pesar de estas desventajas, el modelo cliente-servidor sigue siendo el estándar indiscutible en las redes empresariales.

---

## El Modelo Peer-to-Peer (P2P)

Ahora veamos la otra cara de la moneda: el modelo peer-to-peer (P2P) o "de par a par".

En este modelo, los _peers_ (es decir, las otras máquinas, como laptops y computadoras de escritorio) pueden compartir recursos directamente entre sí, sin necesidad de un servidor central.

Aquí es donde la administración y las copias de seguridad se vuelven una pesadilla. Los archivos están dispersos en diferentes máquinas y ubicaciones.

Por ejemplo, si yo quiero compartir contigo unas diapositivas de PowerPoint y tú quieres compartir conmigo unos archivos de Excel, esos archivos residen en nuestras respectivas máquinas. Ahora, para asegurar la información, tendríamos que hacer copias de seguridad de _ambas_ máquinas. Tendríamos que gestionar permisos en _ambos_ equipos. ¿Ves la redundancia en el trabajo?

Ahora, imagina escalar eso a 50 máquinas. Se convierte en un caos de gestión.

### ¿Dónde es útil el P2P?

Quizás recuerdes un software de hace años llamado **Napster**. Este era un programa de intercambio de archivos P2P. Aunque se usó para muchas actividades ilegales (como descargar música con derechos de autor), el concepto detrás de él es lo que nos interesa: cada persona que formaba parte de la red daba y recibía archivos. Era una red de intercambio entre pares.

### Beneficios del Modelo P2P

- **Bajo Costo:** No hay infraestructura costosa, ni hardware especializado, ni servidores dedicados.
    
- **Fácil de Configurar (a pequeña escala):** Solo necesitas el software adecuado y puedes permitir que todos hablen entre sí. Puedes simplemente elegir una carpeta en tu disco duro y compartirla.
    
- **Sin SO Especializado:** Funciona sobre los sistemas operativos de escritorio que ya usas.
    

Si quisiera crear una red rápida para cinco computadoras en una oficina pequeña, podría simplemente compartir archivos desde mi laptop y todos podrían acceder a ellos. Esa es la idea del P2P.

### Desventajas del Modelo P2P

- **Gestión Descentralizada:** Este es el mayor inconveniente para una empresa. Cada usuario posee y controla su propia máquina, decidiendo qué comparte y qué no.
    
- **Disponibilidad:** Si mi máquina está apagada, ya no puedes acceder a los archivos que estaba compartiendo. En el modelo cliente-servidor, el servidor está diseñado para estar encendido 24/7.
    
- **Ineficiencia:** Se vuelve extremadamente ineficiente cuando se trata de redes grandes.
    
- **Pésima Escalabilidad:** Si quisiera operar una red P2P para una organización del tamaño de Facebook, simplemente no funcionaría. Sería horrible. A medida que las cosas crecen, se pierden.

