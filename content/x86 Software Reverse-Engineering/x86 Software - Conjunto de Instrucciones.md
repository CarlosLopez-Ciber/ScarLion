# Conjuntos de Instrucciones

## 1. Arquitectura de Conjunto de Instrucciones (ISA)

La **ISA** representa el ecosistema lógico en el que se ejecutan los programas. Define la interfaz entre el software y el hardware, estableciendo los siguientes parámetros:

- **Registros:** Determina la cantidad de registros disponibles y su tamaño (desde 8 bits hasta 128 bits o más).
    
- **Formatos de Datos y Direcciones:** Especifica cómo se accede a la memoria y cuántos bytes se procesan en cada ciclo de lectura/escritura.
    
- **Instrucciones de Máquina:** Define el catálogo de operaciones permitidas (aritmética, saltos lógicos, gestión de energía, etc.).
    

> **Conceptos Clave:**
> 
> - **ISA:** El "qué" hace el procesador (las reglas y capacidades).
>     
> - **Microarquitectura:** El "cómo" se implementa físicamente esa ISA en un chip específico.
>     

## 2. Filosofías de Diseño: RISC vs. CISC

Aunque existen múltiples arquitecturas, la mayoría se clasifica en dos grandes categorías basadas en su complejidad y gestión de instrucciones.

### RISC (Reduced Instruction Set Computer)

Se caracteriza por utilizar un número reducido de instrucciones simples que se ejecutan en ciclos de reloj uniformes.

- **Características:** Hardware físicamente más pequeño, menor consumo energético y bajo coste.
    
- **Arquitecturas comunes:** ARM (móviles y tabletas), MIPS (sistemas embebidos) y PowerPC.
    

### CISC (Complex Instruction Set Computer)

Se basa en un catálogo extenso de instrucciones potentes capaces de realizar tareas complejas en un solo paso.

- **Características:** Mayor tamaño físico del chip, mayor consumo energético, pero facilita la programación al reducir la cantidad de líneas de código necesarias.
    
- **Arquitecturas comunes:** x86 (servidores y estaciones de trabajo modernas).
    

## 3. Comparativa de Implementación Técnica

La diferencia fundamental entre ambas filosofías se manifiesta en la forma de abordar una misma operación aritmética. A continuación, se ilustra un ejemplo hipotético de multiplicación de un valor en memoria por 5:

| CISC           | RISC            |
| -------------- | --------------- |
| `mul [100], 5` | `load r0, 100`  |
|                | `mov r1, r0`    |
|                | `add r1, r0`    |
|                | `add r1, r0`    |
|                | `add r1, r0`    |
|                | `add r1, r0`    |
|                | `mov [100], r1` |