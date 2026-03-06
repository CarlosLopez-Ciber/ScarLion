---
title: Sintaxis General de Assembly x86
description: Aprende las reglas de sintaxis de Assembly x86. Diferencias entre Intel y AT&T, estructura de instrucciones Destino, Origen y tipos de operandos.
---


El lenguaje ensamblador x86 constituye la representación mnemónica del código de máquina para la familia de procesadores de arquitectura x86. Su correcta implementación requiere comprender las convenciones sintácticas que rigen la estructuración de las instrucciones y la manipulación de los datos.

## 1. Estándares de Sintaxis: Intel vs. AT&T

En el ecosistema x86 coexisten dos estándares principales de sintaxis. Aunque ambos se traducen al mismo código de operación (_opcode_) binario, difieren significativamente en su representación textual:

- **Sintaxis Intel:** Es el estándar predominante en entornos Windows y en la documentación técnica oficial de Intel. Se caracteriza por situar el operando de destino antes que el de origen.
    
- **Sintaxis AT&T:** Es el estándar convencional en sistemas operativos tipo Unix (como Linux). Se distingue por el uso de prefijos (como `%` para registros y `$` para valores inmediatos) y por invertir el orden de los operandos respecto a la sintaxis Intel.
    

La mayoría de los ensambladores modernos (NASM, GAS, MASM) permiten especificar mediante directivas cuál de estos estándares se desea emplear para la interpretación del código fuente.

## 2. Estructura de la Instrucción en Sintaxis Intel

Una instrucción típica en ensamblador se compone de un mnemónico seguido de sus operandos. El formato general se define de la siguiente manera:

`instrucción <destino>, <origen>`

### Componentes de la instrucción:

1. **Mnemónico:** Es la palabra clave que identifica la operación a realizar (ej. `MOV`, `ADD`, `SUB`).
    
2. **Operando de Destino (**_**Destination**_**):** Ubicación donde se almacenará el resultado de la operación o donde se recibirán los datos.
    
3. **Operando de Origen (**_**Source**_**):** Ubicación o valor que suministra los datos para la operación.
    

Es fundamental notar que no todas las instrucciones requieren dos operandos; existen instrucciones sin operandos, con un único operando de destino o con combinaciones específicas según la arquitectura del procesador.

## 3. Clasificación de los Operandos

Los operandos representan los insumos de la instrucción y pueden clasificarse en tres categorías fundamentales:

- **Registros (**_**Registers**_**):** Ubicaciones de almacenamiento de alta velocidad internas a la CPU (ej. `AX`, `EBX`, `RSP`). Son los operandos más eficientes en términos de tiempo de ejecución.
    
- **Memoria (**_**Memory**_**):** Referencias a direcciones en la memoria RAM. El acceso a estos operandos suele requerir modificadores de tamaño (como `BYTE PTR` o `WORD PTR`) para especificar la cantidad de información que se debe procesar.
    
- **Valores Inmediatos (**_**Immediates**_**):** Valores numéricos constantes o literales (ej. `6`, `0x01`, `1010b`) que se encuentran codificados directamente dentro de la instrucción.
    

## 4. Análisis Comparativo de la Instrucción de Transferencia

La instrucción `MOV` ejemplifica la diferencia crítica entre ambos estándares. La acción de copiar el contenido del registro $BX$ al registro $AX$ se expresa de la siguiente forma:

|   |   |   |
|---|---|---|
|**Sintaxis**|**Representación**|**Lógica de flujo**|
|**Intel**|`MOV AX, BX`|Origen ($BX$) $\rightarrow$ Destino ($AX$)|
|**AT&T**|`mov %bx, %ax`|Origen ($bx$) $\rightarrow$ Destino ($ax$)|

Aunque el orden de los operandos es inverso, la operación lógica resultante en el procesador es idéntica. En la sintaxis Intel, el primer operando siempre actúa como el receptor de la operación.

## 5. Consideraciones Técnicas Adicionales

Para un desarrollo robusto en ensamblador, deben considerarse elementos que complementan la sintaxis básica:

- **Modificadores de Tamaño:** Determinan si una operación afecta a un byte (8 bits), una palabra (_word_, 16 bits), una palabra doble (_doubleword_, 32 bits) o una palabra cuádruple (_quadword_, 64 bits).
    
- **Contexto de Ejecución:** La validez de ciertos registros y modos de direccionamiento depende de si el procesador opera en modo real (16 bits), modo protegido (32 bits) o modo largo (64 bits).