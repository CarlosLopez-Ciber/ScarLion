---
title: Ejercicio 2
description: Ejercicios del Curso
---

**Escribe un programa que asigne los siguientes valores a los registros: AX=0ff0, BX=f00f, CX=0ff0 y DX=f00f. El programa solo puede utilizar un valor inmediato una sola vez en el código.**

```asm
start:
mov AX, 0x0ff0
mov BH, AL
mov BL, AH
mov CX, AX
mov DX, BX
```