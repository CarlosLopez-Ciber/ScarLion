# Metasploitable 2

https://www.vulnhub.com/entry/metasploitable-2,29/






## Puerto 80 


Buscando en google "exploits php 5.2.4"

![](Pasted%20image%2020250716060207.png)

https://www.cvedetails.com/version/404988/PHP-PHP-5.2.4.html

https://www.rapid7.com/db/modules/exploit/multi/http/php_cgi_arg_injection/


Sí, aquí tienes la información consolidada sobre CGI y FastCGI.

Es la **interfaz o protocolo de comunicación** que utiliza un servidor web (como Apache) para ejecutar un programa externo (como un script PHP) y así generar contenido dinámico. En pocas palabras, es el **puente entre el servidor y la aplicación**.
## **CGI (Common Gateway Interface)**

Es el método original y más básico. Su principal característica es que por cada solicitud de un visitante, el servidor web **inicia un proceso completamente nuevo** de la aplicación.

- **Desventaja Principal:** Este enfoque es muy **lento e ineficiente**, ya que crear y destruir procesos para cada petición consume una gran cantidad de recursos del servidor.

## **FastCGI**

Es la evolución directa de CGI, diseñada para resolver su problema de rendimiento. En lugar de crear un proceso nuevo cada vez, FastCGI **mantiene uno o más procesos de la aplicación corriendo persistentemente** en segundo plano.

- **Ventaja Principal:** El servidor web simplemente reenvía las nuevas solicitudes a estos procesos ya existentes. Esto es **mucho más rápido y escalable**, ya que elimina el coste de iniciar un proceso desde cero.


Esa descripción detalla una vulnerabilidad **crítica** conocida como **CVE-2012-1823**. Permite la ejecución remota de código (RCE) en servidores que cumplen con condiciones muy específicas.

## **El Contexto: PHP en Modo CGI**

Como ya vimos, en el modo **CGI**, el servidor web ejecuta el programa de PHP (`php-cgi`) como un binario separado para cada solicitud. Una parte clave de este proceso es que la información de la URL (la _query string_, lo que va después del `?`) se pasa como argumentos de línea de comandos al binario de PHP.

Ejemplo:

Una petición a `test.php?arg1` podría hacer que el servidor ejecute algo como:

```
$ /usr/bin/php-cgi test.php arg1
```

---

## **El Fallo: La Mala Interpretación de la URL**

Aquí es donde reside el problema. Los desarrolladores de PHP cometieron un error en la lógica de cómo se procesaban esos argumentos:

- **Si la URL contiene un `=`:** (ej. `?nombre=juan`), PHP lo interpreta correctamente como una variable y todo funciona de manera segura.
    
- **Si la URL NO contiene un `=`:** (ej. `?-s`), PHP, en lugar de tratarlo como una variable, lo interpreta como un **argumento directo para el binario `php-cgi`**.
    

Esto permite a un atacante inyectar los mismos "flags" o "switches" que un administrador usaría en la línea de comandos.

---

## **El Exploit: El Flag `-d`**

El exploit se enfoca en el flag `-d`, que es extremadamente poderoso. Este flag permite **definir una directiva de configuración de `php.ini`** para esa ejecución específica.

Un atacante puede encadenar varios flags `-d` para desactivar las medidas de seguridad y preparar el servidor para ejecutar código. La URL de ataque se vería así:

`http://servidor-vulnerable/index.php?-d+allow_url_include=1+-d+auto_prepend_file=php://input`

Desglosemos lo que hace esta URL maliciosa:

1. **No hay `=`:** Esto activa el fallo de interpretación.
    
2. **`-d allow_url_include=1`:** Le dice a PHP "Permite la inclusión de archivos remotos".
    
3. **`-d auto_prepend_file=php://input`:** Le dice a PHP "Antes de ejecutar `index.php`, toma el código que te envío en el cuerpo de la petición HTTP y ejecútalo primero".
    

El atacante solo necesita enviar su código malicioso (ej. `<?php system('whoami'); ?>`) en el cuerpo de esa misma petición para lograr la ejecución remota de código.

---

## **Impacto Real: Plesk 0day**

Esta no fue una vulnerabilidad teórica. Fue explotada masivamente en junio de 2013 en servidores que usaban el panel de control **Plesk**, ya que este configuraba PHP en el modo CGI vulnerable por defecto. Esto permitió a los atacantes tomar control total de miles de servidores web.

https://krebsonsecurity.com/2012/07/plesk-0day-for-sale-as-thousands-of-sites-hacked/
https://unaaldia.hispasec.com/2013/06/vulnerabilidad-en-parallels-plesk-permite-ejecucion-remota-de-codigo.html