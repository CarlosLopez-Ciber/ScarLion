---
title: Taxonomía de la Seguridad
description: La preservación de los activos de información constituye el pilar fundamental de la continuidad operativa en la sociedad contemporánea. Para un análisis riguroso de esta disciplina, resulta imperativo distinguir entre los tres dominios conceptuales que articulan la protección de datos.
---

La preservación de los activos de información constituye el pilar fundamental de la continuidad operativa en la sociedad contemporánea. Para un análisis riguroso de esta disciplina, resulta imperativo distinguir entre los tres dominios conceptuales que articulan la protección de datos: la Seguridad de la Información, la Seguridad Informática y la Ciberseguridad.

## 1. Delimitación Conceptual y Alcances Técnicos

La interrelación entre estos conceptos suele representarse mediante un modelo de capas jerárquicas, donde el alcance se define por la naturaleza del activo y el medio en el que este reside.

### 1.1. Seguridad de la Información (Information Security - InfoSec)

Representa el dominio de mayor jerarquía. Se define como el conjunto de medidas preventivas y reactivas que permiten resguardar y proteger la información buscando mantener la confidencialidad, disponibilidad e integridad de la misma. De acuerdo con el estándar **ISO/IEC 27001**, este concepto es independiente del soporte, abarcando tanto datos en formato digital como físico (documentación impresa, propiedad intelectual verbal, archivos históricos).

- **Objetivo de Protección:** Activos de información tangibles e intangibles.
    
- **Justificación Teórica:** Se fundamenta en la gestión de riesgos de negocio, priorizando la gobernanza de datos sobre la infraestructura técnica.
    

### 1.2. Seguridad Informática (Computer Security)

Se subordina a la Seguridad de la Información y se especializa en la protección de la infraestructura computacional. Su núcleo operativo es la salvaguarda de los sistemas de procesamiento de datos y la integridad de los dispositivos de almacenamiento.

- **Objetivo de Protección:** _Hardware_, _software_ y bases de datos locales.
    
- **Implementación Técnica:** Aplicación de controles de acceso lógico, cifrado de archivos en reposo (_Data at Rest_) y hardening de sistemas operativos.
    

### 1.3. Ciberseguridad (Cybersecurity)

Especialización de la seguridad informática enfocada en la protección de activos de información en entornos interconectados. Su alcance se extiende a la defensa de los sistemas frente a amenazas que transitan por el ciberespacio, utilizando las redes de comunicación como vector de ataque.

- **Objetivo de Protección:** Datos en tránsito (_Data in Transit_), perímetros de red y arquitecturas de nube (_Cloud Computing_).
    
- **Amenazas Específicas:** Mitigación de vectores de ataque complejos como el _Ransomware_, ataques de Denegación de Servicio Distribuido (DDoS) e Inyecciones de Código (SQLi).
    

## 2. Niveles de Aplicación y Responsabilidad Sistémica

La implementación de estrategias de seguridad no es un proceso aislado, sino un despliegue multidimensional que abarca desde el individuo hasta el Estado.

### 2.1. Dimensión Individual: Seguridad del Usuario Final

En este nivel, el enfoque se centra en la reducción de la superficie de ataque personal mediante la higiene digital.

- **Protocolos Estándar:** Implementación de Autenticación de Múltiples Factores (MFA), gestión de identidades y aplicación de parches de seguridad en dispositivos finales.
    

### 2.2. Dimensión Organizacional: Gestión de Riesgos Corporativos

Las instituciones deben establecer un Marco de Trabajo de Ciberseguridad (como el **NIST Cybersecurity Framework**) para garantizar la resiliencia del negocio.

- **Estrategias Críticas:** Segmentación de redes (VLANs), implementación de arquitecturas de Confianza Cero (_Zero Trust_) y programas de concientización basados en ingeniería social.
    

### 2.3. Dimensión Gubernamental: Protección de Infraestructuras Críticas (CIP)

El Estado asume la responsabilidad de proteger los servicios esenciales cuya interrupción tendría un impacto debilitante en la seguridad nacional, la economía o la salud pública.

- **Acciones Soberanas:** Establecimiento de Centros de Respuesta a Incidentes de Seguridad Informática (CSIRT), regulación de marcos legales de protección de datos personales y defensa del ciberespacio nacional.
    

## 3. Matriz Comparativa de Dominios de Seguridad

La siguiente tabla sintetiza las diferencias operativas y conceptuales entre las áreas de estudio analizadas:

|                         |                                                           |                                  |                                    |
| ----------------------- | --------------------------------------------------------- | -------------------------------- | ---------------------------------- |
| **Atributo**            | **Seguridad de la Información**                           | **Seguridad Informática**        | **Ciberseguridad**                 |
| **Enfoque Principal**   | Estrategia y Gobernanza                                   | Infraestructura y Dispositivo    | Red y Conectividad                 |
| **Naturaleza del Dato** | Analógica y Digital                                       | Digital (En reposo)              | Digital (En tránsito)              |
| **Marco Normativo**     | ISO/IEC 27001 / GDPR                                      | Políticas de IT / Hardening      | NIST / ISO 27032                   |
| **Alcance**             | Global / Organizacional                                   | Sistemas Locales                 | Ciberespacio / Nube                |
| **Objetivo Central**    | Tríada CIA (Confidencialidad, Integridad, Disponibilidad) | Integridad del Sistema Operativo | Resiliencia ante Amenazas Externas |
