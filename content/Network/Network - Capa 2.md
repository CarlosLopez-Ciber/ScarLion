# La Capa de Enlace de Datos (Capa 2)

La **Capa de Enlace de Datos** (Data Link Layer) es el segundo nivel del modelo OSI y representa el puente crítico entre la transmisión física de señales y la lógica de red. Para un administrador de redes, comprender la Capa 2 es vital porque es donde reside la **conmutación (switching)**, el direccionamiento físico y la delimitación de datos.

En el contexto del examen **Network+**, la Capa 2 es responsable de organizar los bits crudos de la Capa 1 en unidades lógicas llamadas **tramas (frames)**. Además, asegura que los datos se transfieran sin errores entre nodos adyacentes en una red de área local (LAN) o una red de área amplia (WAN).

## 1. Funciones Principales y Subcapas

La Capa de Enlace de Datos es tan compleja que el estándar IEEE 802 la divide en dos subcapas operativas. Esta distinción es frecuente en las preguntas teóricas de certificación.

### Subcapa MAC (Media Access Control)

Es la subcapa inferior, más cercana al hardware (Capa 1). Sus responsabilidades incluyen:

- **Direccionamiento Físico:** Asignación de direcciones MAC.
    
- **Delimitación de tramas:** Define dónde empieza y termina una trama.
    
- **Control de Acceso al Medio:** Determina quién tiene el turno para transmitir datos en un medio compartido, utilizando métodos como CSMA/CD (en Ethernet cableado) o CSMA/CA (en Wi-Fi).
    

### Subcapa LLC (Logical Link Control)

Es la subcapa superior, que actúa como interfaz con la Capa 3 (Red). Sus funciones son:

- **Control de Flujo:** Gestiona la velocidad de transmisión entre el emisor y el receptor para evitar la saturación.
    
- **Control de Errores:** Identifica tramas corruptas mediante sumas de comprobación.
    
- **Multiplexación de Protocolos:** Permite que múltiples protocolos de Capa 3 (como IPv4 e IPv6) operen sobre el mismo medio físico.
    

## 2. Direccionamiento Físico: La Dirección MAC

Una dirección MAC (Media Access Control) es un identificador único de 48 bits grabado en el firmware de la tarjeta de interfaz de red (NIC). En el examen Network+, a menudo se la denomina **dirección de hardware**, **dirección física** o **BIA (Burned-In Address)**.

### Estructura de la Dirección MAC

Las direcciones MAC se representan en formato **hexadecimal**. Constan de 12 dígitos hexadecimales agrupados en pares (octetos), separados comúnmente por dos puntos (:) o guiones (-).

Ejemplo: `00:1A:2B:3C:4D:5E`

La estructura se divide en dos partes iguales de 24 bits cada una:

1. **OUI (Organizationally Unique Identifier):** Los primeros 6 dígitos hexadecimales (24 bits). Identifican al **fabricante** de la tarjeta de red (por ejemplo, Cisco, Intel, Apple). Este código es asignado por el IEEE.
    
2. **ID de Dispositivo (Device ID):** Los últimos 6 dígitos hexadecimales (24 bits). Es un número de serie único asignado por el fabricante a esa tarjeta específica.
    

> **Nota Técnica:** Aunque la dirección MAC es física, puede ser suplantada mediante software (MAC Spoofing), lo cual es un concepto de seguridad importante en el módulo de seguridad de Network+.

## 3. La Trama (Frame) y Control de Errores

Mientras que la Capa 1 transmite bits, la Capa 2 transmite **tramas**. La trama es una unidad de datos que encapsula el paquete de la capa de red, añadiendo un encabezado y un pie de página (tráiler).

### Secuencia de Verificación de Trama (FCS)

Para el control de errores, la trama incluye al final un campo llamado **FCS (Frame Check Sequence)**. Este campo contiene el resultado de un algoritmo matemático conocido como **CRC (Cyclic Redundancy Check)**.

El proceso funciona de la siguiente manera:

1. El dispositivo emisor calcula un valor CRC basado en los datos de la trama y lo adjunta en el campo FCS.
    
