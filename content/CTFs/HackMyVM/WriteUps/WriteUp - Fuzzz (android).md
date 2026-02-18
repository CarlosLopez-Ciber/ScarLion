# WriteUp: Fuzzz | HackMyVM

## Análisis

No hay descripción del CTF

## Reconocimiento

```sh
nmap -sV -O -sC -T4 172.16.201.131
```


Salida

```sh
22/tcp   open  ssh     OpenSSH 9.9 (protocol 2.0)
| ssh-hostkey: 
|   256 b6:7b:e7:e5:b3:33:c7:ff:db:63:5d:b3:75:0d:e2:dd (ECDSA)
|_  256 0a:ce:e5:c3:de:50:9c:6d:b7:0d:de:73:b8:6c:28:55 (ED25519)
5555/tcp open  adb     Android Debug Bridge (token auth required)
Service Info: OS: Android; CPE: cpe:/o:linux:linux_kernel
```

### ¿Qué es adb (Android Debug Bridge) ?

El **Android Debug Bridge (ADB)** es una herramienta de línea de comandos versátil que nos permite comunicarnos con un dispositivo Android. Es una parte fundamental del Android SDK (Software Development Kit) y se utiliza para depurar aplicaciones, instalar y desinstalar APKs, transferir archivos, ejecutar comandos de shell y mucho más.

Para poder hacer uso de `adb` desde nuestro Kali Linux, primero debemos de instalarla:

```
sudo apt update
sudo apt install adb
```

>[!tip] Puedes leer más información en los siguientes enlaces
> - https://hackviser.com/tactics/pentesting/services/adb
> - https://suleyman-celik8.medium.com/exploit-the-android-platform-through-adb-using-phonesploit-8d87efb66336
> - https://hacktricks.boitatech.com.br/mobile-apps-pentesting/android-app-pentesting/adb-commands
> - https://www.exploit-db.com/exploits/39328
> - https://book.hacktricks.wiki/en/network-services-pentesting/5555-android-debug-bridge.html
> - https://developer.android.com/tools/adb?hl=es-419







## Explotación



## Post-explotación


