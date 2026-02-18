# WriteUp: TheFinals | HackMyVM

## Descripción
En la descripción de la VM se indica lo siguiente:
> Please wait for the IP to appear on the screen and then start. If it doesn't boot, please enable EFI in settings.

Lo cual traducido al español sería lo siguiente:
> Por favor, espera a que la IP aparezca en la pantalla y luego comienza. Si no arranca, habilita EFI en la configuración.

Pues en esta oportunidad sí es necesario habilitar la EFI para que la máquina corra.
## Reconocimiento
Realizamos un escaneo con nmap:

```bash
nmap -sV -O -sC -T4 192.168.57.6
```

Del cual vamos a tener la siguiente salida:

```bash
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.9 (protocol 2.0)
| ssh-hostkey: 
|   256 42:a7:04:bb:da:b5:8e:71:7a:89:ff:a4:60:cd:4d:29 (ECDSA)
|_  256 37:32:71:ca:3f:11:41:b4:d7:90:1e:c9:7f:e8:bc:20 (ED25519)
80/tcp open  http    Apache httpd 2.4.62 ((Unix))
|_http-title: THE FINALS
|_http-server-header: Apache/2.4.62 (Unix)
| http-methods: 
|_  Potentially risky methods: TRACE
OS details: Linux 4.15 - 5.19
```

Bien, logramos identificar dos puertos abiertos:
- SSH (puerto 22) con el servicio OpenSSH 9.9
- HTTP (puerto 80) con el servidor web 2.4.62

Cabe mencionar que ambos servicios fueron lanzados en el 2024, por lo que no son antiguos en cuanto a su desarrollo en el momento de escribir este WriteUp.

Lo siguiente que vamos a realizar es visualizar web alojada en el puerto 80 e identificar si encontramos alguna pista sobre alguna posible vulnerabilidad que nos ayude con este CTF.

![](Pasted%20image%2020250731163355.png)

**Identificamos las tecnologías webs**

```sh
┌──(root㉿kali)-[/home/kali]
└─# whatweb 192.168.57.6
http://192.168.57.6 [200 OK] Apache[2.4.62], Bootstrap, Country[RESERVED][ZZ], HTML5, HTTPServer[Unix][Apache/2.4.62 (Unix)], IP[192.168.57.6], JQuery[1.10.2], Lightbox, Modernizr, Script, Title[THE FINALS]
```

Algo peculiar que podemos observar es el dominio "THEFINALS.hmv" que se muestra en el footer, esto es algo llamativo porque estamos en una máquina virtual, por lo que nuestro acceso a ella es a través de la IP; sin embargo, la web nos muestra un dominio. Inicialmente podemos sospechar que el dominio debería de estar relacionado con la IP de nuestra máquina vícitima.

Una vez visualizado toda la web, lo siguiente que vamos a hacer es una enumeración web para identificar qué tecnologías está usando y si hay directorios o archivos ocultos:

```sh
dirsearch -u 192.168.57.6

Target: http://172.16.46.139/
[20:22:40] Starting:   
[20:22:40] 301 -  309B  - /js  ->  http://172.16.46.139/js/                 
[20:22:41] 403 -  276B  - /.ht_wsr.txt                                      
[20:22:41] 403 -  276B  - /.htaccess.bak1                                   
[20:22:41] 403 -  276B  - /.htaccess.orig                                   
[20:22:41] 403 -  276B  - /.htaccess.sample                                 
[20:22:41] 403 -  276B  - /.htaccess.save
[20:22:41] 403 -  276B  - /.htaccess_sc                                     
[20:22:41] 403 -  276B  - /.htaccess_extra
[20:22:41] 403 -  276B  - /.htaccessOLD
[20:22:41] 403 -  276B  - /.htaccess_orig
[20:22:41] 403 -  276B  - /.htaccessBAK
[20:22:41] 403 -  276B  - /.htaccessOLD2
[20:22:41] 403 -  276B  - /.htm                                             
[20:22:41] 403 -  276B  - /.html
[20:22:41] 403 -  276B  - /.htpasswd_test                                   
[20:22:41] 403 -  276B  - /.httr-oauth
[20:22:41] 403 -  276B  - /.htpasswds
[20:22:50] 301 -  311B  - /blog  ->  http://172.16.46.139/blog/             
[20:22:50] 200 -   17KB - /blog/                                            
[20:22:50] 200 -  820B  - /cgi-bin/printenv                                 
[20:22:50] 200 -    1KB - /cgi-bin/test-cgi                                 
[20:22:52] 301 -  310B  - /css  ->  http://172.16.46.139/css/               
[20:22:54] 301 -  312B  - /fonts  ->  http://172.16.46.139/fonts/           
[20:22:56] 301 -  313B  - /images  ->  http://172.16.46.139/images/         
[20:22:56] 200 -  606B  - /images/                                          
[20:22:57] 200 -  694B  - /js/                                              
[20:23:05] 301 -  318B  - /screenshots  ->  http://172.16.46.139/screenshots/
[20:23:10] 403 -  276B  - /server-status/                                   
[20:23:10] 403 -  276B  - /server-status

Task Completed       
```

Navegando en el directorio /screenshots podemos visualizar capturas de pantalla de un panel de administración

### Próximos Pasos: De la Enumeración a la Explotación

Ahora que tienes estos directorios, el plan es el siguiente:

1. Investiga el Directorio /screenshots 
    
    Navega a http://thefinals.hmv/screenshots/ en tu navegador. Dentro, encontrarás varias imágenes. Como indican los
    
    _write-ups_, al analizar estas imágenes verás que son capturas de pantalla de un panel de administración. Presta atención a los detalles en esas capturas.
    
