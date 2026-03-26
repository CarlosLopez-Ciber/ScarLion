---
title: Traiada CIA
description: El modelo de la Tríada CID (Confidencialidad, Integridad y Disponibilidad) constituye el marco teórico fundamental sobre el cual se erige la seguridad de la información moderna. Este paradigma, alineado con estándares internacionales como la ISO/IEC 27001 y las publicaciones especiales del NIST (SP 800-12), define los tres pilares indispensables para la protección de activos de información en entornos digitales y analógicos.
---


El modelo de la **Tríada CID** (Confidencialidad, Integridad y Disponibilidad) constituye el marco teórico fundamental sobre el cual se erige la seguridad de la información moderna. Este paradigma, alineado con estándares internacionales como la **ISO/IEC 27001** y las publicaciones especiales del **NIST (SP 800-12)**, define los tres pilares indispensables para la protección de activos de información en entornos digitales y analógicos.

## 1. Confidencialidad

La confidencialidad se define como la propiedad de la información por la cual se garantiza que esta no esté a disposición de personas, entidades o procesos **no autorizados**. Su objetivo primordial es la prevención de la divulgación no autorizada de datos sensibles.

### Mecanismos de Salvaguarda

Para asegurar la confidencialidad, se implementan controles técnicos y administrativos:

- **Cifrado Criptográfico:** Transformación de datos mediante algoritmos (ej. AES-256, RSA) para que resulten ininteligibles a terceros sin la clave correspondiente.
    
- **Control de Acceso Basado en Roles (RBAC):** Restricción del acceso a recursos basada en la identidad y funciones del usuario dentro de la organización.
    
- **Esteganografía:** Técnica de ocultación de mensajes o datos dentro de otros portadores para evitar la detección de la existencia de la comunicación.
    

### Ciclo de Vida de los Datos

La protección de la confidencialidad debe adaptarse a los tres estados técnicos de la información:

|   |   |   |
|---|---|---|
|**Estado de los Datos**|**Definición Técnica**|**Requisito de Seguridad**|
|**Datos en Reposo (At Rest)**|Información almacenada de forma persistente en soportes físicos o lógicos (HDD, SSD, Cloud Storage).|Implementación de cifrado de disco completo (FDE) o a nivel de archivo.|
|**Datos en Tránsito (In Motion)**|Información que atraviesa redes públicas o privadas mediante protocolos de comunicación.|Uso de túneles cifrados y protocolos seguros (TLS, IPsec, SSH).|
|**Datos en Uso (In Use)**|Información cargada en la memoria volátil (RAM) o registros de CPU siendo procesada activamente.|Protección de procesos en memoria y aislamiento de ejecución (Enclaves/TEE).|

## 2. Integridad

La integridad garantiza que la información se mantenga **exacta, completa y libre de modificaciones** no autorizadas o accidentales desde su creación hasta su destrucción. En términos de ciberseguridad, implica asegurar que el mensaje recibido en el destino sea una réplica exacta del emitido en el origen.

### Tecnologías de Verificación

La validación de la integridad se apoya en construcciones matemáticas y criptográficas:

- **Funciones Hash (Hashing):** Algoritmos de un solo sentido (como SHA-256) que generan un "resumen" o huella digital única. Cualquier alteración mínima en el archivo original resulta en un hash completamente distinto.
    
- **Firma Digital:** Proporciona integridad y autenticidad al combinar funciones hash con criptografía de clave pública.
    
- **No Repudio:** Capacidad técnica que impide que un emisor o receptor niegue haber procesado o enviado una información, garantizada mediante la vinculación de la identidad con la firma digital.
    

## 3. Disponibilidad

La disponibilidad asegura que los sistemas, redes y aplicaciones sean accesibles y funcionales para los usuarios autorizados en el momento exacto en que se requieran. Un sistema seguro es inútil si su acceso se ve interrumpido por fallos técnicos o ataques externos.

### Estrategias de Resiliencia y Continuidad

Para mitigar el riesgo de denegación de servicio o degradación de sistemas, se emplean las siguientes arquitecturas:

1. **Redundancia de Sistemas:** Implementación de componentes duplicados (RAID en almacenamiento, clústeres de servidores) para eliminar puntos únicos de fallo.
    
2. **Sistemas de Respaldo (Backup):** Procedimientos de copia periódica de datos con estrategias de recuperación ante desastres (DRP) probadas.
    
3. **Balanceo de Carga (Load Balancing):** Distribución equitativa del tráfico de red entre múltiples nodos para optimizar el rendimiento y evitar la saturación.
    
4. **Mitigación de DDoS:** Implementación de filtros de tráfico, sistemas de detección de intrusos (IDS/IPS) y limpieza de tráfico (Scrubbing Centers) para contrarrestar ataques de denegación de servicio distribuido.

