---
title: Endianness
description: En el ámbito de la arquitectura de computadores, el término endianness define el orden secuencial en el que los bytes de un dato de mayor tamaño (como una word de 16 bits o una doubleword de 32 bits) se almacenan en las direcciones de memoria. Este concepto es crítico en la programación de bajo nivel, ya que determina cómo se interpretan los flujos de datos entre el procesador y la memoria RAM.
---

En el ámbito de la arquitectura de computadores, el término _endianness_ define el orden secuencial en el que los bytes de un dato de mayor tamaño (como una _word_ de 16 bits o una _doubleword_ de 32 bits) se almacenan en las direcciones de memoria. Este concepto es crítico en la programación de bajo nivel, ya que determina cómo se interpretan los flujos de datos entre el procesador y la memoria RAM.

## 1. Terminología y Jerarquía de Bytes

Para analizar la ordenación de bytes, es necesario identificar la jerarquía de importancia dentro de un valor numérico, tomando como ejemplo una palabra de 16 bits representada en hexadecimal como $0xABCD$:

- **Least Significant Byte (LSB):** Representa la porción de menor peso del número. En el valor $0xABCD$, el LSB es $CD$, ya que ocupa las posiciones binarias de menor valor ($2^0$ a $2^7$).
    
- **Most Significant Byte (MSB):** Representa la porción de mayor peso. En el valor $0xABCD$, el MSB es $AB$, ocupando las posiciones de mayor valor ($2^8$ a $2^{15}$).
    

## 2. Modelos de Organización de Memoria

Existen dos estándares principales para la disposición de estos componentes en direcciones consecutivas:

### Big-Endian

En el modelo _Big-Endian_, el byte más significativo (MSB) se almacena en la dirección de memoria más baja (la dirección base), mientras que el LSB se sitúa en la dirección subsiguiente.

- **Distribución para** $0xABCD$**:** `[Dirección N: AB]`, `[Dirección N+1: CD]`.
    
- **Contexto:** Este orden coincide con la lectura humana convencional de izquierda a derecha. Es el estándar utilizado en protocolos de red (conocido como _Network Byte Order_) y en arquitecturas de procesadores como la familia Motorola 68000.
    

### Little-Endian

En el modelo _Little-Endian_, el byte menos significativo (LSB) se almacena en la dirección de memoria más baja, desplazando el MSB a la dirección más alta.

- **Distribución para** $0xABCD$**:** `[Dirección N: CD]`, `[Dirección N+1: AB]`.
    
- **Contexto:** Es el estándar nativo de la arquitectura Intel x86. Aunque su visualización en volcados de memoria puede resultar contraintuitiva, facilita ciertas operaciones aritméticas a nivel de hardware.
    

## 3. Implementación en la Arquitectura Intel 8086

El procesador Intel 8086 es una arquitectura **Little-Endian**. Esta característica se manifiesta claramente al realizar transferencias de datos entre registros y memoria.

### Dinámica de Escritura y Lectura

Cuando se ejecuta una instrucción de transferencia de una palabra (_word_) hacia la memoria, el hardware invierte el orden lógico de los bytes durante la escritura:

$$\text{Instrucción: } \texttt{MOV WORD [0x00], 0xABCD} \implies \text{Memoria: } [0x00] = CD, [0x01] = AB$$

Sin embargo, el procesador mantiene la transparencia lógica al realizar la operación inversa. Al mover el dato de vuelta a un registro, la unidad de control recompone el valor original:

$$\text{Instrucción: } \texttt{MOV AX, WORD [0x00]} \implies \text{Registro AX: } 0xABCD \text{ (AH=AB, AL=CD)}$$

![[Pasted image 20260308055604.png]]