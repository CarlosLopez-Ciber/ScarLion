---
title: Procesadores
description: Para escribir código en Assembly de manera efectiva, es crucial entender qué ocurre físicamente dentro de la computadora. El procesador no "entiende" palabras; entiende estados eléctricos que activan circuitos específicos.
---

## Parte 1

### 1. Lógica del Hardware

Para escribir código en **Assembly** de manera efectiva, es crucial entender qué ocurre físicamente dentro de la computadora. El procesador no "entiende" palabras; entiende estados eléctricos que activan circuitos específicos.

### 2. Anatomía del Procesador

Un procesador se puede visualizar en dos partes principales:

- **Cuerpo de Silicio:** El núcleo donde reside la inteligencia y los miles de millones de componentes internos.
    
- **Pines de Conexión:** Los contactos metálicos que permiten la entrada y salida de señales.
    
    - **Entrada:** Datos o comandos que vienen de periféricos o memoria.
        
    - **Salida:** Resultados de operaciones enviados hacia otros componentes.
        

### 3. El Corazón de la CPU: Transistores y Compuertas

El interior del procesador es un conjunto masivo de interruptores llamados **transistores**.

- **Transistores:** Actúan como conmutadores (_switching_).
    
- **Compuertas Lógicas (Logic Gates):** Son circuitos formados por transistores organizados para realizar operaciones lógicas básicas. Al encadenar estas compuertas, se crean circuitos complejos capaces de sumar, restar, multiplicar o mover datos.
    

### 4. Lógica Fundamental: Las Tablas de Verdad

El video destaca dos compuertas esenciales para entender cómo se procesa la información:

#### A. Compuerta AND (Y)

Solo entrega una salida "verdadera" (1) si **ambas** entradas son 1. 

#### B. Compuerta OR (O)

Entrega una salida "verdadera" (1) si **al menos una** de las entradas es 1. 

