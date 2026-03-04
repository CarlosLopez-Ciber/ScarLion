---
title: Sistemas de Numeracion
description: El lenguaje ensamblador interactúa directamente con el hardware. Mientras que los humanos preferimos el sistema decimal, las computadoras operan con voltajes (alto/bajo), lo que hace que el binario y el hexadecimal sean los lenguajes naturales del procesador.
---

## 1. Importancia de los Sistemas de Numeración

El lenguaje ensamblador interactúa directamente con el hardware. Mientras que los humanos preferimos el sistema decimal, las computadoras operan con voltajes (alto/bajo), lo que hace que el **binario** y el **hexadecimal** sean los lenguajes naturales del procesador.

## 2. El Sistema Decimal (Base 10)

Es nuestro sistema cotidiano. Se utiliza en el video para establecer la base matemática que rige a todos los demás sistemas.

- **Base 10:** Utiliza 10 dígitos (0-9).
    
- **Terminología de posición:**
    
    - **LSD (Least Significant Digit):** El dígito más a la derecha (menor valor).
        
    - **MSD (Most Significant Digit):** El dígito más a la izquierda (mayor valor).
        
- **Fórmula General de Conversión:**
    
    Para un número como 217, el valor se calcula como la suma de cada dígito multiplicado por la base elevada a su posición ($n$):
    
    $$\text{Valor} = \sum (\text{dígito} \times \text{base}^n)$$
    
    $$217 = (2 \times 10^2) + (1 + 10^1) + (7 \times 10^0)$$
    

## 3. El Sistema Binario (Base 2)

Es el lenguaje fundamental de la computación.

- **Base 2:** Solo utiliza dos estados (0 y 1), que representan niveles de voltaje (_High/Low_).
    
- **Bits y Bytes:**
    
    - **Bit:** La unidad mínima (un solo 0 o 1).
        
    - **Byte:** Un conjunto de **8 bits**.
        
    - **Nibble:** Un conjunto de **4 bits** (medio byte). Esta unidad es crucial para la conversión a hexadecimal.
        
- **Conversión a Decimal:** Se aplica la misma fórmula de potencias, pero usando la base 2.
    
    - _Ejemplo:_ $11011001_2 = 217_{10}$
        

## 4. El Sistema Hexadecimal (Base 16)

Surge como una "abreviatura" del binario para facilitar la lectura humana sin perder la relación directa con los bits.

- **Base 16:** Utiliza los dígitos 0-9 y las letras **A a la F** ($A=10, B=11, C=12, D=13, E=14, F=15$).
    
- **Eficiencia:** Un byte completo (8 bits) se puede representar con solo **2 caracteres hexadecimales**.
    
- **Conversión a Decimal:** Siguiendo el ejemplo del video para $D9_{16}$:
    
    $$(13 \times 16^1) + (9 \times 16^0) = 208 + 9 = 217$$

## 5. El "Truco" de la Conversión Rápida (Binario ↔ Hex)

La razón por la cual en Ensamblador verás casi todo en hexadecimal es la facilidad de conversión "al vuelo". Como $2^4 = 16$, cada **nibble** (4 bits) corresponde exactamente a un carácter hexadecimal.

**Ejemplo del video (217):**

1. Tomas el byte: `1101 1001`
    
2. Separas en nibbles: `1101` | `1001`
    
3. Traduces cada parte:
    
    - `1101` (8+4+0+1) = 13 $\rightarrow$ **D**
        
    - `1001` (8+0+0+1) = 9 $\rightarrow$ **9**
        
4. Resultado: **D9**
    

> **Nota complementaria:** En programación, para que el ensamblador no confunda un número hexadecimal con una variable (como `D9`), se suelen usar prefijos o sufijos. Por ejemplo, en muchos lenguajes verás `0xD9` o `D9h`.
