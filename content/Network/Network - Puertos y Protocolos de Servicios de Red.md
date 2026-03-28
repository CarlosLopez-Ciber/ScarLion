# Puertos y Protocolos de Servicios de Red

Los servicios de red permiten el descubrimiento de dispositivos, la configuración automatizada y la transmisión de información crítica del sistema. Esta guía cubre los protocolos esenciales para la operación fluida de infraestructuras modernas.

## 1. DNS: Domain Name System (La Guía Telefónica)

Traduce nombres de dominio legibles (FQDN) a direcciones IP.

- **Puerto:** **53**.
    
- **Protocolos de Transporte:**
    
    - **UDP:** Utilizado para consultas y respuestas estándar que caben en un solo paquete.
        
    - **TCP:** Utilizado para mensajes grandes y **transferencias de zona** entre servidores DNS.
        
- **Dato CompTIA:** Si DNS falla, los usuarios reportarán que "no tienen internet", aunque la conectividad por IP siga activa.
    

## 2. DHCP: Dynamic Host Configuration Protocol

Automatiza la entrega de parámetros IP a los clientes.

- **Puertos (UDP):**
    
    - **67:** Servidor (escucha peticiones).
        
    - **68:** Cliente (recibe respuestas).
        
- **Parámetros entregados:** Dirección IP, máscara de subred, **Default Gateway** y servidores DNS.
    
- **Dato de Examen:** El proceso se conoce como **DORA** (Discover, Offer, Request, Acknowledge).
    

## 3. Servicios SQL (Bases de Datos)

Protocolos para la gestión y consulta de datos desde aplicaciones.

- **Microsoft SQL Server:** Puerto **1433** (TCP).
    
- **MySQL:** Puerto **3306** (TCP).
    
- **Uso:** Comunicación entre el servidor de aplicaciones (Front-end) y el servidor de base de datos (Back-end).
    

## 4. SNMP: Simple Network Management Protocol

Utilizado para monitorear y configurar dispositivos de red (routers, switches, servidores).

- **Puertos (UDP):**
    
    - **161:** Utilizado por el Administrador para realizar **Polling** (consultar estado al agente).
        
    - **162:** Utilizado por los Agentes para enviar **Traps** (alertas no solicitadas ante eventos críticos).
        
- **Uso Real:** Ver el uso de CPU de un router o si una interfaz de un switch se ha caído.
    

## 5. Syslog (Registro del Sistema)

Estándar para centralizar los registros (logs) de eventos de múltiples dispositivos.

- **Puerto:** **514**.
    
- **Protocolos de Transporte:**
    
    - **UDP:** Por defecto (rápido, pero sin garantía de entrega).
        
    - **TCP:** Utilizado cuando se requiere **fiabilidad** en la entrega de logs.
        
- **Función:** Almacenar mensajes de eventos en un servidor central para auditoría y resolución de problemas.

## 6. Laboratorio de Escritorio: Diagnóstico de Servicios

**Escenario:** Un grupo de nuevos empleados conecta sus laptops a la red de la oficina, pero ninguno puede navegar por internet. Al ejecutar `ipconfig`, notas que sus direcciones IP comienzan con `169.254.x.x`.

**Preguntas de Diagnóstico:**

1. **¿Qué servicio está fallando?**
    
    - _Respuesta:_ **DHCP**. La dirección `169.254.x.x` indica una dirección **APIPA**, lo que significa que el cliente no encontró un servidor DHCP.
        
2. **Si fueras al firewall, ¿qué puertos UDP deberías revisar que no estén bloqueados?**
    
    - _Respuesta:_ Puertos **67 y 68**.
        
3. **Si el problema fuera que pueden entrar a sitios web por IP pero no por nombre, ¿qué puerto revisarías?**
    
    - _Respuesta:_ Puerto **53 (DNS)**.
        
4. **Quieres que el servidor de logs te avise si el servidor DHCP se apaga. ¿Qué protocolo y puerto configurarías en el servidor DHCP para enviar esa alerta?**
    
    - _Respuesta:_ **Syslog (Puerto 514)** o un **SNMP Trap (Puerto 162)**.
        

**Nota del Instructor:** Memorizar los puertos es el 50% del trabajo. El otro 50% es entender _por qué_ usamos uno u otro (ej. TCP vs UDP en Syslog).