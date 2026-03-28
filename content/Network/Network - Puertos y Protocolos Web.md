# Puertos y Protocolos Web

En el ámbito de la administración de redes, comprender cómo los navegadores y los servidores intercambian información es una competencia básica. Para el examen **CompTIA Network+ (N10-009)**, no basta con saber navegar por internet; debes dominar la mecánica subyacente que gobierna estas transmisiones: los puertos y los protocolos.

Los protocolos web definen las reglas de comunicación, mientras que los puertos actúan como puertas de enlace numéricas que clasifican el tráfico. En esta lección, desglosaremos las diferencias críticas entre los dos estándares universales: **HTTP** y **HTTPS**, enfocándonos en sus implicaciones de seguridad y su función en la Capa de Aplicación.

!![](Pasted%20image%2020251201112215.png)

## Desarrollo Teórico

Los puertos permiten que un solo servidor gestione múltiples tipos de servicios simultáneamente. Sin embargo, para la web, existen dos puertos estándar que todo profesional debe memorizar: el **Puerto 80** y el **Puerto 443**.

### 1. HTTP: Hypertext Transfer Protocol (Puerto 80)

El Protocolo de Transferencia de Hipertexto (HTTP) ha sido la base de la comunicación en la World Wide Web. Opera en la **Capa 7 (Aplicación)** del modelo OSI.

- **Funcionamiento:** Cuando un cliente (navegador) solicita un recurso a un servidor web sin especificar seguridad, utiliza por defecto el puerto 80. El servidor responde enviando el contenido (HTML, imágenes, scripts).
    
- **La Vulnerabilidad Crítica:** HTTP transmite datos en **texto plano (plain text)**. Esto significa que no existe encriptación.
    
- **Riesgo de Seguridad:** Cualquier actor malintencionado que realice un ataque _on-path_ (anteriormente conocido como Man-in-the-Middle) o utilice un sniffer de paquetes en la red, puede leer, interceptar y modificar la información. Credenciales de acceso, números de tarjetas de crédito o datos personales son completamente legibles si viajan por HTTP.
    

### 2. HTTPS: HTTP Secure (Puerto 443)

Para mitigar los riesgos inherentes del texto plano, se desarrolló HTTPS. Aunque funcionalmente es el mismo protocolo de aplicación que HTTP, la diferencia radica en la capa de seguridad añadida.

- **Mecanismo de Seguridad:** HTTPS encapsula la comunicación HTTP dentro de un túnel criptográfico. Históricamente se utilizaba **SSL (Secure Sockets Layer)**, pero el estándar moderno y seguro que debes conocer para el examen es **TLS (Transport Layer Security)**.
    
- **Encriptación:** Al utilizar el puerto 443, los datos se cifran en el origen y solo se descifran en el destino. Incluso si un atacante intercepta los paquetes, solo verá datos ininteligibles.
    
- **Confianza:** La presencia de HTTPS (indicada por el candado en el navegador) asegura no solo la confidencialidad, sino también la autenticidad del servidor, validada mediante certificados digitales.

## Comparativa Técnica para el Examen

Para el examen Network+, debes ser capaz de diferenciar rápidamente estos protocolos basándote en sus atributos de seguridad y configuración de puertos.

|**Característica**|**HTTP**|**HTTPS**|
|---|---|---|
|**Puerto Estándar**|80|443|
|**Transmisión de Datos**|Texto Plano (No encriptado)|Encriptado (Cifrado)|
|**Protocolo de Seguridad**|Ninguno|SSL (Legacy) / TLS (Estándar Actual)|
|**Seguridad**|Vulnerable a _eavesdropping_|Confidencialidad e Integridad asegurada|
|**Uso Recomendado**|Sitios informativos públicos (obsoleto)|Banca, E-commerce, Login, Estándar Web actual|

## Escenario Práctico: Redirección y Seguridad

En un entorno de producción real, es imperativo forzar el uso de protocolos seguros. Los administradores de servidores web configuran reglas de redirección para asegurar que ningún usuario transmita datos sensibles por el puerto 80.

### Escenario de Configuración

Un usuario intenta acceder a `http://www.mipaginaweb.com` (Puerto 80). El servidor, configurado correctamente, no sirve la página solicitada inmediatamente. En su lugar:

1. El servidor responde con un código de estado **301 Moved Permanently** (o 302).
    
	1. Esta respuesta instruye al navegador a dirigirse automáticamente a `https://www.mipaginaweb.com`.
    
3. El navegador inicia un nuevo handshake en el **Puerto 443**.
    
4. Se establece el túnel TLS y comienza la transmisión segura.
    

### Verificación de Puertos (Comandos)

Como administrador, puedes verificar qué puertos están escuchando en tus servidores o qué conexiones están establecidas en tu cliente.

En Windows (Command Prompt):

```
netstat -an | findstr "80 443"
```

En Linux (Terminal):

```Bash
ss -tuln | grep -E ':(80|443)'
```

Estos comandos te permitirán confirmar si tu servidor web está aceptando conexiones en los puertos estándar y si el tráfico seguro está fluyendo correctamente. Recuerda: para el examen N10-009, la seguridad por defecto es la norma; el uso de HTTP (Puerto 80) debe considerarse una vulnerabilidad en cualquier contexto que involucre transmisión de datos sensibles.