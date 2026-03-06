---
title: Interrupciones
description: El estudio de las interrupciones es fundamental para comprender cómo un programa en lenguaje ensamblador interactúa con el mundo exterior. En la arquitectura x86, estas actúan como el puente entre la lógica del programa y los servicios proporcionados por el sistema operativo o el firmware del sistema.
---

El estudio de las interrupciones es fundamental para comprender cómo un programa en lenguaje ensamblador interactúa con el mundo exterior. En la arquitectura x86, estas actúan como el puente entre la lógica del programa y los servicios proporcionados por el sistema operativo o el firmware del sistema.

## 1. Paradigmas de Ejecución: Bare Metal vs. Sistema Operativo

Existen dos metodologías principales para la ejecución de código en un procesador:

- **Bare Metal (Metal Desnudo):** El código se ejecuta directamente sobre el hardware sin una capa de software intermedia. El programador es responsable de gestionar cada periférico, la memoria y los tiempos del procesador. Este enfoque es común en sistemas embebidos (_embedded systems_) críticos o de recursos limitados.
    
- **Sistemas Operativos (OS):** El programa se ejecuta bajo el control de un software supervisor. El sistema operativo abstrae el hardware, proporcionando una interfaz estandarizada. Las ventajas incluyen la portabilidad, la gestión de recursos multiusuario y la simplificación del acceso a periféricos.
    

En el contexto del emulador 8086, el entorno simula un sistema operativo básico compatible con **DOS (Disk Operating System)**.

## 2. Definición y Mecanismo de las Interrupciones

Una **interrupción (interrupt)** es una señal que detiene temporalmente la ejecución del programa actual para transferir el control a una rutina de servicio específica.

### Flujo de Control:

1. **Activación:** El programa ejecuta una instrucción de interrupción (ej. `INT <número>`).
    
2. **Salvaguarda:** El procesador guarda el estado actual (incluyendo el _Instruction Pointer_ y el registro de banderas).
    
3. **Salto:** Se consulta la Tabla de Vectores de Interrupción (IVT) y se salta a la dirección de memoria donde reside el manejador de la interrupción en el sistema operativo.
    
4. **Ejecución:** El sistema operativo realiza la tarea solicitada (ej. imprimir un carácter).
    
5. **Retorno:** Se restaura el estado original y el control vuelve a la siguiente instrucción del programa de usuario.
    

En entornos modernos como Linux o Windows, este concepto evoluciona hacia las **System Calls (syscalls)** o el uso de APIs específicas.

## 3. Servicios de Interrupción en 8086/DOS

El emulador utiliza principalmente dos interrupciones críticas para la entrada y salida de datos:

### A. Interrupción de Video: `INT 10h`

Se utiliza para interactuar con la pantalla y los servicios de video. El comportamiento exacto de la interrupción se define mediante el valor cargado en el registro de alto nivel `AH`.

- **Función `0Ah` (Imprimir carácter):**
    
    - `AH = 0Ah`: Código de la función para escribir el carácter.
        
    - `AL`: Contiene el código ASCII del carácter a imprimir.
        
    - `CX`: Especifica el número de veces que se debe repetir el carácter en la salida.
        
- **Función `13h` (Imprimir cadena):** Utilizada para el manejo de cadenas de texto (_strings_), requiriendo configuraciones de memoria más avanzadas.
    

### B. Interrupción del Sistema DOS: `INT 21h`

Es la interrupción principal para servicios del sistema, incluyendo la lectura de entrada desde el teclado y la manipulación de archivos.

## 4. Ejemplo de Salida de Datos

Para emitir un único carácter por pantalla (por ejemplo, la letra 'H'), se requiere la configuración precisa de los registros antes de invocar la interrupción.

### Ejemplo de Código (Sintaxis Intel):

```asm
; Programa para imprimir el carácter 'H'
START:
    MOV AH, 0Ah      ; Configura función "escribir carácter"
    MOV AL, 48h      ; Carga 'H' en ASCII (0x48)
    MOV CX, 01h      ; Define 1 repetición
    INT 10h          ; Invoca la interrupción de video
```

En este proceso, el registro `AH` actúa como un selector de servicio, mientras que `AL` y `CX` funcionan como los parámetros necesarios para que el sistema operativo procese la solicitud correctamente.