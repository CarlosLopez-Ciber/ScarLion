---
title: Registros
description: Resumen estructurado de la arquitectura de registros x86 (8086). Detalles sobre el acumulador, base, contador y datos, incluyendo la división en bytes High y Low.
---

## 1. Arquitectura de los Registros (16 bits)

A diferencia del procesador de 8 bits, el 8086 es un procesador de **16 bits**. Esto significa que sus registros principales pueden procesar el doble de información simultáneamente.

### Estructura "High" y "Low"

Cada registro de 16 bits (denominado **Word** o palabra) es divisible en dos secciones de 8 bits (**Bytes**). Esto permite al programador manipular datos pequeños sin desperdiciar espacio.

- **X (eXtended):** El registro completo de 16 bits (ej. AX).
    
- **H (High):** Los 8 bits superiores (el byte más significativo).
    
- **L (Low):** Los 8 bits inferiores (el byte menos significativo).

![[2026-03-04_12-22 1.png]]


---

## 2. Los "Cuatro Grandes" y sus Funciones

Aunque se llaman "de propósito general" y puedes usarlos para casi cualquier cosa, el 8086 está diseñado para que cada uno brille en tareas específicas:

|**Registro**|**Nombre**|**Función Principal**|
|---|---|---|
|**AX**|**Accumulator**|Operaciones aritméticas, lógicas y de entrada/salida (I/O). Es el más eficiente para cálculos.|
|**BX**|**Base**|Se usa como puntero de base para acceder a datos en memoria (arrays o estructuras).|
|**CX**|**Count**|Actúa como contador automático en instrucciones de bucle (`LOOP`) y operaciones repetitivas.|
|**DX**|**Data**|Complementa a AX en multiplicaciones/divisiones grandes y guarda direcciones de puertos I/O.|

---

## 3. La Jerarquía de Velocidad

Es vital recordar por qué nos esforzamos tanto en usar registros:

1. **Registros:** Acceso instantáneo (ciclos de reloj mínimos).
    
2. **Caché:** Muy rápida, pero fuera del núcleo de ejecución.
    
3. **RAM:** "Lenta" en comparación con el procesador.
    
4. **Disco Duro/SSD:** Un "caracol" comparado con los registros.
    

> **Regla de oro:** En Assembly, si puedes mantener un dato en un registro en lugar de enviarlo a la RAM, tu programa será drásticamente más rápido.

---

### El tamaño de los datos

Para redondear lo mencionado sobre los registros, es importante que te familiarices con estos términos que verás en cada línea de código:

- **Byte:** 8 bits (ej. `AL`, `BH`, `CL`).
    
- **Word (Palabra):** 16 bits (ej. `AX`, `BX`, `CX`). En la arquitectura 8086, el "tamaño de palabra" nativo es 16.
    

> **Nota técnica:** Cuando usas `AX`, estás modificando simultáneamente `AH` y `AL`. Si cambias `AL`, el valor total de `AX` cambia, pero `AH` permanece intacto. Es como un solo cajón con una división interna.


