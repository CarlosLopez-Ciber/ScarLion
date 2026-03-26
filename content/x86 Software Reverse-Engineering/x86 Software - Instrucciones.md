---
title: Instrucciones
description: POR MODIFICAR
---

No es necesario comprender cada detalle del ensamblador x86 para ser un ingeniero inverso ni siquiera para escribir programas en ensamblador. 

## Formato de las instrucciones x86

- mnemónicos: Código ensamblador legible para los humanos. 


Cada instrucción mnemónica se ensambla en código máquina que controla al procesador. Por lo tanto, el procesador no tiene noción alguna de los mnemónicos, solo del código máquina. 

Por ejemplo:

- mnemónico `add` ---> código máquina `0x04`.


Ejemplo de una instrucción x86:

```asm
add eax, 1
```

- Operandos: registro `eax` y el valor 1 


Una instrucción x86, en condiciones normales, puede tener hasta tres operandos si es que los tiene. Existen extensiones especiales del lenguaje que permiten hasta cuatro operandos (prefijo VEX), pero no profundizaremos en este rincón del ensamblador.
Los operandos de las instrucciones x86 pueden ser registros, valores inmediatos o direcciones de memoria. Los registros suelen ser los registros de propósito general (GPRs), y las ubicaciones de memoria se especifican mediante una dirección. Los inmediatos son números o constantes como 12345.
Aunque una instrucción x86 puede incluir cualquiera de estos, puede contener como máximo una ubicación de memoria. Por ejemplo, las instrucciones add eax, ebx y add eax, [0x12345678] son válidas porque acceden a dos registros y a un registro y una ubicación de memoria, respectivamente. Sin embargo, la instrucción add [0x12345678], [0x87654321] no es válida porque utiliza dos direcciones de memoria al mismo tiempo. Esto se debe a que el pipeline del procesador es un diseño delicado que solo puede realizar una lectura de memoria por instrucción.


Instrucciones x86
El lenguaje ensamblador x86 incluye cientos de instrucciones diferentes. Algunas de las más utilizadas incluyen las siguientes:

Aritmética

add
sub
mul
inc
dec


Manipulación de bits

and
or
xor
not


Pila

call
return
push
pop


Movimiento de datos:

mov


Flujo de ejecución

jmp
Saltos condicionales


Comparación

test
cmp


Otros

lea
nop



Aunque esto pueda parecer mucho, considera los operadores comunes utilizados en los lenguajes de programación (+, −, *, /, %, &&, ||, &, |, ^, !, ~, <, >, >=, <=, ==, ., −>, etc.) y las palabras clave principales (if, else, switch, while, do, case, break, continue, for, etc.). Se requiere una gran cantidad de capacidades para lograr estos comportamientos en ensamblador.
Sinceramente, nadie conoce todas las instrucciones x86 ni tiene la necesidad de hacerlo (a menos que realmente quiera impresionar a sus amigos). Una lista completa