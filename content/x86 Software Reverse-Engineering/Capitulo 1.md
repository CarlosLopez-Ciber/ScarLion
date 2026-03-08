
## ¿Qué es la Compilación y Descompilación?

_La compilación_ es el proceso de convertir un lenguaje de programación en código máquina. Esto significa que la _descompilación_ sería el proceso de tomar código máquina y llevarlo de vuelta al lenguaje de programación original, recuperando el código fuente original.

## ¿Cuándo es útil la descompilación?

 algunos lenguajes de programación utilizan lo que se denomina compilación _just-in-time_ (_JIT_). Cuando los programas escritos en lenguajes JIT se “construyen”, se convierten desde el código fuente a un _lenguaje intermedio (IL)_, no a código máquina. Los compiladores JIT almacenan una copia del código en este IL hasta que el programa se ejecuta, momento en el cual el código se convierte a código máquina. Ejemplos de lenguajes JIT incluyen Java, Dalvik (Android) y .NET.

Para lenguajes descompilables, una defensa comúnmente utilizada contra la ingeniería inversa es la ofuscación.

Otra práctica recomendada de seguridad importante es evitar escribir código crítico para la seguridad o la privacidad en lenguajes JIT donde la ingeniería inversa resulta sencilla. En su lugar, escribe este código en un lenguaje compilado, como C/C++, donde la ingeniería inversa es significativamente más difícil. Este código puede incluirse en DLLs que se enlazan con el ejecutable que contiene el código no sensible escrito en un lenguaje JIT.

