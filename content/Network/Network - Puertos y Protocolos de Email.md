# Puertos y Protocolos de Email

## 1. SMTP: Simple Mail Transfer Protocol (El Protocolo "Push")

Se encarga de **enviar** correos desde el cliente al servidor o **retransmitir** (relay) mensajes entre servidores.

|   |   |   |   |
|---|---|---|---|
|**Protocolo**|**Puerto**|**Seguridad**|**Uso Principal**|
|**SMTP**|**25**|Inseguro (Texto plano)|Retransmisión (Relay) entre servidores.|
|**SMTP (Submission)**|**587**|Seguro (**STARTTLS**)|Envío de correos desde el cliente al servidor (Estándar moderno).|
|**SMTPS**|**465**|Seguro (**SSL/TLS**)|Envío cifrado implícito (Originalmente obsoleto, pero aún en uso).|

- **Dato CompTIA:** Si un firewall bloquea el puerto 25, los servidores de correo no podrán hablar entre sí. Si bloquea el 587, los usuarios no podrán enviar correos desde sus apps (como Outlook).
    

## 2. POP3: Post Office Protocol v3 (El Protocolo de "Descarga")

Diseñado para la era de conexiones limitadas. Su filosofía es: "Descargar y Borrar".

|   |   |   |   |
|---|---|---|---|
|**Protocolo**|**Puerto**|**Seguridad**|**Comportamiento**|
|**POP3**|**110**|Inseguro (Texto plano)|Descarga el correo al dispositivo y lo borra del servidor.|
|**POP3S**|**995**|Seguro (SSL/TLS)|Versión cifrada de POP3.|

- **Desventaja en el N10-009:** No permite la sincronización. Si lees un correo en tu PC, no aparecerá como "leído" en tu móvil.
    

## 3. IMAP: Internet Message Access Protocol (El Protocolo de "Sincronización")

Ideal para el mundo multi-dispositivo actual. El correo permanece en el servidor.

|   |   |   |   |
|---|---|---|---|
|**Protocolo**|**Puerto**|**Seguridad**|**Comportamiento**|
|**IMAP**|**143**|Inseguro (Texto plano)|Gestiona el correo directamente en el servidor.|
|**IMAPS**|**993**|Seguro (SSL/TLS)|Versión cifrada de IMAP.|

- **Ventaja clave:** Sincroniza carpetas (Enviados, Borradores, Leídos) en todos los dispositivos conectados.

## 4. Laboratorio de Escritorio: Troubleshooting de Correo

**Escenario:** Un usuario de tu empresa informa que puede **recibir** correos perfectamente en su laptop y celular, pero cuando intenta **enviar** un mensaje, recibe un error de "Timeout" o "Conexión rechazada".

**Tu tarea de diagnóstico:**

1. **Identifica el protocolo afectado:** ¿Es SMTP, POP3 o IMAP?
    
    - _Respuesta:_ **SMTP** (Envío).
        
2. **Comando de verificación (Simulado):** Si estuvieras en una terminal (Windows/Linux), ¿cómo verificarías si el puerto de envío está abierto hacia el servidor?
    
    - `telnet smtp.empresa.com 587`
        
3. **Posibles Causas Raíz:**
    
    - A) El firewall local o de red está bloqueando el tráfico saliente por el puerto **587** o **465**.
        
    - B) El servidor requiere autenticación (SMTP Auth) y las credenciales son incorrectas.
        
    - C) El ISP del usuario bloquea el puerto 25 (común en redes residenciales para evitar spam).