> [Puerta lógica](https://es.wikipedia.org/wiki/Puerta_l%C3%B3gica)


> **Otras compuertas mencionadas:** **XOR** (OR exclusivo), **NOT** (inversor), **NAND** y **NOR** (versiones negadas).

### 5. Comunicación: De la Electricidad al Binario

¿Cómo le decimos al procesador qué hacer? Todo se reduce a señales eléctricas:

1. **Voltaje:** Se aplican voltajes altos (ej. 5V) para representar un **1** y voltajes bajos (ej. 0V) para representar un **0**.
    
2. **Instrucciones:** Una combinación específica de estos estados (como `10110011`) entra por los pines.
    
3. **Acción:** Esa señal eléctrica fluye a través de la red de compuertas lógicas, activando el circuito diseñado para una tarea específica (como sumar dos números).
    

---

### El concepto de "Instruction Set"

Para redondear la idea del video: cada procesador tiene un diseño físico de compuertas diferente. El conjunto de todas las combinaciones binarias que ese procesador puede entender y ejecutar se llama **Instruction Set Architecture (ISA)**. Cuando programas en Ensamblador, estás usando mnemónicos (como `MOV` o `ADD`) que representan directamente esas señales eléctricas de 1s y 0s que activan las compuertas lógicas.

## Parte 2


### La Arquitectura Interna

Para manejar la complejidad de miles de millones de compuertas lógicas, dividimos el procesador en bloques funcionales:

#### 1. Control Unit (Unidad de Control)

Es el "director de orquesta". Su función principal es coordinar todo lo que sucede:

- Recibe las entradas del procesador.
    
- Decide cuándo y cómo mover datos entre la memoria y otras unidades.
    
- Orquestra la ejecución de las instrucciones.
    

#### 2. ALU (Arithmetic Logic Unit)

Es el "músculo" del procesador. Aquí es donde ocurre la magia matemática:

- Contiene circuitos específicos (como sumadores) para realizar operaciones aritméticas ($+, -, \times, \div$) y lógicas.
    
- Recibe datos de los registros, opera con ellos y devuelve un resultado.
    

#### 3. Registros Internos

Son pequeñas celdas de memoria de alta velocidad ubicadas **dentro** del procesador. No deben confundirse con la RAM o el disco duro.

- **Propósito General (A, B, C, D):** En nuestro modelo de 8 bits, cada uno almacena exactamente **1 byte**. Se usan para guardar datos temporales antes y después de una operación.
    
- **Instruction Pointer (IP):** Un registro especial que apunta a la dirección de la siguiente instrucción que debe ejecutarse.
    
- **Ancho de Registro (Register Width):** El hecho de que estos registros sean de 8 bits es lo que define a este como un "procesador de 8 bits".
    

---

### Instruction Set

Cada procesador tiene un **Instruction Set** (Conjunto de Instrucciones) predefinido. Son códigos binarios que, al entrar por los pines, activan circuitos específicos en la Unidad de Control.

| **Instrucción** | **Código Binario (8 bits)** | **Descripción**                                                             |
| --------------- | --------------------------- | --------------------------------------------------------------------------- |
| **MOV A**       | `10110000`                  | Prepara al procesador para recibir datos y guardarlos en el registro **A**. |
| **MOV B**       | `10110001`                  | Lo mismo que el anterior, pero para el registro **B**.                      |
| **ADD**         | `00000001`                  | Suma el contenido de **A + B** y guarda el resultado en **A**.              |
| **NOP**         | `10010000`                  | (_No Operation_) El procesador no hace nada en ese ciclo, solo espera.      |

---

### Comunicación y Sincronización: CPU y ROM

Para que el programa sea persistente y automático, necesitamos conectar el procesador a una **ROM** (Read-Only Memory).

### El Bus de Direcciones y Datos (AD Lines)

En muchos procesadores, los pines son **bidireccionales**.

1. **Salida (Address):** El procesador envía un número binario a la ROM indicando qué "celda" o dirección de memoria quiere leer.
    
2. **Entrada (Data):** La ROM responde enviando el contenido de esa dirección (el código de instrucción o el dato) de vuelta al procesador.
    

#### El Reloj (Clock) y la Señal R/W

- **Clock:** Es una señal de onda cuadrada. En cada "pulso" (flancos de subida o bajada), el procesador avanza un paso en su tarea. Define la velocidad de ejecución (Hz, MHz, GHz).
    
- **RW (Read/Write):** Una señal que le dice a la ROM si el procesador está intentando "escribir" una dirección para buscar algo o "leer" el dato que la ROM está enviando, evitando que las señales choquen.
    

---

> **Dato curioso:** Cuando decimos que un procesador es de 8 bits, 32 bits o 64 bits, nos referimos principalmente al tamaño de estos registros internos y a cuánta información pueden procesar de un solo golpe.


## Parte 3

### 1. El Instruction Set (Conjunto de Instrucciones)

El **Instruction Set** es el "diccionario" del procesador. Cada instrucción tiene un nombre humano (mnemónico) y un código binario que el hardware puede interpretar, llamado **OpCode** (Operation Code).

| **Mnemónico** | **OpCode (Binario)** | **Descripción**                                      |
| ------------- | -------------------- | ---------------------------------------------------- |
| **MOV A**     | `11110011`           | Carga el siguiente byte de memoria en el Registro A. |
| **MOV B**     | `11110101`           | Carga el siguiente byte de memoria en el Registro B. |
| **ADD**       | `00000001`           | Suma A + B y guarda el resultado en A.               |
| **NOP**       | `10010000`           | No hace nada (_No Operation_).                       |

### 2. Organización de la Memoria y el Entry Point

En los procesadores reales, el programa no siempre comienza en la dirección `0000`.

- **Entry Point:** Es la dirección de memoria específica que el procesador consulta automáticamente al encenderse o reiniciarse.
    
- **Ejemplo del video:** El programa comienza en la dirección `F0` (hexadecimal), que es el "medio" del espacio de direcciones del sistema.
    

### 3. Escritura del Programa: Sumar 2 + 2

Para realizar una suma, no basta con dar la orden `ADD`. Primero debemos preparar los datos en los registros internos. El programa en memoria se vería así:

1. **Dirección F0:** `OpCode de MOV A` (Prepara el registro A).
    
2. **Dirección F1:** `00000010` (El número 2 que se moverá a A).
    
3. **Dirección F2:** `OpCode de MOV B` (Prepara el registro B).
    
4. **Dirección F3:** `00000010` (El número 2 que se moverá a B).
    
5. **Dirección F4:** `OpCode de ADD` (Suma lo que hay en A y B).
    
6. **Dirección F5:** `OpCode de NOP` (Detiene la actividad).
    

---

### 4. El Ciclo de Ejecución Paso a Paso

El proceso por el cual el procesador lee y ejecuta estas órdenes se conoce como el ciclo de **Fetch-Decode-Execute** (Buscar, Decodificar y Ejecutar).

#### El rol del Instruction Pointer (IP)

El registro **IP** siempre contiene la dirección de la siguiente instrucción.

1. **Fetch (Búsqueda):** El procesador pone el valor del IP en el bus de direcciones (señal _Write_) y la ROM responde enviando el contenido de esa celda por el bus de datos (señal _Read_).
    
2. **Decode (Decodificación):** La **Control Unit** recibe el OpCode y activa los circuitos necesarios (por ejemplo, prepara el Registro A para recibir datos).
    
3. **Execute (Ejecución):** Se realiza la acción (ej. el número 2 viaja desde la ROM al Registro A).
    

#### Sincronización y Ciclos de Reloj

Es importante notar que una sola instrucción (como `MOV A, 2`) no ocurre instantáneamente. Requiere varios **ciclos de reloj** para completar el proceso de pedir la dirección, leer el OpCode, pedir la siguiente dirección y leer el dato.

