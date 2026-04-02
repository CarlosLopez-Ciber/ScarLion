# La Capa de Red (Capa 3)

La **Capa de Red** (Network Layer) es el tercer nivel del modelo OSI y es responsable de proporcionar conectividad y selección de rutas entre dos sistemas de host que pueden estar ubicados en redes geográficamente distintas. Mientras que la Capa 2 se encarga de la entrega local (dentro de la misma LAN), la Capa 3 se encarga de la **interconexión de redes** (Internetworking).

Para el examen Network+, esta capa es crítica porque introduce el concepto de **direccionamiento lógico** (IP) y la función de **enrutamiento** (Routing), que permite que los datos viajen desde una red de origen hasta una red de destino, atravesando múltiples routers intermedios.

## 1. Direccionamiento Lógico y Enrutamiento

A diferencia de las direcciones MAC (físicas/permanentes), las direcciones de Capa 3 son **lógicas y jerárquicas**. Esto significa que se asignan mediante configuración de software y pueden cambiar si el dispositivo se mueve a una red diferente.

### Protocolos de Capa 3

El protocolo dominante en esta capa es el **Protocolo de Internet (IP)**. Existen dos versiones principales que coexisten en las redes modernas:

- **IPv4:** Utiliza direcciones de 32 bits, representadas típicamente en notación decimal con puntos (ej. `192.168.1.1`).
    
- **IPv6:** Utiliza direcciones de 128 bits, representadas en hexadecimal, desarrollado para solucionar el agotamiento de direcciones IPv4.
    

Otros protocolos históricos como **IPX** (Novell) o **AppleTalk** se consideran obsoletos y rara vez aparecen en el examen actual, salvo como referencia a sistemas heredados (legacy).

## 2. Métodos de Conmutación (Switching)

Es importante distinguir el término "switching" en Capa 3 del dispositivo "Switch" de Capa 2. En este contexto, nos referimos a la metodología utilizada para mover datos a través de una red amplia.

### A. Conmutación de Paquetes (Packet Switching)

Es el estándar utilizado en redes de datos modernas e Internet.

- **Funcionamiento:** Los datos se dividen en unidades pequeñas llamadas "paquetes". Cada paquete contiene la dirección IP de origen y destino.
    
- **Independencia:** Cada paquete puede viajar por una ruta diferente para llegar al destino. Si una ruta falla, los paquetes pueden redirigirse automáticamente por otra.
    
- **Analogía:** El sistema postal. Envías varias cartas al mismo destino; pueden ir en camiones o aviones diferentes, pero todas llegan a la misma dirección final.
    

### B. Conmutación de Circuitos (Circuit Switching)

Es el método tradicional de la telefonía pública (PSTN).

- **Funcionamiento:** Se establece un canal de comunicación dedicado (circuito) entre el emisor y el receptor antes de transmitir datos.
    
- **Exclusividad:** La ruta se mantiene fija y reservada durante toda la sesión. Nadie más puede usar ese ancho de banda mientras la conexión está activa.
    
- **Desventaja:** Menor eficiencia en el uso del ancho de banda comparado con la conmutación de paquetes.
    

### C. Conmutación de Mensajes (Message Switching)

Utiliza un enfoque de "almacenar y reenviar" (Store-and-forward).

- **Funcionamiento:** El mensaje completo se envía de un nodo a otro. Cada dispositivo intermedio almacena el mensaje completo antes de enviarlo al siguiente.
    
- **Uso:** Común en sistemas de correo electrónico o redes tolerantes a retrasos, pero no en comunicaciones en tiempo real.
    

## 3. Descubrimiento y Selección de Rutas

Los routers deben tomar decisiones inteligentes sobre dónde enviar los paquetes. Para ello utilizan una **Tabla de Enrutamiento**.

- **Rutas Estáticas:** Configuradas manualmente por el administrador. Son seguras y precisas, pero no escalan bien y no se adaptan automáticamente a fallos de la red.
    
- **Rutas Dinámicas:** Los routers utilizan **Protocolos de Enrutamiento** (como OSPF, EIGRP o BGP) para compartir información sobre el estado de la red.
    
    - _Analogía:_ Un sistema GPS (como Waze o Google Maps) que recalcula la ruta en tiempo real basándose en el tráfico y los accidentes. Si un enlace se cae, el protocolo dinámico encuentra un camino alternativo automáticamente.
        

## 4. Servicios de Conexión y Fiabilidad

Aunque la fiabilidad extrema suele asociarse a la Capa 4 (Transporte), la Capa 3 realiza funciones vitales para el manejo del flujo de datos:

- **Control de Flujo:** Ayuda a prevenir que un emisor sature a un receptor enviando datos más rápido de lo que este puede procesar.
    
- **Reordenamiento de Paquetes:** Dado que en la conmutación de paquetes cada fragmento puede tomar una ruta distinta (unas más rápidas, otras más lentas), los paquetes pueden llegar desordenados. La Capa 3 proporciona mecanismos para secuenciar estos paquetes y reconstruir el mensaje original correctamente en el destino.
    

## 5. Dispositivos de Capa 3

Para el examen CompTIA Network+, debes identificar claramente qué hardware opera en este nivel.

### Router

Es el dispositivo por excelencia de la Capa 3. Su función principal es leer la dirección IP de destino de un paquete y reenviarlo a la siguiente red adecuada. Los routers **segmentan dominios de difusión (broadcast domains)**.

### Switch Multicapa (Multilayer Switch)

A menudo denominado "Switch de Capa 3". Físicamente parece un switch tradicional, pero tiene la capacidad de realizar funciones de enrutamiento (routing) a velocidad de hardware (ASIC). Puede operar tanto en Capa 2 (usando direcciones MAC) como en Capa 3 (usando direcciones IP) simultáneamente.

---

## Escenario Práctico y Herramientas: ICMP

El **Protocolo de Mensajes de Control de Internet (ICMP)** opera en la Capa 3 y es fundamental para el diagnóstico y reporte de errores. No se utiliza para enviar datos de usuario, sino para verificar la conectividad.

### Herramienta 1: Ping

Utiliza mensajes ICMP _Echo Request_ y _Echo Reply_. Verifica si un host remoto es accesible y mide el tiempo de ida y vuelta (latencia).

**Comando:** `ping [dirección_IP_o_dominio]`

```bash
C:\> ping 8.8.8.8

Haciendo ping a 8.8.8.8 con 32 bytes de datos:
Respuesta desde 8.8.8.8: bytes=32 tiempo=14ms TTL=115
Respuesta desde 8.8.8.8: bytes=32 tiempo=15ms TTL=115
```

### Herramienta 2: Traceroute

Muestra la ruta exacta (salto por salto) que toma un paquete para llegar a su destino. Es vital para identificar en qué punto específico de la red se está interrumpiendo la comunicación.

Comando en Windows: tracert [destino]

Comando en Linux/macOS: traceroute [destino]

```bash
C:\> tracert google.com

Traza a la dirección google.com [142.250.78.142]
sobre un máximo de 30 saltos:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1 (Tu Router Local)
  2    10 ms     9 ms    11 ms  10.50.0.1 (ISP Gateway)
  3    15 ms    14 ms    12 ms  142.250.78.142 (Destino)
```