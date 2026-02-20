---
title: WS - Asistente de instalación GUI
description: Al iniciar sesión en un nuevo servidor, el panel de control de Server Manager presenta una lista de inicio rápido con cinco elementos de acción.
---

## Preparación Inicial en Server Manager

Al iniciar sesión en un nuevo servidor, el panel de control de **Server Manager** presenta una lista de inicio rápido con cinco elementos de acción.

![](Pasted%20image%2020260220181821.png)

* **Configuración Local:** Antes de instalar roles, es recomendable utilizar el primer enlace, **Configure this local server**, para establecer parámetros locales.
	* Generalmente, se deben gestionar los siguientes puntos antes de implementar nuevos roles:
		* Establecer un nombre de host (*hostname*) permanente.
		* Configurar el direccionamiento IP.
		* Unir el servidor a un dominio existente (si aplica).

## 1. Inicio del Asistente de Instalación

Existen dos formas de iniciar el proceso para agregar roles y características:

1. Hacer clic en el paso 2 del centro del panel: **Add roles and features**.

![](Pasted%20image%2020260220175216.png)

2. Hacer clic en el menú **Manage** (Administrar) en la barra superior y seleccionar **Add Roles and Features**.

![Figure 2.9: Adding roles](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781837029914/files/Images/B32320_02_09.png)

Tras omitir la pantalla inicial de resumen haciendo clic en **Next**, se presentan las opciones de tipo de instalación.

## 2. Selección del Tipo de Instalación

El asistente ofrece dos rutas principales:

* **Role-based or feature-based installation:** Es la opción estándar para la mayoría de los roles y características.
* **Remote Desktop Services installation (RDS):** Aunque RDS es un rol, es funcionalmente tan distinto que invoca su propio asistente especializado. Si no se selecciona aquí, no se encontrarán las opciones de RDS más adelante.

![Figure 2.10: Selecting Role-based or feature-based installation for most roles](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781837029914/files/Images/B32320_02_10.png)

---

> ##### Requisitos Específicos para Controladores de Dominio (DC)
> Si el objetivo es instalar **Active Directory Domain Services (AD DS)** para crear un controlador de dominio, se deben cumplir los siguientes requisitos previos antes de continuar:
> - **Static IP:** Asignar una dirección IP estática. Es fundamental que un DC mantenga una IP constante.
>  - **DNS:** Definir un servidor DNS en la NIC. En laboratorios o redes nuevas, se puede usar la dirección de bucle invertido `127.0.0.1` si este será el primer servidor DNS.
>  - **Hostname:** Definir el nombre definitivo del servidor. Renombrar un servidor después de convertirlo en DC no tiene soporte y causa problemas graves.

---

## 3. Selección del Servidor de Destino

La pantalla **Server Selection** permite determinar dónde se instalará el rol. Por defecto, el servidor se seleccionará a sí mismo, pero ofrece capacidades avanzadas:

* **Instalación Remota:** Si Server Manager está configurado para monitorear otros servidores en la red, se puede instalar el rol en una máquina remota.
* **Instalación en Disco Virtual (VHDX):** Permite inyectar roles o características directamente en un archivo de disco duro virtual, incluso si la máquina virtual no está en ejecución.

![Figure 2.11: Selecting the destination server](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781837029914/files/Images/B32320_02_11.png)

---

## 4. Selección de Roles y Características

### Gestión de Roles

En la lista de roles disponibles, se puede marcar la casilla del servicio deseado (AD DS, DNS, DHCP, etc.).

* **Instalación Múltiple:** No es necesario ejecutar el asistente varias veces; se pueden marcar varios roles a la vez para que se instalen conjuntamente.

![Figure 2.13: Role selection](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781837029914/files/Images/B32320_02_13.png)

* **Dependencias (Ventana Emergente):** Algunos roles (como AD DS) requieren características adicionales. Al marcarlos, aparecerá un cuadro de diálogo; se debe hacer clic en **Add Features** para que el sistema agregue automáticamente los componentes necesarios.

![Figure 2.12: Additional features](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781837029914/files/Images/B32320_02_12.png)

## 5. Gestión de Características (Features)

Tras los roles, se llega a la pantalla de **Features**.

![](Pasted%20image%2020260220175714.png)

* Si solo se necesita una característica específica sin instalar un rol, se puede avanzar directamente hasta esta sección.
* Si no se requieren extras (como en el caso de un DC básico), se puede hacer clic en **Next** para proceder al resumen final e iniciar la instalación.

## 6. Post-Instalación y Configuración Final

Una vez finalizado el proceso técnico de instalación:

* **Reinicio:** El sistema puede solicitar o no un reinicio dependiendo de los componentes instalados.
* **Notificaciones de Configuración:** En el **Server Manager**, aparecerá una bandera con un signo de exclamación amarillo.
* **Tareas Pendientes:** Muchos roles requieren pasos adicionales para ser funcionales:
* **AD DS:** Requiere ejecutar un proceso de "promoción" (*promotion*) para definir el dominio.
* **DHCP:** Requiere configuraciones adicionales para comenzar a entregar direcciones.
* Los enlaces rápidos en el área de notificaciones permiten acceder directamente a estos procesos de configuración post-despliegue.

![Figure 2.14: Post-deployment Configuration](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781837029914/files/Images/B32320_02_14.png)

