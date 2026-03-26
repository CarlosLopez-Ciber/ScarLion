---
title: Stacks
description: El stack (pila) se define como una región contigua de la memoria de acceso aleatorio (RAM) reservada para el almacenamiento temporal de datos y la gestión del flujo de control del programa. A diferencia del acceso directo mediante direcciones de memoria estáticas o etiquetas, el stack ofrece una estructura de gestión dinámica que automatiza el seguimiento de las localizaciones de memoria, optimizando la preservación de estados y la comunicación entre subrutinas.
---

## 1. Definición y Propósito General

El _stack_ (pila) se define como una región contigua de la memoria de acceso aleatorio (RAM) reservada para el almacenamiento temporal de datos y la gestión del flujo de control del programa. A diferencia del acceso directo mediante direcciones de memoria estáticas o etiquetas, el stack ofrece una estructura de gestión dinámica que automatiza el seguimiento de las localizaciones de memoria, optimizando la preservación de estados y la comunicación entre subrutinas.

## 2. Estructura LIFO y Mecánica Operativa

El stack opera bajo el paradigma **LIFO** (_Last-In, First-Out_), donde el último elemento almacenado es el primero en ser recuperado. Esta estructura es fundamental para el anidamiento de funciones y la gestión de interrupciones.

### Dinámica de Crecimiento

En la arquitectura Intel 8086, el stack posee una naturaleza descendente. Esto implica que, a medida que se insertan datos, el puntero de pila se desplaza hacia direcciones de memoria inferiores.

- **Límite Superior (Base):** Generalmente inicializado en la dirección más alta del segmento ($0xFFFF$).
    
- **Dirección de Crecimiento:** Hacia el origen de la memoria ($0x0000$).
    

## 3. Registros de Control y Direccionamiento

La ubicación y el estado actual del stack se determinan mediante un par de registros específicos que forman una dirección lógica segmentada:

1. **SS (Stack Segment):** Registro de segmento que define la base de la sección de memoria dedicada al stack.
    
2. **SP (Stack Pointer):** Registro de desplazamiento que apunta al _Top of Stack_ (ToS), es decir, la dirección del último elemento válido insertado.
    

La dirección física efectiva se calcula mediante la fórmula de segmentación estándar:

  

$$\text{Dirección Física} = (SS \times 16) + SP$$

## 4. Instrucciones del Conjunto de Comandos (ISA)

La interacción con el stack se realiza principalmente a través de dos instrucciones fundamentales: `PUSH` y `POP`.

### Tabla Comparativa de Operaciones

|   |   |   |   |
|---|---|---|---|
|**Instrucción**|**Acción Técnica**|**Efecto en el Registro SP**|**Descripción**|
|`PUSH src`|Escritura en memoria|Decremento ($SP = SP - 2$)|Transfiere el contenido de un registro o memoria al stack.|
|`POP dest`|Lectura de memoria|Incremento ($SP = SP + 2$)|Extrae el valor del ToS hacia un destino y libera el espacio.|

_Nota: En el 8086, las operaciones de stack se realizan comúnmente en palabras (words) de 16 bits, por lo que el_ $SP$ _se modifica en intervalos de 2 bytes._

## 5. Aplicaciones Funcionales en el Desarrollo

El uso del stack es imperativo en los siguientes escenarios técnicos:

- **Preservación de Registros:** Almacenamiento temporal de los estados de los registros generales antes de ejecutar procesos que requieren el uso de dichos recursos.
    
- **Gestión de Subrutinas:** Almacenamiento automático del _Return Address_ (puntero de retorno) cuando se invoca una instrucción `CALL`.
    
- **Paso de Parámetros:** Transferencia de argumentos entre funciones en lenguajes de alto nivel durante la fase de compilación.
    
- **Variables Locales:** Asignación dinámica de espacio para datos temporales dentro del ámbito de una función.
    

## 6. Implicaciones en Seguridad: Vulnerabilidad de Desbordamiento

El stack es un vector crítico en ciberseguridad debido a su uso para almacenar direcciones de retorno. El fenómeno conocido como **Buffer Overflow** (desbordamiento de búfer) ocurre cuando un programa escribe datos más allá de los límites asignados a un búfer en el stack.

Si un atacante logra sobrescribir la _Return Address_ almacenada en el stack, puede desviar el flujo de ejecución hacia código arbitrario (shellcode). Este principio es la base de las técnicas de **Remote Code Execution (RCE)**, donde se manipula el $SP$ o los datos contenidos en el segmento para obtener control total sobre el sistema procesador.

### Ejemplo de Implementación en Ensamblador

```asm
; Demostración de preservación de estado
start:
MOV AX, 0xABCD      ; Carga de valor hexadecimal en registro AX
PUSH AX             ; Almacenamiento en stack (SP decrementa)
MOV CX, 0x1234      ; Uso del registro para otros fines
POP BX              ; Recuperación del valor original hacia BX (SP incrementa)
```