---
title: Gestión de Acceso AAA
description: En la arquitectura de la seguridad de la información, el Marco AAA constituye la metodología estándar para gestionar el acceso a los recursos de una red. Este modelo desglosa el control de seguridad en tres procesos secuenciales y complementarios Autenticación, Autorización y Trazabilidad (Accounting).
---


En la arquitectura de la seguridad de la información, el **Marco AAA** constituye la metodología estándar para gestionar el acceso a los recursos de una red. Este modelo desglosa el control de seguridad en tres procesos secuenciales y complementarios: **Autenticación, Autorización y Trazabilidad (Accounting)**.

Este marco es esencial para la implementación técnica de políticas de seguridad y para garantizar que los principios de protección de la información se cumplan de manera efectiva.

## 1. Autenticación (Authentication)

La autenticación es el primer paso en el control de acceso. Se define como el proceso técnico mediante el cual se **verifica la identidad** de un usuario, dispositivo, sistema o servicio que intenta acceder a la red.

Su objetivo es validar que la entidad es quien dice ser.

- **Pregunta fundamental:** "¿Quién es usted?"

## 2. Autorización (Authorization)

Una vez que la identidad del sujeto ha sido validada exitosamente a través de la autenticación, entra en vigor la autorización. Este proceso consiste en **otorgar o denegar permisos** específicos sobre recursos determinados (archivos, aplicaciones, bases de datos, etc.). La autorización se basa en el principio de mínimo privilegio, asegurando que el usuario solo tenga acceso a lo estrictamente necesario.

- **Pregunta fundamental:** "¿Qué tiene permitido hacer?"

## 3. Trazabilidad (Accounting)

Conocido en inglés como _Accounting_ o _Accountability_, este componente se refiere al **registro, seguimiento y auditoría** de las acciones realizadas por una identidad autenticada dentro del sistema. La trazabilidad permite reconstruir eventos pasados, medir el consumo de recursos y detectar anomalías o comportamientos sospechosos.

- **Pregunta fundamental:** "¿Qué actividades realizó?"

## Ejemplo

Para ilustrar el flujo de trabajo del marco AAA en un entorno corporativo, se presenta el siguiente caso de uso:

1. **Fase de Autenticación:** Un empleado introduce sus credenciales (nombre de usuario y contraseña) y valida su identidad mediante un segundo factor (código en aplicación móvil) para ingresar a la red corporativa. El sistema confirma que la identidad es legítima.
    
2. **Fase de Autorización:** Una vez dentro del sistema, el perfil del empleado es evaluado. El servidor de archivos le permite el acceso de lectura y escritura a la carpeta "Departamento de Marketing", pero deniega explícitamente el acceso a la carpeta "Departamento de Finanzas", acorde a sus funciones laborales.
    
3. **Fase de Trazabilidad:** Durante la sesión, cada archivo que el empleado abre, modifica o elimina queda registrado en los logs del servidor. Este registro incluye el nombre de usuario, la dirección IP, la acción realizada y la marca de tiempo exacta, permitiendo una auditoría posterior si fuera necesaria.

