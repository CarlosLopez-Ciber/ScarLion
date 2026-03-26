---
title: Amenaza, Vulnerabilidad y Riesgo
description: Texto consolidado de los 3 conceptos.
---

### Vulnerabilidad: La Debilidad Inherente

Una **vulnerabilidad** es una debilidad o falla en un sistema, proceso o control que puede ser explotada por una amenaza. Es una condición preexistente que abre la puerta a un posible compromiso de la seguridad.

* **Naturaleza:** Es una característica pasiva e interna de un activo.
* **Ejemplos Prácticos:**
  * **Software sin parches:** Un servidor web que ejecuta una versión de software con una vulnerabilidad de ejecución remota de código (RCE) conocida.
  * **Configuraciones débiles:** Una base de datos con contraseñas por defecto o de baja complejidad.
  * **Falta de controles:** Ausencia de cifrado en la transmisión de datos sensibles.
  * **Factor humano:** Empleados sin la formación adecuada en la identificación de correos de phishing.

### Amenaza: El Peligro Potencial

Una **amenaza** es cualquier evento o actor con el potencial de causar daño a un activo. A diferencia de la vulnerabilidad, la amenaza es externa y activa. Es crucial entender que **una amenaza puede existir incluso en ausencia de una vulnerabilidad**.

* **Naturaleza:** Es un agente o evento externo con intención o potencial malicioso.
* **Componentes:** Una amenaza se compone de un **actor de amenaza** (ej. un ciberdelincuente, un empleado descontento, un desastre natural) y un **vector de ataque** (el método o camino utilizado para explotar una vulnerabilidad, ej. un correo de phishing, un sitio web malicioso, una unidad USB infectada).
*   Ejemplo:

    Un grupo de ciberdelincuentes (actor de amenaza) que busca activamente servidores web para explotar vulnerabilidades y desplegar ransomware (intención). Este grupo representa una amenaza constante en internet, independientemente de si una organización específica tiene o no vulnerabilidades en sus sistemas.

### Riesgo: La Probabilidad del Impacto

El **riesgo** es la probabilidad de que una amenaza explote una vulnerabilidad y el impacto o daño resultante de dicho evento. El riesgo no puede existir sin la presencia tanto de una amenaza como de una vulnerabilidad.

* **Naturaleza:** Es la materialización de un evento adverso. Es de naturaleza probabilística.
* **Fórmula Clásica:** `Riesgo = Probabilidad × Impacto`

### La Interrelación: La Ecuación del Riesgo

La relación entre estos tres conceptos es la piedra angular de la gestión de riesgos de seguridad.

**Vulnerabilidad + Amenaza = Riesgo**

Para ilustrarlo con un ejemplo cohesivo:

* **Vulnerabilidad:** Una empresa tiene un servidor de base de datos que no ha sido actualizado y es vulnerable a ataques de inyección SQL.
* **Amenaza:** Un hacker (actor de amenaza) explora sistemáticamente sitios web en busca de formularios vulnerables a inyección SQL (vector de ataque).
* **Riesgo:** Existe un **riesgo alto** de que el hacker (amenaza) descubra y explote la vulnerabilidad de inyección SQL en el servidor de la empresa (vulnerabilidad), lo que podría resultar en la exfiltración de datos sensibles de clientes (impacto).

Si la empresa aplicara el parche de seguridad, la **vulnerabilidad** desaparecería. Aunque la **amenaza** (el hacker) seguiría existiendo, el **riesgo** de un compromiso a través de esa vulnerabilidad específica se reduciría a cero.

### Metodologías de Evaluación

#### Evaluación de Riesgos (Risk Assessment)

Este es un proceso **centrado en el evento**. Su objetivo es identificar y cuantificar los riesgos a los que está expuesta una organización. Involucra el análisis de activos, las amenazas que los acechan y las vulnerabilidades que poseen, culminando en una evaluación de la probabilidad y el impacto de posibles incidentes.

* **Pregunta Clave:** _¿Cuál es la probabilidad de que nuestro servidor de base de datos sea comprometido y cuál sería el costo financiero y reputacional?_

#### Modelado de Amenazas (Threat Modeling)

Este es un proceso **centrado en el actor y la intención**. Su objetivo es identificar y evaluar las amenazas potenciales desde la perspectiva de un atacante. Se analiza la intención del actor de amenaza (ej. robo de datos, sabotaje, espionaje) y su capacidad técnica para llevar a cabo el ataque.

* **Pregunta Clave:** _¿Qué tipo de atacante estaría interesado en nuestros datos y qué métodos utilizaría para obtenerlos?_

### Cuadro comparativo

| Concepto           | Enfoque                     | Naturaleza       | Ejemplo Resumido                                                                                         |
| ------------------ | --------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| **Vulnerabilidad** | La debilidad                | Pasiva e interna | Un puerto de red abierto e innecesario.                                                                  |
| **Amenaza**        | El actor y su intención     | Activa y externa | Un ciberdelincuente que busca puertos abiertos.                                                          |
| **Riesgo**         | El evento y su consecuencia | Probabilística   | La probabilidad de que el ciberdelincuente use el puerto abierto para acceder a la red y causar un daño. |