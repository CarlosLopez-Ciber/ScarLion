# Topologías de Red

Una topología de red se refiere a la disposición de diferentes elementos (como enlaces, nodos, clientes y servidores) que componen una red informática. Es fundamental que entiendas los diferentes tipos de topologías cuando intentes diseñar una infraestructura de red eficiente y resiliente.

Pero antes de cubrir los seis tipos de topologías, primero debemos entender cómo se documentan en nuestros diagramas de red.

## Topología Física vs. Topología Lógica

Generalmente, encontrarás que los diagramas de red documentan las topologías usando una **topología física** o una **topología lógica**. Es vital que conozcas la diferencia para el examen.

### Topología Física

Una topología física se utiliza para mostrar cómo los dispositivos y componentes de la red están **físicamente cableados y conectados** entre sí, utilizando diversos tipos de medios de cobre o fibra.

Por ejemplo, si quisiera mostrar dónde están ubicadas todas las computadoras, routers y switches dentro de mi edificio de oficinas, podría obtener una copia del plano del edificio y luego documentar dónde se encuentran cada uno de esos dispositivos y cables, dibujándolos sobre ese plano.

**En resumen: La topología física muestra la ubicación real y el tendido de cables.**

### Topología Lógica

Por otro lado, cuando hablamos de topologías lógicas, realmente nos referimos a cómo el **tráfico realmente va a fluir** a través de nuestra red.

En un diagrama lógico, verás dónde están las estaciones de trabajo, los routers y los switches, y cómo están conectados. Sin embargo, este diagrama no muestra la ubicación de cada dispositivo en el mundo real.

> **Ejemplo clave:** Solo porque un servidor se muestre en la esquina superior derecha de un diagrama lógico, no significa que esté ubicado físicamente en la esquina superior derecha de tu oficina. Podrías tener varios dispositivos mostrados en el diagrama que están en la misma sala, en pisos diferentes o incluso en edificios distintos.
> 
> En una topología lógica, solo nos importa cómo están conectados lógicamente y cómo fluyen los datos, no cómo están cableados en el entorno físico.

---

## Los 6 Tipos de Topologías de Red

Ahora que entendemos la diferencia entre físico y lógico, veamos las seis topologías clave que debes conocer: punto a punto, anillo, bus, estrella, hub-and-spoke y malla.

### 1. Topología Punto a Punto

Esta es la forma más simple de topología de red, ya que implica una **conexión directa entre dos dispositivos**.

Se utiliza a menudo para conectar una computadora a un periférico de red, como una impresora o un escáner. Aunque es un método sencillo y fiable para conexiones a pequeña escala, no es escalable para redes más grandes.

La gran excepción, y algo que debes recordar, son las conexiones de **Red de Área Amplia (WAN)**. Puedes conectar la oficina remota de tu empresa en California con la sede central en Nueva York usando una conexión de fibra óptica punto a punto dedicada entre esas dos instalaciones.

### 2. Topología de Anillo

En una topología de anillo, cada dispositivo está conectado a otros dos, formando una **ruta de datos circular**. En esta configuración, los datos viajan en una dirección (ya sea en sentido horario o antihorario) hasta que llegan a su destino.

- **Ventaja:** Previene colisiones de datos gracias a este flujo unidireccional.
    
- **Desventaja:** Si un nodo falla en el anillo, puede interrumpir la red completa (a menos que existan conexiones redundantes).
    

Hoy en día, las redes de anillo no son comunes, a menos que hablemos de **FDDI (Fiber Distributed Data Interface)**. FDDI utiliza una estructura de **doble anillo** (un anillo primario y uno secundario) sobre fibra óptica para proporcionar redundancia. Si el anillo primario falla, el secundario puede mantener las operaciones de red. Se destaca por su alto ancho de banda y fiabilidad, siendo adecuado para Redes de Área de Campus (CAN) o centros de datos.

### 3. Topología de Bus

En una topología de bus, todos los dispositivos de la red se conectan a un **único cable central**, conocido como el _backbone_ o bus.

