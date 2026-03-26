---
title: Triada DAD
description: En el análisis de riesgos y operaciones de ciberseguridad, es fundamental comprender no solo los objetivos de la protección, sino también las metas estratégicas de un atacante. Mientras que los defensores trabajan para mantener la Tríada CIA (Confidencialidad, Integridad, Disponibilidad), los actores maliciosos operan bajo un modelo antagónico conocido como la Tríada DAD Divulgación, Alteración y Denegación.
---


En el análisis de riesgos y operaciones de ciberseguridad, es fundamental comprender no solo los objetivos de la protección, sino también las metas estratégicas de un atacante. Mientras que los defensores trabajan para mantener la Tríada CIA (Confidencialidad, Integridad, Disponibilidad), los actores maliciosos operan bajo un modelo antagónico conocido como la **Tríada DAD: Divulgación, Alteración y Denegación**.

Este modelo describe los tres resultados negativos principales que un incidente de seguridad puede ocasionar en los activos de una organización.

## 1. Divulgación (Disclosure)

La divulgación representa la violación directa del principio de **confidencialidad**. Ocurre cuando información sensible, protegida o clasificada es accedida, visualizada o liberada a entidades no autorizadas. El objetivo del atacante es el acceso a la información, no necesariamente su destrucción.

- **Impacto:** Pérdida de propiedad intelectual, exposición de datos personales de clientes (PII), compromiso de credenciales y daño reputacional.
    
- **Vectores de Ataque Comunes:**
    
    - **Exfiltración de datos:** Uso de malware (como troyanos o spyware) para copiar y enviar datos fuera de la red corporativa.
        
    - **Ingeniería Social:** Ataques de _Phishing_ diseñados para engañar a usuarios y obtener credenciales de acceso.
        
    - **Robo físico:** Sustracción de dispositivos de almacenamiento, portátiles o documentos impresos.
        

## 2. Alteración (Alteration)

La alteración constituye la violación del principio de **integridad**. En este escenario, los datos son modificados, corrompidos o manipulados sin autorización. El objetivo del atacante no es necesariamente ver la información, sino comprometer su veracidad y confiabilidad.

- **Impacto:** Toma de decisiones basada en datos erróneos, fraudes financieros, pérdida de confianza en los sistemas y fallos operativos por corrupción de software.
    
- **Vectores de Ataque Comunes:**
    
    - **Inyección de Código:** Técnicas como _SQL Injection_ para modificar registros en bases de datos (ej. alterar saldos bancarios).
        
    - **Defacement:** Modificación visual no autorizada de la interfaz de un sitio web para transmitir mensajes políticos o vandálicos.
        
    - **Manipulación de Logs:** Alteración de registros de auditoría para ocultar la actividad maliciosa dentro de un sistema (borrado de huellas).
        

## 3. Denegación (Denial)

La denegación es la violación del principio de **disponibilidad**. Consiste en interrumpir o impedir el acceso legítimo a los sistemas, aplicaciones o datos por parte de los usuarios autorizados. El objetivo es degradar o detener la operatividad del negocio.

- **Impacto:** Interrupción de servicios críticos, pérdidas económicas por tiempo de inactividad, imposibilidad de realizar transacciones y bloqueo administrativo.
    
- **Vectores de Ataque Comunes:**
    
    - **Ataques Volumétricos:** Ataques de Denegación de Servicio Distribuido (DDoS) que saturan el ancho de banda o los recursos del servidor.
        
    - **Ransomware:** Software extorsivo que cifra los datos críticos, haciéndolos inaccesibles para el usuario legítimo hasta que se pague un rescate.
        
    - **Sabotaje Físico o Lógico:** Destrucción de hardware o borrado masivo de sistemas de archivos.

