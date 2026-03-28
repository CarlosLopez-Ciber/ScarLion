# Encapsulamiento y Decapsulamiento

El movimiento de datos a través de una red no es un flujo mágico de información; es un proceso mecánico y estructurado de empaquetado y desempaquetado. Para un profesional de redes, comprender el **encapsulamiento y decapsulamiento** es fundamental, ya que la mayoría de las herramientas de diagnóstico (como Wireshark o tcpdump) muestran la red desde esta perspectiva.

## 1. El Proceso de Encapsulamiento y PDUs

El encapsulamiento es el proceso de añadir encabezados (headers) y, a veces, tráileres (trailers) a los datos originales a medida que descienden por las capas del modelo OSI (de la Capa 7 a la Capa 1). El decapsulamiento es el proceso inverso que ocurre en el receptor, donde se eliminan estas capas a medida que los datos ascienden (de la Capa 1 a la Capa 7).

### Unidades de Datos de Protocolo (PDU)

A medida que los datos cambian de capa, reciben un nombre técnico específico. Memorizar la PDU asociada a cada capa es obligatorio para el examen.

|**Capa OSI**|**Nombre de la PDU**|**Acción Principal**|
|---|---|---|
|**Capa 4 (Transporte)**|**Segmento** (TCP) / **Datagrama** (UDP)|Añade puertos de origen y destino.|
|**Capa 3 (Red)**|**Paquete**|Añade direcciones IP de origen y destino.|
|**Capa 2 (Enlace)**|**Trama** (Frame)|Añade direcciones MAC y verificación de errores (FCS).|
|**Capa 1 (Física)**|**Bits**|Convierte la trama en señales para el medio.|

## 2. Análisis de Encabezados: Capa por Capa

El propósito del encapsulamiento es agregar metadata de control. Analicemos qué sucede exactamente en las capas críticas.

### Capa 4: El Encabezado de Transporte

Aquí se define cómo se envían los datos (fiabilidad vs. velocidad).

**A. Encabezado TCP (Transmission Control Protocol)**

Es complejo y robusto. Tiene un tamaño mínimo de 20 bytes e incluye 10 campos obligatorios.

- **Puertos:** Origen y Destino (para dirigir el tráfico a la aplicación correcta).
    
- **Números de Secuencia y Acuse de Recibo (ACK):** Garantizan el orden y la entrega.
    
- **Flags (Banderas):** Campos de 1 bit que controlan el estado de la conexión.
    

**Las 6 Banderas de Control TCP:**

1. **SYN (Synchronization):** Inicia la conexión (primer paso del saludo de tres vías).
    
2. **ACK (Acknowledgement):** Confirma la recepción de paquetes y valida la conexión.
    
3. **FIN (Finish):** Solicita un cierre ordenado de la conexión cuando no hay más datos que enviar.
    
4. **RST (Reset):** Termina abruptamente una conexión. Ocurre si hay un error o si se recibe tráfico inesperado.
    
5. **PSH (Push):** Fuerza el envío inmediato de datos almacenados en el búfer a la aplicación receptora.
    
6. **URG (Urgent):** Indica que ciertos datos tienen prioridad sobre otros en la cola.
    

![](https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Schaubilder/EN-tcp-header.jpg)

**B. Encabezado UDP (User Datagram Protocol)**

Es simple y ligero. Tiene un tamaño de solo 8 bytes.

- **Campos:** Puerto de origen, Puerto de destino, Longitud y Checksum (suma de comprobación).
    
- No hay banderas, ni números de secuencia, lo que lo hace ideal para streaming pero no fiable.
    

![](https://voip-sip-sdk.com/attachments/7231/udp-packet.png)

### Capa 3: El Encabezado IP

El encapsulamiento en esta capa añade el **Paquete IP**.

- **Direccionamiento Lógico:** Direcciones IP de origen y destino.
    
- **TTL (Time to Live):** Evita que los paquetes circulen infinitamente en bucles de enrutamiento.
    
- **Protocolo:** Indica qué hay dentro de la carga útil (¿Es TCP? ¿Es UDP? ¿Es ICMP?).

![](https://personales.upv.es/rmartin/tcpip/imagenes/formato-ip.gif)

### Capa 2: El Encabezado Ethernet

El encapsulamiento final lógico crea la **Trama Ethernet**.

- **Direccionamiento Físico:** Direcciones MAC de origen y destino.
    
- **EtherType:** Indica el protocolo de Capa 3 (IPv4 o IPv6).
    
- **Etiquetado VLAN (802.1Q):** Si se utiliza, se inserta una etiqueta de 4 bytes para identificar a qué red virtual pertenece la trama.
    
- **FCS (Frame Check Sequence):** Un tráiler al final de la trama para detectar corrupción de datos.
    

## 3. La Unidad Máxima de Transmisión (MTU)

Un concepto crítico relacionado con el encapsulamiento es el tamaño de la carga útil.

- **Definición:** MTU (Maximum Transmission Unit) es el tamaño máximo de la PDU que se puede enviar en una sola transacción de Capa 2.
    
- **Estándar Ethernet:** El valor por defecto es **1500 bytes**.
    
- **Jumbo Frames:** Configuraciones que permiten MTUs superiores a 1500 bytes (hasta 9000 bytes). Se usan en redes de almacenamiento (SAN) para mejorar la eficiencia al reducir el número de encabezados procesados.
    
    - _Nota:_ Para que funcionen los Jumbo Frames, **todos** los dispositivos en el trayecto (NIC, Switch, Router) deben soportarlos. Si hay un desajuste de MTU, los paquetes se fragmentarán o se descartarán.
        

---

## Escenario de Diagnóstico: Problemas de MTU

Un problema común en redes VPN o túneles es la fragmentación excesiva debido a una MTU incorrecta (los encabezados adicionales del túnel reducen el espacio para los datos).

**Síntoma:** Los usuarios pueden hacer ping a un servidor, pero no pueden abrir páginas web o transferir archivos grandes.

Prueba de MTU con Ping (Troubleshooting):

Puedes usar el comando ping para determinar la MTU máxima soportada sin fragmentar.

Comando en Windows:

```cmd
ping [destino] -f -l [tamaño]
```

- `-f`: Flag de "No Fragmentar" (Do not Fragment).
    
- `-l`: Tamaño del buffer en bytes.
    

**Ejemplo:**

```cmd
C:\> ping 8.8.8.8 -f -l 1500
Packet needs to be fragmented but DF set.
(El paquete debe fragmentarse pero se estableció DF).
```

_Análisis:_ Esto indica que 1500 bytes es demasiado grande (debido a los encabezados IP e ICMP). Debes reducir el tamaño hasta encontrar el valor donde el ping responda correctamente, lo que te ayudará a configurar la MTU óptima en tu router o firewall.