Cualquier dispositivo puede enviar datos, y estos están disponibles para todos los demás dispositivos en el bus. Sin embargo, solo el destinatario previsto (identificado por una dirección única) procesará el mensaje.

- **Ventaja:** Fáciles de instalar y requieren menos cable que otras disposiciones.
    
- **Desventajas:**
    
    - La red entera puede quedar deshabilitada si ese cable principal falla.
        
    - A medida que se añaden más dispositivos, el rendimiento de toda la red disminuye debido a más colisiones de datos en el cable.
        

Al igual que las redes de anillo, las redes de bus se consideran una tecnología antigua y no se utilizan comúnmente en entornos de oficina modernos.

### 4. Topología de Estrella

La topología de estrella es **uno de los diseños de red más comunes** en uso hoy en día. De hecho, tu propia red doméstica probablemente esté usando una topología de estrella ahora mismo.

En una topología de estrella, cada nodo de la red se conecta a un **punto de conexión centralizado**, que normalmente es un **switch de red**.

- **Ventaja:** Esta configuración se considera muy robusta. El fallo de un enlace (un cable) no afecta a ningún otro enlace.
    
- **Desventaja:** La red entera depende del funcionamiento de ese punto de conexión centralizado. Si ese switch falla, toda tu red quedará inoperable.
    

### 5. Topología Hub-and-Spoke

La topología hub-and-spoke (a veces llamada estrella extendida) es una variación de la topología de estrella. El nodo centralizado (el **"hub"**) está conectado a múltiples nodos (los **"spokes"** o radios).

La clave aquí es que los _spokes_ no están conectados directamente entre sí. Deben transmitir sus datos a uno de los _hubs_ antes de que esos datos se reenvíen a otro _hub_ y, finalmente, al nodo de destino.

El mejor ejemplo es el de las aerolíneas. Si quiero volar de Orlando (un _spoke_) a Honolulu, probablemente no encontraré un vuelo directo. En su lugar, volaré en Delta desde Orlando a Atlanta (un _hub_ de Delta), cambiaré de avión y volaré a Los Ángeles (otro _hub_), y desde allí, tomaré otro avión a Honolulu.

En las redes, esto nos permite consolidar muchas oficinas regionales pequeñas en un _hub_ (por ejemplo, en Nueva York) y enviar todos sus datos a través de una conexión rápida y de gran ancho de banda a otro _hub_ (por ejemplo, Los Ángeles), que luego distribuirá los datos a las oficinas de esa región. Esto ahorra mucho dinero al no tener que conectar cada oficina pequeña con cada otra oficina pequeña en todo el país.

### 6. Topología de Malla (Mesh)

Finalmente, tenemos la topología de malla. Esta presenta una conexión punto a punto entre **cada dispositivo de la red** para crear una red robusta y redundante. Hay dos tipos que debes conocer:

- **Malla Completa (Full-Mesh):** Cada nodo está conectado a todos los demás nodos de la red. Esto proporciona una redundancia altísima (si falla un enlace, hay muchas otras rutas), pero puede ser muy costoso y complejo de instalar debido a la cantidad de cables y puertos necesarios.
    
- **Malla Parcial (Partial-Mesh):** Una versión menos interconectada. Algunos nodos (quizás los más críticos) están organizados en malla completa, mientras que otros solo se conectan a uno o dos dispositivos. Esto ofrece un equilibrio entre redundancia y costo.
    

> ### Cálculo Clave para el Examen: Malla Completa
> 
> Para el examen, es posible que necesites saber cuántas conexiones se requieren para una red de malla completa. La fórmula es:
> 
> $$N \times (N - 1) / 2$$
> 
> Donde **N** es el número de nodos.
> 
> - Para **3 nodos**: $3 \times (3 - 1) / 2 = 3 \times 2 / 2 = \textbf{3}$ conexiones.
>     
> - Para **6 nodos**: $6 \times (6 - 1) / 2 = 6 \times 5 / 2 = \textbf{15}$ conexiones.
>     
> 
> Como puedes ver, el número de cables aumenta exponencialmente, haciendo que esto sea poco práctico para redes grandes.
