---
title: El Marco TTP
description: En el ámbito de la ciberseguridad avanzada, la comprensión del adversario trasciende la simple identificación de indicadores técnicos. El término Tácticas, Técnicas y Procedimientos (TTP) define el modus operandi de un actor de amenaza.
---

En el ámbito de la ciberseguridad avanzada, la comprensión del adversario trasciende la simple identificación de indicadores técnicos. El término **Tácticas, Técnicas y Procedimientos (TTP)** define el _modus operandi_ de un actor de amenaza.

El estudio de los TTP es la piedra angular de la **Inteligencia de Amenazas Cibernéticas (CTI)**. Su aplicación permite a las organizaciones evolucionar de una postura defensiva reactiva (basada en Indicadores de Compromiso o IoCs, como direcciones IP o hashes) hacia una estrategia proactiva y predictiva.

El análisis de los TTP permite alcanzar tres objetivos críticos:

1. **Perfilado de Actores:** Identificar grupos específicos (como APTs o sindicatos de cibercrimen) mediante el reconocimiento de sus patrones de comportamiento distintivos.
    
2. **Emulación de Amenazas:** Facilitar ejercicios de simulación realistas (como operaciones de _Red Teaming_) que replican cómo un adversario específico atacaría la infraestructura.
    
3. **Fortalecimiento de Defensas:** Implementar controles de seguridad resilientes diseñados para interrumpir la metodología del ataque, en lugar de bloquear herramientas efímeras que el atacante puede cambiar fácilmente.
    

## Jerarquía del Marco TTP

El modelo se estructura conceptualmente como una jerarquía que avanza desde los objetivos estratégicos hasta la implementación técnica detallada.

### 1. Tácticas (El Objetivo Estratégico)

Las **tácticas** representan el nivel más alto de la jerarquía y describen el objetivo estratégico del adversario durante una fase específica de la intrusión.

- **Pregunta clave:** ¿Qué está intentando lograr el atacante?
    
- **Naturaleza:** Describen el "por qué" de la acción, no el "cómo".
    

El marco **MITRE ATT&CK®**, estándar de facto en la industria, cataloga estas tácticas a lo largo del ciclo de vida del ataque. Ejemplos incluyen:

- **Initial Access (Acceso Inicial):** Lograr una entrada en la red.
    
- **Execution (Ejecución):** Ejecutar código malicioso controlado por el adversario.
    
- **Persistence (Persistencia):** Mantener el acceso ante reinicios o cambios de credenciales.
    
- **Privilege Escalation (Escalamiento de Privilegios):** Obtener permisos de nivel administrativo o SYSTEM.
    
- **Lateral Movement (Movimiento Lateral):** Desplazarse a través de la red hacia otros sistemas.
    
- **Exfiltration (Exfiltración):** Robar datos de la red objetivo.
    

### 2. Técnicas (El Método Operativo)

Las **técnicas** describen los métodos generales que emplea un adversario para alcanzar sus objetivos tácticos. Para cada táctica, existen múltiples técnicas posibles.

- **Pregunta clave:** ¿Cómo está logrando el objetivo?
    
- **Naturaleza:** Representan el enfoque técnico general.
    

**Ejemplos de asociación Táctica-Técnica:**

- **Táctica: Initial Access**
    
    - _Técnica:_ `Phishing` (T1566) - Envío de correos fraudulentos para engañar a usuarios.
        
    - _Técnica:_ `Exploit Public-Facing Application` (T1190) - Aprovechamiento de vulnerabilidades en servicios expuestos a Internet.
        
- **Táctica: Execution**
    
    - _Técnica:_ `Command and Scripting Interpreter` (T1059) - Uso de intérpretes como PowerShell, Bash o CMD para ejecutar comandos.
        

### 3. Procedimientos (La Implementación Específica)

Los **procedimientos** constituyen el nivel más granular del análisis. Describen la implementación exacta, paso a paso, que utiliza un actor de amenaza en un incidente específico.

- **Pregunta clave:** ¿Qué herramientas, comandos o configuraciones exactas se utilizaron?
    
- **Naturaleza:** Son detalles forenses específicos que pueden variar rápidamente entre campañas.
    

**Ejemplos de Procedimientos para la técnica de Phishing:**

- El uso de la herramienta `Evilginx2` para interceptar credenciales y tokens de sesión de Office 365.
    
- El envío de un enlace acortado mediante el servicio `Bitly` con el asunto "URGENTE: Verificación de seguridad".
    
- El uso de un archivo adjunto `Informe_Q3.docx` que contiene una macro maliciosa escrita en `VBA`.

## Caso de Estudio: Análisis de Ransomware

A continuación, se presenta un desglose práctico de un ataque hipotético realizado por el grupo "Cyber Vipers", ilustrando la relación entre los tres componentes.

| **Componente**    | **Descripción y Análisis**                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Táctica**       | **`Execution` (Ejecución)**<br><br>El objetivo estratégico es lograr que el código del ransomware corra dentro de la infraestructura de la víctima.                                                                                                                                                                                                                                          |
| **Técnica**       | **`User Execution: Malicious File` (T1204.002)**<br><br>El método seleccionado para lograr la ejecución requiere la interacción humana; específicamente, engañar al usuario para abrir un archivo.                                                                                                                                                                                           |
| **Procedimiento** | **Detalle Forense:**<br>1. Envío de correo con adjunto `Detalles_Factura_8345.zip`.<br>2. El archivo ZIP contiene un script JavaScript (`.js`) con icono de PDF.<br>3. Al ejecutarse, el script lanza el comando: `powershell.exe -ExecutionPolicy Bypass -File .\\payload.ps1`.<br>4. El script descarga el binario del ransomware "ViperLock" desde un servidor de comando y control (C2). |
