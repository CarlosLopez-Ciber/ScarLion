---
title: Gestión de Cadenas
description: La programación en lenguaje ensamblador para la arquitectura Intel 8086 requiere un conocimiento profundo de la gestión de interrupciones de software y la manipulación directa de registros. Para la visualización de datos en pantalla, el estándar histórico se basa en los servicios proporcionados por la interrupción de video del BIOS (INT 10h).
---

La programación en lenguaje ensamblador para la arquitectura Intel 8086 requiere un conocimiento profundo de la gestión de interrupciones de software y la manipulación directa de registros. Para la visualización de datos en pantalla, el estándar histórico se basa en los servicios proporcionados por la interrupción de video del BIOS (**INT 10h**).

## 1. Fundamentos de la Interrupción INT 10h

La interrupción `0x10` es el punto de entrada para los servicios de video en sistemas compatibles con IBM PC. Dependiendo del valor cargado en el registro de alto nivel `AH`, el BIOS ejecuta diversas subfunciones que van desde el cambio de modo de video hasta la escritura de píxeles o caracteres.

### Comparativa de Subfunciones de Escritura

|   |   |   |
|---|---|---|
|**Subfunción (AH)**|**Propósito**|**Características Principales**|
|**0Ah**|Escribir carácter en la posición del cursor|Requiere iteración manual (loop) para imprimir cadenas. Solo procesa un carácter a la vez.|
|**13h**|Escribir cadena de caracteres (Write String)|Automatiza la iteración. Permite especificar longitud, atributos y posición de memoria del segmento.|

## 2. Especificación Técnica de la Subfunción 13h (Write String)

La subfunción `13h` es más eficiente para la salida de texto complejo, ya que delega la lógica de iteración al firmware del BIOS. Para su ejecución, se requiere la configuración precisa de los siguientes registros:

- **AH (0x13):** Identificador de la subfunción.
    
- **AL (Write Mode):** Determina cómo se actualiza el cursor y si los caracteres contienen atributos de color.
    
- **CX (String Length):** Cantidad exacta de bytes (caracteres) a procesar.
    
- **ES:BP (Pointer):** Dirección segmentada de la cadena en la memoria física.
    
    - **ES (Extra Segment):** Registro de segmento donde reside la cadena.
        
    - **BP (Base Pointer):** Desplazamiento (offset) inicial dentro del segmento.
        

### Consideración sobre el Direccionamiento de Memoria

En la arquitectura 8086, los registros de segmento (CS, DS, SS, ES) no admiten la carga directa de valores inmediatos (ej. `MOV ES, 0x0000` es una instrucción inválida). Es imperativo utilizar un registro de propósito general (como `AX` o `BX`) como puente para transferir el valor al registro de segmento.

## 3. Implementación del Programa "Hello World"

El siguiente programa ilustra la disposición de datos y la secuencia de control para emitir una cadena de caracteres.

### Segmento de Datos y Directiva DB

La directiva `DB` (Define Byte) se utiliza para asignar espacio en memoria para datos estáticos. El uso de etiquetas (_labels_) permite al ensamblador calcular las direcciones de memoria necesarias para los punteros de base.

```asm
; Programa de salida para arquitectura 8086
; Objetivo: Emitir la cadena "Hello World!" en pantalla

string: db "Hello World!"           ; Reserva de bytes en memoria

start:
    ; Configuración de la función de servicio de video
    mov AH, 0x13                    ; Carga de subfunción 0x13 (Write String)

    ; Definición de la longitud de la cadena
    ; En implementaciones dinámicas, esto se calcularía restando punteros
    mov CX, 12                      ; Longitud de "Hello World!" (incluyendo espacio y puntuación)

    ; Configuración del segmento extra (ES) a 0x0000
    mov BX, 0x0000                  ; Registro puente
    mov ES, BX                      ; ES apunta ahora al segmento base

    ; Configuración del puntero de base (BP)
    ; La palabra clave 'offset' devuelve la dirección relativa del label
    mov BP, offset string           ; Carga de la dirección de inicio de la cadena

    ; Ejecución de la interrupción de software
    int 0x10                        ; Transferencia de control al BIOS
```

## 4. Análisis de Registros y Estado del Sistema

Al ejecutar el código anterior en un entorno de emulación, se observan cambios críticos en la estructura interna de la CPU:

1. **Punteros y Segmentos:** El registro `ES` se sincroniza con el segmento de datos donde se alojan las constantes. El `BP` recibe la dirección exacta de memoria donde comienza el byte correspondiente a la 'H' (ASCII `0x48`).
    
2. **Flags de Estado:** Aunque esta operación es principalmente de E/S, el estado de los registros de propósito general (A, B, C, D) se ve alterado para satisfacer los parámetros de la interrupción.
    
3. **Memoria:** La cadena "Hello World!" reside en la memoria principal como una secuencia de valores hexadecimales representativos del estándar ASCII. La interrupción lee secuencialmente estos bytes basándose en el contador proporcionado en `CX`.
    

Este método de salida es fundamental para el desarrollo de cargadores de arranque (_bootloaders_) y sistemas operativos básicos, donde las abstracciones de alto nivel de los lenguajes modernos aún no están disponibles.