# La Capa de Transporte (Capa 4)

La **Capa de Transporte** (Transport Layer) actúa como la línea divisoria crítica entre las capas superiores (centradas en la aplicación) y las capas inferiores (centradas en la transmisión de datos). Mientras que la Capa 3 se encarga de llevar un paquete de una red a otra (enrutamiento), la Capa 4 es responsable de la **entrega de extremo a extremo** de los datos, gestionando la fiabilidad, el control de flujo y la multiplexación de servicios.

Para el examen Network+, es imperativo comprender cómo esta capa gestiona las comunicaciones mediante dos protocolos principales: **TCP** y **UDP**, y cómo diferencia los tipos de datos en **Segmentos** o **Datagramas**.

## 1. Unidades de Datos de Protocolo (PDU) en Capa 4

En el examen se evalúa rigurosamente la terminología correcta de la PDU según el protocolo utilizado:

- **Segmento:** Cuando utilizamos el protocolo **TCP**, la unidad de datos se denomina técnicamente segmento. El encabezado del segmento incluye números de secuencia y de acuse de recibo.
    
- **Datagrama:** Cuando utilizamos el protocolo **UDP**, la unidad de datos se denomina datagrama. Es una estructura más simple con menos sobrecarga (overhead).
    

## 2. Protocolos de Capa 4: TCP vs. UDP

La distinción más importante en esta capa es la elección entre comunicación fiable y comunicación rápida.

### TCP (Transmission Control Protocol)

Es un protocolo **orientado a la conexión** (Connection-Oriented). Esto significa que se debe establecer una sesión formal entre el cliente y el servidor antes de transferir cualquier dato.

**Características Clave de TCP:**

- **Fiabilidad:** Garantiza la entrega. Si un segmento se pierde, se retransmite.
    
- **Secuenciación:** Los segmentos se numeran. Si llegan desordenados, el receptor utiliza los números de secuencia para reconstruir el mensaje original correctamente.
    
- **Control de Flujo:** Gestiona la velocidad de transmisión para no saturar al receptor.
    

#### El Saludo de Tres Vías (Three-Way Handshake)

Antes de enviar datos, TCP establece la conexión mediante un proceso de tres pasos:

1. **SYN:** El cliente envía un segmento de sincronización (_synchronization_) para iniciar la conexión.
    
2. **SYN-ACK:** El servidor responde con un acuse de recibo de la sincronización (_synchronization-acknowledgement_).
    
