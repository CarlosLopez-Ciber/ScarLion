# Protocolo TCP

En el diseño y administración de redes, la garantía de entrega de datos es a menudo más crítica que la velocidad pura. El **Protocolo de Control de Transmisión (TCP)** es el estándar fundamental de la suite de protocolos de Internet diseñado para resolver este desafío.

Para un candidato a la certificación **CompTIA Network+**, TCP no es solo un acrónimo; es el protocolo principal de la **Capa 4 (Transporte)** del modelo OSI. A diferencia de otros protocolos "best-effort", TCP es orientado a conexión, lo que significa que garantiza que los datos lleguen a su destino sin errores, en el orden correcto y sin duplicados. Comprender su mecanismo de "Three-Way Handshake" y sus controles de flujo es obligatorio para diagnosticar problemas de conectividad y latencia.

## Arquitectura y Funcionalidad en la Capa de Transporte

TCP opera en la Capa de Transporte del modelo OSI. Su función principal es tomar los datos de las capas superiores (Aplicación) y dividirlos en unidades más pequeñas y manejables. Aunque coloquialmente se les llama "paquetes", técnicamente en la Capa 4 estas unidades se denominan **Segmentos**.

### Características Principales de TCP

1. **Orientado a Conexión:** Debe establecerse una sesión formal entre cliente y servidor antes de transmitir cualquier dato de aplicación.
    
2. **Confiabilidad:** Utiliza mecanismos de acuse de recibo (ACK) para confirmar la entrega.
    
3. **Ordenamiento:** Mediante números de secuencia, TCP asegura que los segmentos que llegan desordenados puedan reensamblarse correctamente en el destino.
    

## El Proceso de Three-Way Handshake (El Apretón de Manos)

El concepto más evaluado sobre TCP en el examen Network+ es el establecimiento de conexión. Antes de enviar datos reales, los dispositivos ejecutan un proceso de tres pasos para sincronizar sus números de secuencia y verificar la disponibilidad del servicio.

1. **Paso 1: SYN (Synchronize)**
    
    El cliente inicia la sesión enviando un segmento con la bandera (flag) SYN activada hacia el servidor. Esto indica: "Quiero iniciar una comunicación".
    
1. **Paso 2: SYN-ACK (Synchronize-Acknowledge)**
    
    El servidor recibe la solicitud. Si el puerto está abierto y el servicio disponible, responde con un segmento que tiene activas las banderas SYN y ACK. Esto indica: "Recibí tu solicitud (ACK) y también quiero sincronizarme contigo (SYN)".
    
1. **Paso 3: ACK (Acknowledge)**
    
    El cliente recibe la respuesta del servidor y envía un último segmento con la bandera ACK. Esto indica: "Conexión establecida".

	![](https://static.afteracademy.com/images/what-is-a-tcp-3-way-handshake-process-three-way-handshaking-establishing-connection-6a724e77ba96e241.jpg)

A partir de este momento, el canal es seguro y fiable para la transmisión de datos.

## Mecanismos de Control de Errores y Flujo

Una vez establecida la conexión, TCP gestiona la integridad de la transmisión mediante dos componentes críticos:

### 1. Secuenciación y Retransmisión

Cada byte de datos enviado tiene un **Número de Secuencia**. Si un segmento se pierde o llega corrupto (detectado mediante checksums), el receptor no enviará el ACK correspondiente. El emisor, al no recibir confirmación en un tiempo determinado, **retransmitirá** automáticamente los datos perdidos.

### 2. Control de Flujo: Ventanas (Windowing)

Para evitar que un emisor rápido sature a un receptor lento, TCP utiliza el "Windowing" o Ventana Deslizante.

- **Definición:** La "ventana" es la cantidad de datos (en bytes) que el receptor está dispuesto a procesar antes de enviar un acuse de recibo.
    
- **Ajuste Dinámico:** Si la red se congestiona o el receptor está ocupado, la ventana se reduce (estrecha). Si la red está libre, la ventana se amplía, permitiendo mayor throughput.
    

## Puertos y Endpoints

TCP utiliza puertos para multiplexar aplicaciones, permitiendo que múltiples servicios de red (navegación web, correo, transferencia de archivos) coexistan en un mismo servidor físico.

La combinación de una Dirección IP y un Número de Puerto se denomina **Socket** o Endpoint.

- **Ejemplo:** `192.168.1.50:443`
    
    - **IP (192.168.1.50):** Identifica el dispositivo único en la red.
        
    - **Puerto (443):** Identifica el servicio HTTPS específico ejecutándose en ese dispositivo.
        

## Escenario Real y Diagnóstico

En el examen Network+ y en la vida real, necesitarás verificar el estado de las conexiones TCP. La herramienta de línea de comandos por excelencia para esto es `netstat`.

Imagina que un usuario reporta que no puede conectar con un servidor web seguro. Puedes verificar si la conexión se está estableciendo correctamente.

**Comando en Windows/Linux:**

```bash
netstat -an | find "443"
```

_(Nota: En Linux usarías `grep` en lugar de `find`)_

**Salida Típica y Análisis:**

|**Proto**|**Dirección Local**|**Dirección Remota**|**Estado**|**Interpretación Técnica**|
|---|---|---|---|---|
|TCP|192.168.1.10:50123|203.0.113.5:443|**SYN_SENT**|El cliente envió el primer paso del handshake pero no recibió respuesta. Posible bloqueo de Firewall.|
|TCP|192.168.1.10:50123|203.0.113.5:443|**ESTABLISHED**|El Three-Way Handshake se completó. La conexión está activa y estable.|
|TCP|192.168.1.10:50123|203.0.113.5:443|**TIME_WAIT**|La conexión se ha cerrado recientemente y está esperando para liberar el puerto.|

Dominar estos estados es crucial para diferenciar entre un problema de red física, un bloqueo de firewall o un fallo en la aplicación del servidor.