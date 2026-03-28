# Puertos y Protocolos de Transferencia de Archivos

Esta sección cubre los mecanismos especializados para la transmisión de datos a través de la red, operando principalmente en la **Capa 7 (Aplicación)** del modelo OSI.

## 1. FTP: File Transfer Protocol (El Estándar Inseguro)

Es uno de los protocolos más antiguos y todavía se utiliza por su simplicidad, aunque carece de cifrado.

- **Puertos:** 
	- **Puerto 21 (Control):** Se utiliza para establecer la conexión, autenticación y envío de comandos (ej. "get", "put").
	- **Puerto 20 (Datos):** Se utiliza exclusivamente para la transferencia real de los archivos.
        
- **Seguridad:** **Inseguro**. Transmite credenciales y datos en **texto plano (plain text)**.
    
- **Dato de Examen:** Si un firewall solo abre el puerto 21, la sesión se iniciará pero la transferencia de datos fallará.
    

## 2. SFTP: SSH File Transfer Protocol (El Estándar Seguro)

Diseñado para solucionar las vulnerabilidades de FTP mediante el uso de **SSH (Secure Shell)**.

- **Puerto:** **22** (el mismo que SSH).
    
- **Funcionamiento:** Envuelve (tuneliza) el tráfico de transferencia de archivos dentro de una sesión SSH cifrada.
    
- **Ventajas:** Proporciona cifrado fuerte para datos y contraseñas, garantizando la integridad de la transmisión.
    

## 3. TFTP: Trivial File Transfer Protocol (El Protocolo Simplificado)

Una versión minimalista de FTP diseñada para eficiencia y bajo consumo de recursos.

- **Puerto:** **69** (**UDP** - _Nota: A diferencia de FTP/SFTP que usan TCP, TFTP usa UDP por su ligereza_).
    
- **Características:** No requiere autenticación (sin usuario/contraseña) y no permite navegar por directorios.
    
- **Casos de Uso:** 
	- Arranque de estaciones de trabajo sin disco (**diskless workstations**).
	- Carga de configuraciones o firmware en teléfonos **VoIP**.
	- Actualización de firmware en dispositivos de red (switches/routers).
        

## 4. SMB: Server Message Block (Compartición en LAN)

Protocolo de red para compartir archivos, impresoras y puertos serie entre nodos de una red.

- **Puerto:** **445** (sobre TCP).
    
- **Uso:** Predominante en entornos **Windows**, aunque existe la versión multiplataforma **Samba** para Linux/Unix.
    
- **Limitación:** Está optimizado para **Redes de Área Local (LAN)**; no es recomendable para transferencias a través de Internet (donde se prefiere SFTP o HTTPS).

## 5. Laboratorio de Escritorio: Selección de Protocolo

**Escenario:** Eres el administrador de red de una oficina de diseño. Tienes los siguientes tres requerimientos. Indica qué protocolo y puerto usarías para cada uno:

1. **Requerimiento A:** Un diseñador necesita enviar sus archivos finales a un servidor externo de un cliente a través de Internet de forma protegida.
    
    - _Respuesta:_ **SFTP (Puerto 22)**.
        
2. **Requerimiento B:** Debes actualizar el firmware de 50 teléfonos IP nuevos que acabas de sacar de su caja. Los teléfonos están programados para buscar un servidor al encenderse.
    
    - _Respuesta:_ **TFTP (Puerto 69)**.
        
3. **Requerimiento C:** Necesitas configurar una carpeta compartida en el servidor de la oficina para que todos los empleados de contabilidad (que usan Windows) guarden sus facturas.
    
    - _Respuesta:_ **SMB (Puerto 445)**.
        

**Nota del Instructor:** CompTIA adora las comparaciones. Recuerda: **SFTP** para seguridad en Internet, **TFTP** para dispositivos internos simples (VoIP/Firmware) y **SMB** para el día a día en la oficina Windows. ¡Vas por muy buen camino!