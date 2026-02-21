---
title: Instalación mediante CLI
description: Es necesario abrir una consola con privilegios elevados que permita la ejecución de PowerShell.
---

## Acceso al Entorno de Comandos

Para comenzar, es necesario abrir una consola con privilegios elevados que permita la ejecución de PowerShell.

- **Método recomendado:** Utilizar el menú de tareas **Quick Admin** (Administrador rápido).
    
- **Acción:** Haga clic derecho en el botón **Start** (Inicio) y elija iniciar una sesión de administrador de **Terminal**.

## Visualización de Roles y Características

Una vez en la consola, el primer paso es identificar qué componentes están disponibles o ya instalados.

- **Comando general:**
    ```PowerShell
    Get-WindowsFeature
    ```
    
- **Propósito:** Este comando muestra una lista completa de todos los roles y características, indicando su estado actual (instalado o disponible).

![](Pasted%20image%2020260220233459.png)

## Búsqueda y Filtrado Específico

Dado que la lista completa puede ser muy extensa, es útil filtrar los resultados para encontrar el nombre exacto de un componente (en este caso, el **Telnet Client**).

- **Comando de filtrado:** Para buscar características que comiencen con letras específicas (ejemplo: `TEL`), utilice la siguiente sintaxis:
    
    ```PowerShell
    Get-WindowsFeature -Name TEL*
    ```

![](Pasted%20image%2020260220233514.png)

- **Explicación:** El uso del comodín (`*`) permite reducir la información mostrada y localizar el nombre técnico preciso para la instalación.

## Instalación de la Característica

Una vez identificado el nombre correcto (`Telnet-Client`), se procede a la ejecución de la instalación. El autor menciona que utiliza esta herramienta habitualmente para probar conexiones de red.

- **Comando de instalación:**
    
    ```PowerShell
    Add-WindowsFeature Telnet-Client
    ```

![](Pasted%20image%2020260220233529.png)

## Verificación de Componentes Instalados

Como paso final, es posible verificar rápidamente qué roles y características están activos en el servidor sin ver toda la lista de disponibles.

- **Comando de verificación:**
    
    ```PowerShell
    Get-WindowsFeature | Where Installed
    ```

![](Pasted%20image%2020260220233541.png)

- **Resultado esperado:** En un controlador de dominio, este comando mostrará los componentes de **AD DS**, **DNS**, **DHCP** y la característica **Telnet Client** recién añadida.