2. El dispositivo receptor recibe la trama y recalcula el CRC.
    
3. **Comparación:**
    
    - Si el cálculo coincide con el valor en el FCS, la trama se considera íntegra y se procesa.
        
    - Si los valores no coinciden, la trama está corrupta y **se descarta silenciosamente** (en Ethernet estándar). La recuperación de esos datos perdidos suele ser responsabilidad de protocolos de capas superiores, como TCP (Capa 4).
        

## 4. Métodos de Sincronización

La transmisión de datos requiere que el emisor y el receptor estén coordinados. Existen tres modos principales de sincronización en telecomunicaciones:

- **Modo Asíncrono:** No hay un reloj compartido. La sincronización se logra mediante bits de inicio (start) y parada (stop) que encapsulan cada carácter o byte. Es menos eficiente debido a la sobrecarga de bits adicionales, pero útil cuando los datos se envían en ráfagas irregulares.
    
- **Modo Síncrono:** Emisor y receptor comparten una señal de reloj común o incrustada en la señal de datos. Se envían bloques de datos (tramas) con caracteres de control especiales al inicio y al final. Es altamente eficiente para grandes volúmenes de datos.
    
- **Modo Isócrono:** Utilizado para datos sensibles al tiempo (como voz o video en tiempo real). Garantiza que los datos fluyan a una velocidad constante y con latencia predecible, utilizando ranuras de tiempo asignadas.
    

## 5. Dispositivos de Capa 2

Los dispositivos que operan en esta capa toman decisiones de reenvío basadas en direcciones MAC, no en direcciones IP.

### Switch (Conmutador)

A diferencia de un Hub (Capa 1) que inunda todos los puertos con tráfico, un Switch es "inteligente".

- **Aprendizaje:** Inspecciona la dirección MAC de **origen** de las tramas entrantes y la asocia con el puerto físico por donde llegó, construyendo una **Tabla CAM** (Content Addressable Memory) o tabla de direcciones MAC.
    
- **Reenvío:** Cuando llega una trama destinada a una MAC específica, el switch consulta su tabla y envía la trama **únicamente** por el puerto correspondiente. Esto divide los dominios de colisión y aumenta la eficiencia de la red.
    

### NIC (Network Interface Card)

Es el componente que permite la conexión física y lógica a la red. Opera tanto en Capa 1 (señalización eléctrica/óptica) como en Capa 2 (dirección MAC y entramado).

### Bridge (Puente)

Es el predecesor del switch. Conecta dos segmentos de red y filtra el tráfico basándose en direcciones MAC. Los switches modernos son esencialmente puentes multipuerto de alta velocidad.

---

## Escenario Práctico: Análisis de Capa 2

Para el examen Network+ y la resolución de problemas en el mundo real, es fundamental saber identificar las direcciones físicas.

### Identificación de la Dirección MAC

En Windows (Command Prompt):

El comando ipconfig /all muestra la configuración detallada. Busca la línea etiquetada como "Dirección física" (Physical Address).
```PowerShell
C:\> ipconfig /all

Adaptador de Ethernet Ethernet:
   Descripción . . . . . . . : Intel(R) Ethernet Connection
   Dirección física. . . . . : D2-51-F1-3A-9C-01
   DHCP habilitado . . . . . : Sí
```

En Linux (Terminal):

Dependiendo de la distribución, se utiliza ip addr (moderno) o ifconfig (heredado). Busca el valor junto a "link/ether" o "HWaddr".

```Bash
$ ip addr show eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    link/ether d2:51:f1:3a:9c:01 brd ff:ff:ff:ff:ff:ff
```

### Tabla ARP (Address Resolution Protocol)

Para ver cómo tu computadora asigna direcciones IP (Capa 3) a direcciones MAC (Capa 2), puedes inspeccionar la caché ARP. Esto es crucial para diagnosticar problemas de comunicación local.

**Comando:** `arp -a`

```DOS
Interfaz: 192.168.1.15 --- 0x3
  Dirección de Internet      Dirección física      Tipo
  192.168.1.1               c4-6e-1f-2a-3b-4c     dinámico
```