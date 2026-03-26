---
title: Modelo TCP/IP
description: El modelo TCP/IP nació de la investigación y el desarrollo financiados por la Agencia de Proyectos de Investigación Avanzados de Defensa (DARPA) del Departamento de Defensa de los EE. UU.
---

- Se definió en el Request for Comments (RFC) 1122.

> Los RFC son documentos publicados por el Grupo de Trabajo de Ingeniería de Internet (IETF) para definir protocolos estándar para Internet.

## Capas del Modelo TCP/IP

![[Pasted image 20260324215920.png]]

## Capa 1: La capa física (Physical Layer)

Define los requisitos **físicos** para transmitir datos (una serie de bits) de un nodo a otro. Esos bits podrían codificarse como señales **eléctricas** que viajan a lo largo de un cable de cobre, señales de **luz** en un cable de fibra óptica u **ondas de radio** en una conexión inalámbrica. 

## Capa 2: La capa de enlace de datos (Data Link Layer)

Ethernet y Wi-Fi no solo definen especificaciones físicas; también especifican cómo se deben direccionar y enviar los datos a otro nodo conectado al mismo medio físico dentro de una LAN. 

El trabajo de la capa de Enlace de datos es **preparar los datos** para la transmisión sobre ese medio físico para que puedan ser recibidos por el siguiente nodo en la ruta hacia el destino final. Ese siguiente nodo podría ser el propio destino final o el siguiente router en la ruta. El viaje de un nodo al siguiente en la ruta se llama salto (hop), y el trabajo de la capa de Enlace de datos es proporcionar una entrega de mensajes de salto a salto (hop-to-hop).

La capa de Enlace de datos logra esta entrega salto a salto mediante el uso de **direcciones de control de acceso al medio (MAC)**, un tipo de dirección de red asignada a cada puerto de un dispositivo.

## Capa 3: La capa de red (Network Layer)

En cada salto, el mensaje se envía a la dirección MAC del siguiente salto. Sin embargo, todavía necesitamos una forma para que el host de origen original dirija el mensaje al host de destino final. Ese es el rol de la capa de Red: entrega de extremo a extremo (end-to-end).

El tipo de dirección utilizado en la capa de Red es la dirección del **Protocolo de Internet (IP)**. La dirección IP de destino del mensaje sigue siendo la misma durante todo el viaje, mientras que **la dirección MAC de destino es diferente en cada salto.**

## Capa 4: La capa de transporte (Transport Layer)

La Capa 4 también utiliza su propio esquema de direccionamiento: los números de puerto (port numbers). Al dirigir un mensaje a un puerto en particular, puede enviar mensajes a un proceso de aplicación en particular en el host de destino. 

> Los números de puerto de la Capa 4 no están relacionados con los puertos físicos en un dispositivo al que conectamos cables (que son un aspecto de la Capa 1, la capa Física). Mismo nombre, concepto diferente.

Protocolos de capa 4 más comunes:
- **Protocolo de Control de Transmisión (TCP):** implementa verificaciones para garantizar que cada mensaje llegue a su destino y es utilizado por protocolos de la capa de Aplicación como HTTP y HTTPS (utilizados para acceder a sitios web)
- **Protocolo de Datagramas de Usuario (UDP):** adopta un enfoque de "enviar y olvidar"; no verifica para asegurarse de que cada mensaje llegue al destino. UDP es utilizado por protocolos de Voz sobre IP (VoIP) —utilizados para llamadas telefónicas— y protocolos de transmisión de video en vivo, entre otros.

## Capa 7: La capa de aplicación (Application Layer)

La capa de Aplicación es la interfaz entre las aplicaciones que se ejecutan en una computadora y la red. Utilizando protocolos de Capa 7, una aplicación que se ejecuta en una computadora puede preparar un mensaje para ser enviado a través de la red. Este mensaje podría ser, por ejemplo, una solicitud de un navegador web para recuperar una página web que está alojada en un servidor web. Las Capas 2, 3 y 4 son entonces responsables de entregar ese mensaje a la aplicación apropiada en la computadora de destino.


Los protocolos de Capa 7, como HTTPS, **no son aplicaciones de usuario en sí mismos**; más bien, proporcionan servicios a esas aplicaciones para permitirles comunicarse con aplicaciones en otras computadoras a través de la red. 

