---
title: Segmentación De Memoria
description: La interacción con la memoria externa al procesador es un pilar fundamental en la computación. A diferencia de los registros internos, la memoria externa (comúnmente identificada como RAM) ofrece una capacidad de almacenamiento significativamente mayor, destinada a albergar datos, instrucciones de código y la estructura de pila (stack).
---


La interacción con la memoria externa al procesador es un pilar fundamental en la computación. A diferencia de los registros internos, la memoria externa (comúnmente identificada como RAM) ofrece una capacidad de almacenamiento significativamente mayor, destinada a albergar datos, instrucciones de código y la estructura de pila (_stack_).

## 1. Estructura y Capacidad de la Memoria

En la arquitectura 8086, la memoria se organiza de forma lineal como una sucesión de celdas, donde cada unidad mínima de direccionamiento tiene un ancho de un byte (8 bits).

- **Capacidad Máxima:** El procesador 8086 dispone de un bus de direcciones de 20 bits, lo que le permite direccionar hasta $2^{20}$ localizaciones distintas, equivalentes a $1 \text{ MB}$ de memoria.
    
- **Rango de Direccionamiento:** Las direcciones físicas oscilan desde la dirección mínima $00000h$ hasta la dirección máxima $FFFFFh$.
    

## 2. El Desafío del Direccionamiento de 16 bits

Existe una discrepancia técnica entre el tamaño de los registros internos y el espacio de direccionamiento total:

- Los registros de propósito general y los punteros del 8086 son de 16 bits.
    
- Un valor de 16 bits solo puede representar hasta $2^{16}$ combinaciones, limitando el acceso directo a únicamente $64 \text{ KB}$ de memoria.
    

Sin un mecanismo adicional, el procesador no podría acceder al resto del megabyte disponible, quedando restringido a menos del 10% del espacio total.

## 3. Mecanismo de Segmentación de Memoria

Para resolver la limitación mencionada, Intel implementó la **segmentación de memoria**. Este método permite dividir el megabyte de memoria en segmentos lógicos de hasta $64 \text{ KB}$.

La segmentación ofrece dos ventajas principales:

1. **Ampliación del Direccionamiento:** Permite alcanzar cualquier punto dentro del rango de $1 \text{ MB}$ mediante la combinación de una dirección de segmento y un desplazamiento (_offset_).
    
2. **Eficiencia Operativa:** Facilita la organización del código y los datos, agilizando el acceso a través de registros especializados.
    

### Cálculo de la Dirección Física

Aunque el programa maneja direcciones de 16 bits, el hardware calcula la dirección física de 20 bits siguiendo la fórmula:

  

$$\text{Dirección Física} = (\text{Registro de Segmento} \times 10h) + \text{Offset}$$

## 4. Registros de Segmento

El procesador utiliza cuatro registros de 16 bits dedicados a gestionar estos segmentos:

|              |                 |                                                                                                               |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------- |
| **Registro** | **Nombre**      | **Función Principal**                                                                                         |
| **CS**       | _Code Segment_  | Apunta al segmento donde reside el código ejecutable. Trabaja en conjunto con el _Instruction Pointer_ (IP).  |
| **DS**       | _Data Segment_  | Define el segmento de memoria destinado a las variables y datos estáticos del programa.                       |
| **SS**       | _Stack Segment_ | Localiza el segmento utilizado para la pila, fundamental para llamadas a funciones y almacenamiento temporal. |
| **ES**       | _Extra Segment_ | Segmento adicional para datos, frecuentemente utilizado en operaciones de movimiento de cadenas de bloques.   |

### Particularidades en Emulación

Es pertinente señalar que, en ciertos entornos de emulación simplificados, algunos registros como `CS` pueden estar abstraídos o gestionados automáticamente por el entorno de desarrollo para facilitar el aprendizaje, aunque en el hardware real su gestión es explícita y obligatoria para la ejecución del programa.

## 5. Dinámica de los Segmentos

Los segmentos no son estáticos; pueden "deslizarse" a lo largo de la memoria. Al cambiar el valor en un registro de segmento, el procesador desplaza la ventana de $64 \text{ KB}$ a una nueva ubicación base, permitiendo así que un programa acceda de manera dinámica a la totalidad del espacio de memoria física disponible.