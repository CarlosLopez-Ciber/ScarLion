# Try Hack Me Conexión

## Conectarse

Para conectarte a nuestra red, necesitas descargar la aplicación de código abierto OpenVPN GUI e importar tu archivo de configuración VPN.

En TryHackMe puedes desplegar máquinas virtuales que puedes usar para hackear y aprender. Sin embargo, para acceder a estas máquinas debes estar conectado a nuestra red. Esto se hace mediante el uso de una VPN (similar a cómo te conectarías desde casa a una computadora del trabajo o de la escuela).

Esta VPN debe conectarse desde tu máquina de hacking directamente a la red de THM. Si tu máquina es una máquina virtual, debes seguir los pasos correspondientes a la máquina virtual, no a la máquina anfitriona.

Primero, dirígete a la página de acceso y descarga tu archivo de configuración VPN. Luego, lee la tarea que se adapte a tu tipo de computadora.

## OpenVPN - Linux

1. Descarga OpenVPN ejecutando el siguiente comando en tu terminal:  
    `sudo apt install openvpn`
    
2. Ubica la ruta completa a tu archivo de configuración VPN (descárgalo desde la [página de acceso](https://tryhackme.com/access)), normalmente se encuentra en tu carpeta de **Descargas**.
    
3. Utiliza tu archivo de configuración de OpenVPN con el siguiente comando:  
    `sudo openvpn /ruta-al-archivo/nombre-del-archivo.ovpn`
    

¡Y eso es todo! Deberías estar conectado correctamente.

## Verificar conexión

Puedes verificar si estás conectado a nuestra red mediante una marca verde junto a la palabra **"connected"** en la tabla de Información de Red en la [página de acceso](https://tryhackme.com/access).

Ahora confirma que estás conectado desplegando una máquina y accediendo a su sitio web. Despliega la máquina en esta tarea (tomará unos minutos en iniciar). Luego ve a `http://DIRECCIÓN_IP_DE_LA_MÁQUINA` — ¿puedes ver un sitio web?

## Verificar desconexión

Para desconectarte de la VPN de TryHackMe y verificar que la desconexión se ha realizado correctamente, sigue estos pasos según tu sistema operativo:

**En Linux:**

1. **Desconexión:**
    
    - Si iniciaste la conexión VPN mediante el comando `sudo openvpn nombre-del-archivo.ovpn` en una terminal, puedes detener la conexión volviendo a esa terminal y presionando `Ctrl + C`. Esto finalizará el proceso de OpenVPN. citeturn0search1
        
    - Si la conexión se ejecutó en segundo plano o no recuerdas la terminal específica, abre una nueva terminal y ejecuta:
        
        ```bash
        sudo killall openvpn
        ```
        
        Este comando finalizará todas las instancias activas de OpenVPN. citeturn0search7
        
2. **Verificación de desconexión:**
    
    - Para confirmar que te has desconectado, puedes ejecutar:
        
        ```bash
        ifconfig
        ```
        
        Si la interfaz `tun0` ya no aparece en la lista de interfaces de red, significa que la desconexión se realizó con éxito. citeturn0search5

**Nota Adicional:**

- Para una confirmación adicional, puedes visitar la [página de acceso de TryHackMe](https://tryhackme.com/access). Si no ves una marca verde junto a "Connected" en la tabla de información de red, significa que ya no estás conectado a la VPN.

Asegúrate siempre de desconectarte de la VPN cuando hayas finalizado tus actividades para mantener la seguridad y el rendimiento óptimo de tu sistema.