---
title: Gestión de Riesgos de Terceros
description: En el ecosistema digital actual, la dependencia de proveedores externos es una práctica empresarial común. Sin embargo, esta colaboración introduce riesgos de terceros significativos que deben ser gestionados proactivamente. La gestión de proveedores es el proceso fundamental para seleccionar, evaluar y mitigar los riesgos inherentes a la dependencia de productos y servicios de terceros.
---

En el ecosistema digital actual, la dependencia de proveedores externos es una práctica empresarial común. Sin embargo, esta colaboración introduce **riesgos de terceros** significativos que deben ser gestionados proactivamente. La **gestión de proveedores** es el proceso fundamental para seleccionar, evaluar y mitigar los riesgos inherentes a la dependencia de productos y servicios de terceros.

### 1. Riesgos Inherentes a la Dependencia de Terceros

La externalización de servicios y el uso de productos de terceros pueden mejorar la eficiencia y reducir costos, pero también conllevan una serie de riesgos de seguridad.

#### 1.1. No Transferencia Total de Riesgo

Es crucial entender que, como empresa, no se puede transferir todo el riesgo de ciberseguridad a un proveedor externo. Aunque se puedan reclamar costos por una brecha de datos sufrida por un tercero, la organización principal sigue siendo la responsable final ante las **sanciones legales** y el **daño a la reputación**.

**Ejemplo :** El ataque a **Target en 2013** es un caso paradigmático. A pesar de que la intrusión inicial se logró a través de un proveedor de servicios de climatización, Target fue la entidad que sufrió las mayores repercusiones, incurriendo en millones de dólares en multas, costos de litigio y un severo daño a su imagen pública.

### 2. Integración de Sistemas

La **integración de sistemas** se refiere a la práctica de combinar componentes y servicios de **múltiples proveedores** para implementar un flujo de trabajo empresarial. Esta estrategia a menudo es adoptada por su **eficiencia en costos**, ya que puede ser más económico adquirir soluciones de diversos especialistas que de un único proveedor integral.

#### 2.1. Desafíos de la Integración de Sistemas

* **Problemas de Compatibilidad:** La combinación de componentes de diferentes fuentes puede generar inconsistencias y fallos en la interoperabilidad, lo que introduce vulnerabilidades.
* **Gestión de Dependencias:** Una integración profunda con un proveedor puede generar una **dependencia crítica**. Si un proveedor deja de dar soporte a un producto o servicio, la reestructuración del flujo de trabajo con un nuevo proveedor puede ser un proceso **largo, complejo y costoso**.

**Consideración Clave:** Las empresas deben evaluar la **viabilidad a largo plazo** del soporte de un proveedor al seleccionarlo, asegurándose de que la continuidad del negocio no se vea comprometida por la discontinuidad del servicio de un tercero.

### 3. Desarrollo de Código Externalizado

La **externalización del desarrollo de software** a contratistas es una práctica común, especialmente para pequeñas y medianas empresas. Sin embargo, esto implica confiar en que los terceros proporcionen un **código seguro y de alta calidad**.

#### 3.1. Mitigación del Riesgo en el Código Externalizado

Para garantizar la seguridad del código desarrollado externamente, es fundamental implementar controles de calidad y seguridad independientes:

* **Auditorías de Seguridad Independientes:** Contratar a un **segundo proveedor** especializado en **pruebas de penetración (pen-testing)** y **auditorías de código** es una práctica recomendada. Esto valida la seguridad del código proporcionado por el desarrollador original, ofreciendo una capa adicional de aseguramiento.

**Ejemplo :** Una startup contrata a una empresa de desarrollo offshore para construir su aplicación móvil. Antes del lanzamiento, la startup contrata a una firma de ciberseguridad independiente para realizar un **análisis de seguridad del código fuente (SAST)** y **pruebas de penetración (DAST)** en la aplicación, identificando y remediando vulnerabilidades antes de que la aplicación esté disponible al público.

### 4. Almacenamiento de Datos en Terceros

El almacenamiento de datos, incluyendo copias de seguridad, con proveedores externos introduce vulnerabilidades críticas si no se gestiona adecuadamente.

#### 4.1. Riesgos Principales

1. **Acceso Concedido a Terceros:** Al externalizar el almacenamiento de datos, es probable que el proveedor necesite acceso a la información. Cuantas más entidades tengan acceso a los datos, mayor será la **superficie de ataque** y el riesgo de una exposición no autorizada.
2. **Dependencia en la Alojamiento de Datos y Copias de Seguridad:** Depender de un tercero no fiable para alojar datos críticos o sus copias de seguridad puede resultar en una **pérdida catastrófica de datos** o en la imposibilidad de recuperarlos durante un incidente de seguridad o desastre.

#### 4.2. Precauciones Esenciales

Para mitigar los riesgos asociados con el almacenamiento de datos de terceros, se deben tomar las siguientes precauciones:

* **Protección Equivalente:** Asegurar que los datos almacenados por el tercero reciban el **mismo nivel de protección de seguridad** (cifrado, controles de acceso, etc.) que si se almacenaran internamente.
* **Monitorización y Auditoría:** Establecer un **monitoreo continuo y auditorías regulares** del acceso del tercero a los datos, incluyendo registros de acceso y revisiones de seguridad.
* **Evaluación de Cumplimiento:** Evaluar los **impactos de cumplimiento normativo** (ej. GDPR, HIPAA, Ley de Protección de Datos Personales de Perú - Ley N° 29733) al almacenar datos personales o sensibles en sistemas de terceros, asegurándose de que el proveedor cumpla con todas las regulaciones aplicables.

### 5. Riesgos Basados en la Nube vs. Riesgos en las Instalaciones (On-Premise)

La infraestructura de TI puede ser alojada en las instalaciones de la empresa (on-premise) o en entornos de nube, cada uno con su propio conjunto de consideraciones de riesgo.

#### 5.1. Riesgos en las Instalaciones (On-Premise)

Estos riesgos se derivan de las vulnerabilidades y problemas de seguridad asociados con los **puntos finales y la infraestructura ubicados físicamente en las instalaciones de la empresa**. Esto incluye servidores, estaciones de trabajo, dispositivos de red y smartphones. La seguridad recae completamente en la organización.

#### 5.2. Riesgos Basados en la Nube

Los entornos de nube operan bajo un **modelo de responsabilidad compartida**, lo que significa que la responsabilidad de la seguridad se divide entre el **Proveedor de Servicios en la Nube (CSP)** y el **consumidor de la nube (la empresa usuaria)**.

* **Responsabilidad del CSP (Seguridad&#x20;**_**de**_**&#x20;la Nube):** El proveedor es responsable de la seguridad de la infraestructura subyacente que sustenta los servicios en la nube (ej. hardware, software de virtualización, infraestructura de red física, seguridad de los centros de datos).
* **Responsabilidad del Consumidor (Seguridad&#x20;**_**en**_**&#x20;la Nube):** El consumidor es responsable de la seguridad de los datos, las aplicaciones, la configuración de la red, los sistemas operativos y las credenciales de acceso dentro de la nube.

**Ejemplo :** En una infraestructura como servicio (IaaS), el proveedor de la nube (ej. AWS, Azure) es responsable de la seguridad de los servidores físicos y la red subyacente. Sin embargo, la empresa cliente es responsable de asegurar el sistema operativo de la máquina virtual, configurar correctamente los firewalls virtuales, gestionar las identidades y accesos (IAM) y cifrar sus datos almacenados en la nube. Un error de configuración por parte del cliente, como dejar un bucket de almacenamiento S3 públicamente accesible, sería un riesgo bajo su responsabilidad, no la del CSP.