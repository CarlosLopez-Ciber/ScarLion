# La Capa Física (Capa 1)

La **Capa Física** (Physical Layer) es la base fundamental del Modelo OSI. Sin ella, los protocolos lógicos de nivel superior no tienen un medio por el cual viajar. La Capa 1 abarca todo lo relacionado con la transmisión de señales crudas: cables, conectores, voltajes, frecuencias de radio y pulsos de luz.

Su función principal es la transmisión y recepción de flujos de **bits** no estructurados a través de un medio físico. Aquí no existen direcciones IP ni direcciones MAC; solo existen unos y ceros.

## 1. Señalización y Representación de Bits

Independientemente de la complejidad de la información (correos, videos, bases de datos), en la Capa 1 todo se reduce a bits binarios. La forma en que estos bits se representan físicamente depende del medio de transmisión.

### Métodos de Transmisión

- **Cobre (Electricidad):** Utiliza variaciones de voltaje. Por ejemplo, un estado de **0 voltios** puede representar un bit 0, mientras que **+5 voltios** representan un bit 1. El cambio de estado se gestiona mediante técnicas de codificación de línea (como Manchester o NRZ).
    
- **Fibra Óptica (Luz):** Utiliza pulsos de luz. La presencia de un pulso de luz indica un 1, y la ausencia (oscuridad) indica un 0. Es inmune a la interferencia electromagnética (EMI), un concepto clave para el examen.
    
- **Inalámbrico (Ondas de Radio):** Utiliza modulación de radiofrecuencia (RF) para transportar bits a través del aire (Wi-Fi, Bluetooth).
    

## 2. Estándares de Cableado y Conectores

El conector más común en redes Ethernet de cobre es el **RJ45** (Registered Jack 45).

Para que la comunicación sea exitosa, los hilos dentro del cable deben coincidir en ambos extremos según un esquema de colores específico: **T568A** y **T568B**.

### Configuración de Cables

La combinación de estos estándares en los extremos del cable determina el tipo de cable resultante:

|**Tipo de Cable**|**Configuración Extremo A**|**Configuración Extremo B**|**Uso Típico (Legacy/Examen)**|
|---|---|---|---|
|**Cable Directo (Straight-Through)**|T568B|T568B|Conectar dispositivos diferentes (PC a Switch, Switch a Router).|
|**Cable Cruzado (Crossover)**|T568A|T568B|Conectar dispositivos similares (Switch a Switch, PC a PC).|

> **Nota Técnica (Auto-MDI-X):** Aunque es vital conocer los cables cruzados para el examen teórico, en la práctica moderna, la mayoría de los switches y tarjetas de red tienen una función llamada **Auto-MDI-X**. Esta característica detecta automáticamente el tipo de cable y reconfigura la conexión electrónicamente, permitiendo usar un cable directo para conectar dos switches.

## 3. Topologías Físicas

La topología física se refiere a la disposición geométrica real de los cables y dispositivos.

- **Bus:** Todos los dispositivos se conectan a un único cable central. Es propenso a colisiones y un solo corte en el cable puede derribar toda la red.
    
- **Anillo (Ring):** Cada dispositivo se conecta a otros dos, formando un círculo. Utilizado en tecnologías antiguas como Token Ring.
    
- **Estrella (Star):** Todos los dispositivos se conectan a un punto central (como un Switch). Es la topología más común en Ethernet moderno. Si un cable falla, solo afecta a ese dispositivo.
    
- **Malla (Mesh):** Ofrece alta redundancia. En una malla completa, todos los dispositivos se conectan entre sí. Es común en infraestructuras WAN o de servidores críticos.
    

## 4. Ancho de Banda y Sincronización

La Capa 1 define cómo se utiliza el canal de comunicación.

### Sincronización de Bits

- **Asíncrono:** No hay un reloj compartido. El emisor utiliza **bits de inicio (start)** y **bits de parada (stop)** para indicar cuándo comienza y termina un byte. Es menos eficiente debido a la sobrecarga (overhead).
    
- **Síncrono:** El emisor y el receptor comparten un reloj de referencia común. Esto permite una transmisión continua de datos sin necesidad de bits de inicio/parada constantes, siendo más eficiente para grandes volúmenes de datos.
    

### Modos de Uso del Medio (Broadband vs. Baseband)

|**Característica**|**Baseband (Banda Base)**|**Broadband (Banda Ancha)**|
|---|---|---|
|**Frecuencia**|Utiliza todo el espectro del cable para una sola señal.|Divide el cable en múltiples canales de frecuencia.|
|**Señalización**|Digital (pulsos directos).|Analógica (señales moduladas).|
|**Bidireccionalidad**|Transmite y recibe en el mismo medio (Time Division).|Puede usar frecuencias distintas para subida y bajada.|
|**Ejemplo**|Ethernet estándar (LAN).|TV por Cable, DSL.|

### Multiplexación

Cuando usamos **Baseband**, necesitamos técnicas para que múltiples comunicaciones "parezcan" ocurrir simultáneamente.

- **TDM (Time Division Multiplexing):** Asigna ranuras de tiempo fijas a cada sesión.
    
- **FDM (Frequency Division Multiplexing):** Asigna diferentes frecuencias (canales) dentro de un medio broadband.
    

## 5. Dispositivos de Capa 1

Estos dispositivos operan puramente en el dominio físico. No analizan tramas, ni direcciones MAC, ni direcciones IP. Son "transparentes" a los datos.

1. **Hub (Concentrador):** Recibe una señal eléctrica en un puerto y la repite (regenera) por todos los demás puertos. Crea un único dominio de colisión y opera en **Half-Duplex**. Se considera obsoleto, pero es importante para entender la historia de Ethernet.
    
2. **Repetidor / Extensor:** Dispositivo diseñado para regenerar la señal y extender la distancia máxima del cableado (ej. superar los 100m de Ethernet).
    
3. **Conversor de Medios:** Hardware que permite conectar dos tipos de medios diferentes, típicamente cobre a fibra óptica, realizando una conversión de señal a nivel de Capa 1.
    
4. **Cables y Patch Panels:** Componentes pasivos que facilitan la interconexión física.
    

---

## Escenario de Solución de Problemas (Troubleshooting)

En el examen Network+, los problemas de Capa 1 son la causa más común de fallos de red "totales" para un usuario.

**Síntoma:** Un usuario reporta "No hay red" y el icono de red en el sistema operativo muestra una "X" roja o "Cable desconectado".

**Procedimiento de Diagnóstico de Capa 1:**

1. **Verificación Visual:** ¿Está el cable conectado firmemente en la PC y en el puerto de pared?
    
2. **Luces de Enlace (Link Lights):** Verifica los LEDs en la tarjeta de red (NIC).
    
    - _Luz apagada:_ No hay señal física (cable roto, puerto deshabilitado, switch apagado).
        
    - _Luz encendida (verde/ámbar):_ Existe conexión física de Capa 1.
        
3. **Herramientas:** Utilizar un **Comprobador de Cables (Cable Tester)** para verificar:
    
    - Continuidad (hilos rotos).
        
    - Mapa de cableado (Wire map): ¿Están los pines T568A/B en el orden correcto?
        
    - Cortocircuitos.