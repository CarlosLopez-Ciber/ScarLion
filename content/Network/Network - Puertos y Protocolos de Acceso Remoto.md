# Puertos y Protocolos de Acceso Remoto

El acceso remoto permite a los administradores gestionar sistemas y redes desde cualquier ubicación. Es vital distinguir entre el acceso por **línea de comandos (CLI)** y el acceso por **interfaz gráfica (GUI)**, además de sus implicaciones de seguridad.

## 1. SSH: Secure Shell (El Estándar de Oro)

Es el protocolo preferido para la administración remota segura.

- **Puerto:** **22** (TCP).
    
- **Capa OSI:** Capa 7 (Aplicación).
    
- **Funcionamiento:** Crea un **túnel cifrado** entre el cliente y el servidor. Proporciona una autenticación sólida y garantiza que los comandos ejecutados no sean interceptados.
    
- **Uso principal:** Gestión de servidores Linux/Unix y configuración remota de dispositivos de red (switches y routers).
    

## 2. Telnet: Telecommunication Network (El Protocolo Vulnerable)

Un protocolo antiguo que ha caído en desuso debido a su falta de seguridad inherente.

- **Puerto:** **23** (TCP).
    
- **Seguridad:** **Inseguro**. Transmite toda la información, incluyendo nombres de usuario y contraseñas, en **texto plano (plain text)**.
    
- **Estado actual:** Considerado **Legacy**. Solo debe usarse en equipos extremadamente antiguos que no soporten SSH, y preferiblemente solo dentro de redes aisladas.
    
- **Dato CompTIA:** En el examen, si se te da a elegir entre Telnet y SSH para una red moderna, la respuesta correcta siempre será **SSH**.
    

## 3. RDP: Remote Desktop Protocol (Acceso Gráfico)

Protocolo propietario de Microsoft diseñado para la gestión visual de sistemas.

- **Puerto:** **3389** (TCP/UDP).
    
- **Interfaz:** A diferencia de SSH/Telnet, RDP ofrece una **GUI (Interfaz Gráfica de Usuario)**. Permite ver el escritorio remoto y usar el ratón/teclado como si estuvieras frente al equipo.
    
- **Características Avanzadas:** * Cifrado de datos integrado.
    
    - Soporte para autenticación por tarjeta inteligente (_Smart Cards_).
        
    - Mecanismos de reducción de ancho de banda para optimizar la velocidad de la imagen.
        

## 4. Tabla Comparativa de Puertos y Protocolos

|   |   |   |   |
|---|---|---|---|
|**Protocolo**|**Puerto**|**Tipo de Interfaz**|**Seguridad**|
|**SSH**|**22**|Línea de comandos (CLI)|**Alta** (Cifrado)|
|**Telnet**|**23**|Línea de comandos (CLI)|**Nula** (Texto plano)|
|**RDP**|**3389**|Gráfica (GUI)|**Alta** (Cifrado)|

## 5. Laboratorio de Escritorio: Troubleshooting de Gestión Remota

**Escenario:** Trabajas en el equipo de IT de una empresa global. Un servidor crítico en la sede de Londres necesita una actualización de configuración urgente. Tú estás en la oficina de Madrid.

**Instrucciones de resolución:**

1. **Diagnóstico Inicial:** Intentas conectarte usando el puerto **23** y el firewall de la empresa bloquea la conexión inmediatamente. ¿Por qué ocurre esto?
    
    - _Respuesta:_ El puerto 23 es **Telnet**. La política de seguridad de la empresa probablemente bloquea este protocolo por ser inseguro (texto plano).
        
2. **Configuración Correcta:** Debes cambiar el protocolo. ¿A qué puerto deberías apuntar tu cliente de terminal para asegurar que tu contraseña no sea interceptada en Internet?
    
    - _Respuesta:_ Al puerto **22 (SSH)**.
        
3. **Gestión de Usuario Final:** Un usuario de Londres necesita que le ayudes a configurar una aplicación de Excel en su computadora Windows. Él quiere que "tomes el control de su pantalla". ¿Qué protocolo y puerto utilizarás?
    
    - _Respuesta:_ **RDP (Puerto 3389)**.
        

**Nota del Instructor:** ¡Excelente dominio de los conceptos! Recuerda para el examen: **SSH** es para comandos seguros, **Telnet** es historia (legacy) y **RDP** es para ver el escritorio de Windows. ¡Sigue así!