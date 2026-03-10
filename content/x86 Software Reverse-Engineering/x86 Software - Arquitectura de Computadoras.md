# Arquitectura de Computadoras

La arquitectura de un ordenador se define por la interacción entre su unidad de procesamiento, los sistemas de control de flujo de datos y la jerarquía de almacenamiento.

![[Pasted image 20260309102331.png]]

## 1. La Unidad Central de Procesamiento (CPU)

La CPU es el núcleo operativo del sistema. Su funcionamiento interno depende de tres componentes críticos:

- **Unidad Aritmético-Lógica (ALU):** Encargada de ejecutar las operaciones matemáticas ($+$ , $\times$, etc.) y lógicas requeridas por las instrucciones.
    
- **Registros:** Pequeñas unidades de almacenamiento de alta velocidad ubicadas dentro del silicio de la CPU. Actúan como la entrada y salida inmediata para la mayoría de las instrucciones. Se acceden mediante nombres específicos y poseen tamaños fijos.
    
- **Unidad de Control:** Responsable de la orquestación del sistema. Realiza la lectura de instrucciones (fetch) y coordina el comportamiento de los demás componentes para asegurar la ejecución del código.
    

## 2. Gestión de Tráfico y Periféricos

La comunicación entre la CPU y el resto del hardware no es directa, sino que está mediada por una infraestructura de interconexión:

### El Puente (Bridge)

Actúa como un controlador de tráfico inteligente. Conecta la CPU con la memoria principal y el bus de Entrada/Salida (E/S). Su función principal es enrutar los datos hacia el destino correcto, gestionando las diferentes velocidades y protocolos de los buses.

### Periféricos

Son los dispositivos que permiten la interacción con el entorno exterior (teclado, ratón, monitores, adaptadores de red). Se conectan al bus de E/S y son gestionados a través del puente para enviar o recibir información desde la CPU.

## 3. Jerarquía de Almacenamiento: Registros vs. Memoria

Aunque ambos componentes almacenan datos, su diseño responde a objetivos distintos dentro de la arquitectura:

|                    |                                      |                                       |
| ------------------ | ------------------------------------ | ------------------------------------- |
| **Característica** | **Registros**                        | **Memoria (RAM)**                     |
| **Ubicación**      | Interna (dentro de la CPU)           | Externa (conectada vía bus/puente)    |
| **Velocidad**      | Extremadamente alta (acceso directo) | Moderada (sujeta a latencia del bus)  |
| **Capacidad**      | Muy limitada (pocas unidades)        | Abundante (gigabytes)                 |
| **Estructura**     | Nombres específicos (e.g., `EAX`)    | Serie lineal de bytes direccionables  |
| **Costo**          | Elevado por unidad de almacenamiento | Bajo en comparación con los registros |

### Flujo de Datos

El software reside principalmente en la memoria principal debido a su volumen. Durante la ejecución, el procesador extrae fragmentos específicos de datos y código desde la memoria, atravesando el puente y el bus, para colocarlos en los **registros**. Solo cuando los datos están en los registros pueden ser operados directamente por la ALU.
