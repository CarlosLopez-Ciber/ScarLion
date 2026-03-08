---
title: Transferencia de Datos en Memoria x86
description: La interacción práctica con la memoria en la arquitectura 8086 requiere el dominio de la instrucción MOV y la comprensión de las restricciones de hardware que rigen a los registros de segmento. A continuación, se detallan los procedimientos para la manipulación de datos entre el procesador y la memoria RAM.
---


La interacción práctica con la memoria en la arquitectura 8086 requiere el dominio de la instrucción `MOV` y la comprensión de las restricciones de hardware que rigen a los registros de segmento. A continuación, se detallan los procedimientos para la manipulación de datos entre el procesador y la memoria RAM.

## 1. Sintaxis de Acceso a Memoria

Para referenciar una ubicación de memoria en ensamblador, se utilizan corchetes `[]`, los cuales indican al procesador que el valor contenido es una dirección de memoria (desplazamiento o _offset_) y no un valor literal.

### Directivas de Tamaño (_Size Directives_)

Debido a que una dirección de memoria puede contener diferentes tipos de datos, es imperativo especificar el tamaño de la operación para evitar ambigüedades en el ensamblador:

- **`BYTE`:** Indica una operación de 8 bits.
    
- **`WORD`:** Indica una operación de 16 bits.
    

**Ejemplo de sintaxis:**

`MOV BYTE [0x02], 0xFF` ; Almacena el valor hexadecimal FF en la dirección resultante del segmento de datos más el desplazamiento 0x02.

## 2. Restricciones Técnicas de los Registros de Segmento

Una de las limitaciones fundamentales de la arquitectura 8086 es la imposibilidad de cargar valores inmediatos (literales) directamente en los registros de segmento (`DS`, `CS`, `SS`, `ES`).

### El patrón de registro "puente"

Para inicializar o modificar un registro de segmento, se debe utilizar un registro de propósito general (como `AX` o `BX`) como intermediario. Esta restricción existe debido a que la unidad de ejecución no posee un camino de datos directo (_opcode_) para mover constantes hacia los registros de segmento.

**Procedimiento correcto:**

1. Cargar el valor en un registro general: `MOV BX, 0x1000`
    
2. Transferir al registro de segmento: `MOV DS, BX`
    

## 3. Dinámica del Segmento de Datos (DS) y Direccionamiento

Como se estableció en fundamentos teóricos, la dirección física real en la memoria de 1 MB es el resultado de la combinación del registro de segmento y el desplazamiento.

Si `DS = 1000h` y la instrucción es `MOV BYTE [0x02], 0xFF`, el procesador calcula la dirección física mediante un desplazamiento de 4 bits (equivalente a multiplicar por 16 o `10h` en hexadecimal):

  

$$\text{Dirección Física} = (1000h \times 10h) + 0002h = 10002h$$

Cualquier cambio en el contenido de `DS` desplazará automáticamente la "ventana" de acceso a la memoria, haciendo que el mismo desplazamiento (`[0x02]`) apunte a una ubicación física distinta en la RAM.

## 4. Transferencia de Memoria a Registros

El proceso de extracción de datos sigue una lógica inversa pero mantiene las mismas reglas de direccionamiento y tamaño. Al mover datos desde la memoria hacia un registro, el tamaño del registro de destino suele dictar el tamaño de la transferencia, aunque el uso de directivas es una buena práctica de programación.

**Ejemplos de extracción:**

- `MOV AL, BYTE [0x02]` ; Carga un byte desde la memoria al registro de 8 bits `AL`.
    
- `MOV AX, WORD [0x03]` ; Carga una palabra (16 bits) desde la memoria al registro de 16 bits `AX`.
    

## 5. Resumen de Operaciones (Código de Referencia)

El siguiente bloque resume la implementación técnica de estas operaciones:

```asm
START:

; Configuración del segmento de datos a 1000h
MOV BX, 0x1000      ; Carga el offset en BX
MOV DS, BX          ; Actualiza DS (Dirección base: 10000h)

; Escritura en memoria
MOV BYTE [0x02], 0xFF    ; Escribe en 10002h
MOV WORD [0x03], 0xEEEE  ; Escribe en 10003h (ocupa 10003h y 10004h)

; Lectura de memoria
MOV AL, BYTE [0x02]      ; AL ahora contiene 0xFF
MOV AX, WORD [0x03]      ; AX ahora contiene 0xEEEE
```