2. Identifica la Tecnología y la Vulnerabilidad 🎯
    
    Las capturas de pantalla revelan que el sitio
    
    `/blog` está utilizando un CMS (Sistema de Gestión de Contenidos) llamado **Typecho, específicamente la versión 1.2.0**.
    
    Esta es la pieza de información más crítica que hemos encontrado hasta ahora. Una búsqueda rápida de vulnerabilidades para "Typecho 1.2.0" te mostrará (y los
    
    _write-ups_ lo confirman) que es vulnerable a un ataque de **Cross-Site Scripting (XSS) Almacenado**. Este tipo de XSS nos permitirá inyectar nuestro propio código JavaScript en la página del blog.
    
3. Prepara la Explotación 💥
    
    Nuestro objetivo final es convertir esta vulnerabilidad de XSS en Ejecución Remota de Código (RCE) para obtener una reverse shell en el servidor.
    

Estás muy cerca de conseguir el acceso inicial. Investiga el directorio `/screenshots` para confirmar la versión de Typecho y prepárate para el siguiente paso, que será explotar la vulnerabilidad XSS. ¡Gran trabajo!
















#### 1. Configura tu Archivo de Hosts

Los _write-ups_ indican que el sitio web utiliza un nombre de dominio virtual: `thefinals.hmv`. Para que tu navegador y otras herramientas puedan acceder correctamente al sitio (especialmente al blog que descubriremos más adelante), debes añadirlo a tu archivo `/etc/hosts`.

Abre una terminal en Kali y ejecuta:

Bash

```
sudo nano /etc/hosts
```

Y añade la siguiente línea al final del archivo, reemplazando `172.16.46.139` con la IP de la máquina:

```
172.16.46.139  thefinals.hmv
```

Guarda los cambios (Ctrl+O) y cierra el editor (Ctrl+X). Esto es crucial para los siguientes pasos.

#### 2. Enumeración de Directorios

Aunque una exploración manual del sitio

`http://thefinals.hmv/` es siempre una buena práctica, los _write-ups_ señalan que no revela nada interesante a primera vista. Por lo tanto, tu siguiente acción debe ser un

**brute force de directorios** para encontrar contenido oculto.

Puedes usar herramientas como `dirsearch` o `gobuster`. Aquí tienes un ejemplo con `dirsearch`:

Bash

```
dirsearch -u http://thefinals.hmv/
```

Este proceso te revelará varios directorios. Según los _write-ups_, los más importantes que encontrarás son:

- **/blog**
    
- **/screenshots**
    

#### 3. Investiga los Directorios Encontrados

Una vez que el escaneo termine, visita los directorios `/blog` y `/screenshots`. Presta especial atención a cualquier indicio sobre la tecnología que está utilizando el blog (el nombre de un CMS, versiones, etc.). Uno de los

_write-ups_ revela que, al investigar estos directorios, se descubre que el blog utiliza **Typecho 1.2.0**.

Esa información será la llave para el siguiente paso: la explotación.

¡Adelante! Realiza la enumeración de directorios y dime qué encuentras. ¡Vas por muy buen camino!




¡Excelente pregunta! Es fundamental no seguir los pasos a ciegas y entender el porqué de cada acción.

La conclusión de que existe un dominio virtual, `thefinals.hmv`, no se obtiene directamente del escaneo inicial con Nmap. Se descubre durante la **fase de reconocimiento y enumeración web** que sigue al escaneo de puertos.

---

### ¿Cómo se llega a esa conclusión?

Hay varias formas en las que un pentester descubre un dominio virtual en un CTF, y los _write-ups_ lo confirman:

1. **Análisis del Contenido Web y Fingerprinting:** El _write-up_ "HackMyVM - Thefinals" es el más claro en este punto. Indica que después de visitar la página HTTP, se realiza una recolección de "huellas" o
    
    `fingerprinting` y es en ese momento que se encuentra el dominio `thefinals.hmv` que debe ser añadido al archivo hosts. Aunque no detalla la herramienta exacta que lo reveló, este proceso usualmente implica:
    
    - Revisar el código fuente de la página en busca de comentarios o enlaces que usen el nombre de dominio en lugar de la IP.
        
    - Observar las cabeceras de respuesta HTTP. A veces, una redirección (código 301 o 302) puede exponer el nombre de dominio.
        
    - Usar herramientas de análisis web como **Wappalyzer** o Burp Suite, que pueden revelar esta información al analizar la tecnología del sitio.
        
2. **Necesidad Lógica durante la Enumeración:** En el _write-up_ "Thefinals | TheBlog", el autor realiza primero una enumeración de directorios con `dirsearch` usando ya el dominio `thefinals.hmv`. Esto implica que lo descubrió antes. A menudo, un atacante primero intenta enumerar directorios usando la IP. Si encuentra directorios como
    
    `/blog` que no funcionan correctamente o redirigen a un nombre de dominio, se da cuenta de que necesita usar el `hostname` para que el servidor web (Apache) sepa qué sitio servir. Es un paso lógico para interactuar correctamente con la aplicación.
    
3. **Confirmación en los Archivos de Configuración (Posteriormente):** Aunque esto es una validación a posteriori, una vez que se obtiene acceso al sistema, se pueden encontrar archivos de configuración del servidor web Apache que definen explícitamente los `VirtualHosts`, confirmando que el servidor está configurado para responder a ese nombre de dominio.
    

En resumen, **confías en que es verdadero porque las herramientas de enumeración web y el comportamiento del propio servidor te lo indican**. Para este CTF en particular, los

_write-ups_ confirman que `thefinals.hmv` es el dominio que debes usar. Añadirlo a tu archivo

`/etc/hosts` es un paso necesario para poder seguir avanzando y explotar las vulnerabilidades del blog.

## Explotación


## Post-Explotación