3. **ACK:** El cliente responde con un acuse de recibo final (_acknowledgement_). La conexión queda establecida.
    
	![Three-Way Handshake](https://afteracademy.com/images/what-is-a-tcp-3-way-handshake-process-three-way-handshaking-establishing-connection-6a724e77ba96e241.jpg)
### UDP (User Datagram Protocol)

Es un protocolo **no orientado a la conexión** (Connectionless). Se describe a menudo como un método de "disparar y olvidar" (fire-and-forget).

**Características Clave de UDP:**

- **Sin Fiabilidad:** No hay acuses de recibo (ACK). El emisor no sabe si el dato llegó.
    
- **Sin Reordenamiento:** Los datos se procesan en el orden en que llegan.
    
- **Baja Latencia:** Al eliminar la sobrecarga de establecer conexión y verificar errores, es mucho más rápido y ligero que TCP.
    
- **Uso:** Ideal para transmisión de voz (VoIP) y video en tiempo real, donde perder un fotograma es preferible a detener la transmisión para recuperarlo.
    

### Tabla Comparativa para el Examen

|**Característica**|**TCP**|**UDP**|
|---|---|---|
|**Tipo de Conexión**|Orientado a conexión|Sin conexión (Connectionless)|
|**Fiabilidad**|Alta (Acuse de recibo - ACK)|Baja (Best-effort)|
|**Secuenciación**|Sí (Reordena segmentos)|No|
|**Control de Flujo**|Sí|No|
|**Velocidad**|Más lento (mayor overhead)|Más rápido (menor overhead)|
|**Aplicaciones Típicas**|Web (HTTP/HTTPS), Email (SMTP), Archivos (FTP)|Streaming, VoIP, DNS, Juegos Online|

## 3. Mecanismos de Control de Flujo y Fiabilidad

TCP implementa mecanismos sofisticados para gestionar el tráfico de red y asegurar la integridad de los datos.

### Ventanas Deslizantes (Windowing)

El "Windowing" permite al cliente y al servidor ajustar dinámicamente la cantidad de datos que se pueden enviar antes de requerir un acuse de recibo (ACK).

- **Ventana Abierta:** Si la red es estable, el tamaño de la ventana aumenta, permitiendo enviar más segmentos consecutivos. Esto mejora el ancho de banda efectivo.
    
- **Ventana Cerrada:** Si se detectan errores o congestión (paquetes perdidos), el tamaño de la ventana se reduce, enviando menos datos a la vez para asegurar la recepción.
    

> **Analogía:** Imagina que alguien te dicta números. Si los captas bien, le dices "puedes ir más rápido" (abrir ventana). Si te pierdes, le dices "espera, ve más despacio" (cerrar ventana).

### Almacenamiento en Búfer (Buffering)

Los dispositivos de red, como los routers, tienen memoria limitada dedicada a almacenar paquetes entrantes cuando el ancho de banda de salida está ocupado.

- **Funcionamiento:** Si un router recibe 100 Mbps de tráfico pero su interfaz de salida solo soporta 50 Mbps, almacenará el exceso en un búfer (cola).
    
- **Desbordamiento:** Si el búfer se llena, los paquetes nuevos se descartan (drop). En TCP, esto provoca retransmisiones; en UDP, los datos simplemente se pierden.
    

## 4. Dispositivos y Servicios de Capa 4

Aunque los routers son de Capa 3 y los switches de Capa 2, existen dispositivos y configuraciones que operan específicamente en Capa 4, generalmente manipulando puertos y sesiones.

1. **Firewalls:** Filtran tráfico basándose en números de puerto (ej. permitir Puerto 80 TCP, bloquear Puerto 23 TCP). Esta es una función de filtrado de Capa 4.
    
2. **Balanceadores de Carga (Load Balancers):** Distribuyen las solicitudes de clientes entre varios servidores basándose en la sesión TCP o UDP.
    
3. **Aceleradores WAN:** Utilizan técnicas de compresión y optimización de la ventana TCP para mejorar el rendimiento en enlaces de larga distancia.
    

---

## Escenario Práctico: Análisis de Conexiones

Para un administrador de redes, verificar las conexiones activas de Capa 4 es una tarea diaria de solución de problemas y seguridad.

### Comando: Netstat

El comando `netstat` (Network Statistics) muestra las conexiones TCP activas, los puertos en los que el equipo está escuchando y las estadísticas de Ethernet.

**Escenario:** Un servidor web parece lento. Quieres verificar si se ha establecido la conexión TCP correctamente.

**Comando:** `netstat -an`

```PowerShell
C:\> netstat -an

Proto  Dirección local          Dirección remota        Estado
TCP    192.168.1.5:54321        203.0.113.10:80         ESTABLISHED
TCP    192.168.1.5:54322        203.0.113.10:80         SYN_SENT
UDP    0.0.0.0:123              *:*
```

**Análisis del Resultado:**

- **ESTABLISHED:** El saludo de tres vías se completó y la transferencia de datos está activa.
    
- **SYN_SENT:** El cliente envió el primer paso (SYN) pero no ha recibido respuesta. Esto podría indicar un problema de firewall bloqueando el retorno o que el servidor está caído.
    
- **UDP:** Observa que las entradas UDP no tienen "Estado" (como ESTABLISHED), ya que es un protocolo sin conexión.