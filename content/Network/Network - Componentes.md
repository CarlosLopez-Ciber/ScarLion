
El propósito de las redes es llevar **datos** de un lugar a otro y de una máquina a otra. Ya sea transportando voz, video o datos, tiene que cruzar la red de alguna manera.

### 1. Clientes (Clients)

Los clientes son dispositivos con los que los usuarios van a **acceder a la red**.

- **Ejemplos:** Estaciones de trabajo (workstations), laptops, tablets, smartphones, smart TVs e incluso termostatos habilitados para Wi-Fi.
    
- Puede ser cualquier dispositivo que simplemente se conecta a la red.
    

### 2. Servidores (Servers)

Los servidores **proporcionan recursos al resto de la red**.

- **Ejemplos:** Servidores de correo electrónico, servidores de archivos, servidores web y muchos otros.
    
- Pueden existir en dispositivos de hardware dedicados o pueden depender de software especializado que permite a un dispositivo actuar como servidor para otros clientes.
    

### 3. Hubs (Concentradores)

Los hubs son **tecnologías antiguas** y no se usan comúnmente en redes modernas.

- **Importancia para el Examen:** Siguen siendo relevantes porque a menudo se usan como una de las opciones de respuesta (distractoras).
    
- **Función:** Conectan otros dispositivos de red (clientes y servidores) en una LAN.
    
- **Limitación:** Tienen limitaciones, como un aumento de errores de red debido a su **naturaleza de "broadcasting"** (difusión). _(Nota: Envían los datos a todos los puertos)_.
    
- **Evolución:** Los hubs evolucionaron a puentes (bridges) y, finalmente, a lo que usamos hoy: switches.
    

### 4. Switches (Conmutadores)

Los switches son, efectivamente, una **versión mucho más inteligente de un hub**. Proporcionan más seguridad y una utilización más eficiente del ancho de banda.

- **Función:** Se utilizan para conectar dispositivos de red y **solo reenvían el tráfico desde un puerto al puerto de destino previsto**.
    
- **Beneficio:** Esto ayuda a evitar la difusión (broadcasting) innecesaria de tus datos por la red.
    
- **Mecanismo:** (Como vimos en la Capa 2) Pueden aprender qué dispositivos (direcciones MAC) están en qué puertos.
    

### 5. Puntos de Acceso Inalámbrico (Wireless Access Points - WAPs)

Un WAP (o simplemente AP) permite que los **dispositivos inalámbricos se conecten a tu red cableada**.

- **Función similar al Hub:** Al igual que los hubs, los WAPs se utilizan para difundir (broadcast) datos.
    
- **Diferencia clave:** Lo hacen a través de una **onda de radiofrecuencia (RF)** en lugar de un cable de cobre o fibra.
    

### 6. Routers (Enrutadores)

Los routers son un componente crucial en nuestras redes modernas porque se utilizan para **conectar diferentes redes entre sí**.

- **Función:** Pueden tomar decisiones de reenvío inteligentes basadas en las **direcciones IP** de los diferentes clientes, servidores u otros dispositivos.
    
- **Mecanismo:** Dependen predominantemente del Protocolo de Internet (IP) para enrutar el tráfico.
    

### 7. Firewalls (Cortafuegos)

Los firewalls sirven como una **barrera de seguridad** entre tu red interna (de confianza) y el mundo externo (no confiable), que generalmente es Internet.

- **Función:** Monitorean y controlan el tráfico de red entrante y saliente basándose en reglas de seguridad predeterminadas, utilizando **Listas de Control de Acceso (ACLs)**.
    
- **Objetivo:** Ayudan a proteger tu red contra accesos no autorizados, ciberataques y otras amenazas.
    
- **Tipos:** Pueden ser basados en hardware, software o una combinación de ambos.
    

### 8. Balanceadores de Carga (Load Balancers)

Son dispositivos o software que **distribuyen el tráfico de red o de aplicaciones entre múltiples servidores**.

- **Objetivo:** Esto aumenta la eficiencia, capacidad y fiabilidad de los servicios.
    
- **Mecanismo:** Aseguran que **ningún servidor individual soporte demasiada demanda**. Al balancear las cargas, se evita que un servidor se convierta en un cuello de botella.
    

### 9. Proxy (Servidor Proxy)

Un servidor proxy actúa como un **intermediario** entre el dispositivo de un usuario e Internet.

- **Funcionalidades:** Puede proporcionar filtrado web, conexiones de red compartidas y almacenamiento en caché de datos (caching) para mejorar el rendimiento.
    
- **Seguridad:** También se pueden usar para mejorar la seguridad y la privacidad **ocultando la dirección IP real del usuario**.
    

### 10. IDS / IPS

- **IDS (Intrusion Detection System):** Un Sistema de Detección de Intrusiones está diseñado para **detectar** accesos no autorizados o anomalías en tu red y luego **alertar** al administrador del sistema.
    
- **IPS (Intrusion Prevention System):** Un Sistema de Prevención de Intrusiones no solo **detecta** las amenazas (como un IDS), sino que también puede **tomar acciones para prevenir** la intrusión (como bloquear ese tráfico o descartar paquetes dañinos).
    

### 11. Controladores (Controllers)

Se utilizan particularmente en el contexto de **Redes Definidas por Software (SDN - Software-Defined Networking)**.

- **Función:** Son unidades centrales que se utilizan para **gestionar el control del flujo** hacia esos dispositivos de red (switches, routers).
    
- **Beneficio:** Permiten a los administradores dictar el comportamiento de la red a través de software, dando más flexibilidad y eficiencia.
    

### 12. NAS (Network-Attached Storage)

Un dispositivo NAS (Almacenamiento Conectado a la Red) es un sistema dedicado de **almacenamiento de archivos** que proporciona acceso a datos a un grupo heterogéneo de clientes.

- **Acceso:** Nivel de archivo (File-level).
    
- **Función:** Se conecta a una red y permite el almacenamiento y recuperación de datos desde una ubicación centralizada para usuarios autorizados.
    

### 13. SAN (Storage Area Network)

Una SAN (Red de Área de Almacenamiento) es una red de alta velocidad que proporciona acceso a **almacenamiento de datos consolidado a nivel de bloque (block-level)**.

- **Acceso:** Nivel de bloque (Block-level).
    
- **Uso:** Están diseñadas para manejar grandes volúmenes de datos y generalmente se usan para mejorar dispositivos de almacenamiento (como arreglos de discos o bibliotecas de cintas) y hacerlos accesibles a los **servidores**.
    

### 14. Medios (Media)

En el mundo de las redes, "medios" se refiere a los **materiales físicos** que se utilizan para transmitir los datos.

- **Ejemplos:** Cable de cobre, cable de fibra óptica o incluso señales inalámbricas (radiofrecuencia).
    

### 15. Enlaces WAN (WAN Links)

Un enlace WAN (Red de Área Amplia) se utiliza para **conectar redes a través de grandes áreas geográficas**, como entre ciudades o países.

- **Objetivo:** Son esenciales para la conectividad global y el intercambio de datos a larga distancia.
    
- **Tecnologías:** Líneas arrendadas (lease lines), comunicaciones por satélite o redes celulares.
