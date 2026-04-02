# Topologías de Data Center

Cuando hablamos de un **datacenter (centro de datos)**, nos referimos a cualquier instalación que aloja computadoras, almacenamiento y equipos de red que una organización utiliza para organizar, procesar, almacenar y distribuir grandes cantidades de datos.

Esta definición es amplia porque un "datacenter" puede ir desde un pequeño armario de 15 metros cuadrados con unos pocos racks en una oficina, hasta instalaciones masivas.

### 1. La Jerarquía Tradicional de Tres Capas

El modelo jerárquico de tres capas es el diseño de red empresarial clásico. Su objetivo es crear una red escalable, predecible y de alto rendimiento dividiendo la red en tres secciones funcionales.

Aquí tienes una representación simple de cómo fluye la conexión:

![[Pasted image 20260402114040.png]]

#### Capa de Núcleo (Core Layer)

Esta es la **columna vertebral (backbone)** de la red. Está compuesta por los routers más grandes, rápidos y caros que encontrarás. Su único trabajo es mover paquetes de datos lo más rápido posible. La redundancia aquí es crítica; si un router de núcleo falla, toda la red puede caer. Por eso, casi siempre encontrarás al menos dos, operando en una configuración redundante.

#### Capa de Distribución (Distribution Layer)

También llamada **capa de agregación**, este es el "cerebro" de la red. Se encuentra entre el núcleo y el acceso. Aquí es donde se definen las políticas, se implementan las listas de control de acceso (ACL) y se realiza el filtrado. Generalmente, se utilizan switches de Capa 3 (L3) en esta capa para enrutar el tráfico entre diferentes subredes y VLANs dentro de tu red empresarial.

#### Capa de Acceso (Access Layer)

También conocida como **capa de borde (edge)**, esta es la capa donde se conectan todos los dispositivos finales: computadoras, laptops, servidores, impresoras y puntos de acceso inalámbrico (WAPs). Los dispositivos aquí suelen ser switches (principalmente de Capa 2) que se encargan de asegurar que los paquetes se conviertan en tramas y se entreguen a los endpoints correctos.

¿Por qué usar este modelo?

Este diseño proporciona un mejor rendimiento, gestión, escalabilidad y redundancia. También facilita la resolución de problemas (troubleshooting), ya que a menudo puedes aislar un problema a un solo dispositivo de capa de acceso mientras el resto de la red sigue funcionando.
### 2. El Núcleo Colapsado (Collapsed Core)

No todas las redes necesitan la complejidad (y el costo) de un modelo completo de tres capas. Aquí es donde entra el diseño de **núcleo colapsado**.

En esta topología, las funciones de la capa de **núcleo** y la capa de **distribución** se fusionan en una sola capa. Esto crea un sistema más simple de dos capas (Núcleo/Distribución y Acceso).

![[Pasted image 20260402114231.png]]

Este diseño se ve a menudo en datacenters de tamaño pequeño a mediano donde la escalabilidad masiva del modelo de tres capas simplemente no es necesaria.

- **Ventajas:** Reduce la cantidad de switches necesarios, lo que disminuye los costos y simplifica la gestión. También puede reducir la latencia al disminuir el número de "saltos" (hops) que un paquete debe dar.
    
- **Desventajas:** No es adecuado para redes muy grandes o complejas donde la distinción y escalabilidad de las capas separadas de núcleo y distribución son más beneficiosas.
    

La elección entre un modelo de tres capas y un núcleo colapsado dependerá de las necesidades específicas y el tamaño del datacenter.

### 3. Arquitectura Spine and Leaf (Columna y Hoja)

Aquí es donde nos adentramos en las arquitecturas modernas de datacenter. Mientras que el modelo de tres capas es excelente para conectar la red empresarial, la arquitectura **Spine and Leaf** es una alternativa diseñada específicamente para la comunicación _dentro_ del datacenter, especialmente en las granjas de servidores (server farms).

Esta arquitectura se compone de dos capas de switches:

1. **Leaf (Hoja):** Son los switches de acceso. Típicamente, se instalan en la parte superior de cada rack de servidores (lo que se conoce como **Top-of-Rack o ToR switching**). Cada servidor en el rack se conecta a estos switches Leaf.
    
2. **Spine (Columna):** Es el backbone del datacenter. Los switches Spine interconectan _todos_ los switches Leaf en una **topología de malla completa**.
    

Lo más importante que debes recordar es la regla de conexión:

- **Cada switch Leaf se conecta a CADA switch Spine.**
    
- Los switches Leaf nunca se conectan entre sí.
    
- Los switches Spine nunca se conectan entre sí.

![](https://study-ccna.com/wp-content/uploads/spine-and-leaf-architecture.jpg)

**Ventajas del modelo Spine and Leaf:**

- **Baja Latencia y Alta Velocidad:** Como cada Leaf está a solo un "salto" de distancia de cualquier otro Leaf (a través de un Spine), la comunicación es extremadamente rápida.
    
- **Redundancia:** Si un switch Spine falla, la red simplemente enruta el tráfico a través de otro Spine. El rendimiento puede degradarse ligeramente, pero la red no se detiene.
    
- **Escalabilidad:** ¿Necesitas más capacidad de servidores? Agregas un nuevo switch Leaf y lo conectas a todos los Spines. ¿Necesitas más ancho de banda en el backbone? Agregas un nuevo switch Spine y lo conectas a todos los Leafs.
    

Este modelo funciona excepcionalmente bien con las Redes Definidas por Software (SDN).

### 4. Flujos de Tráfico del Datacenter

Finalmente, para el Network+, debes entender cómo describimos la dirección del flujo de datos. Usamos los términos **Norte-Sur** y **Este-Oeste**.

#### Tráfico Norte-Sur (North-South)

Este es el tráfico que **entra o sale** del datacenter.

- **Tráfico Sur (Southbound):** Tráfico que **entra** al datacenter (por ejemplo, una solicitud de un usuario desde Internet a un servidor web dentro del datacenter).
    
- **Tráfico Norte (Northbound):** Tráfico que **sale** del datacenter (por ejemplo, la respuesta del servidor web de vuelta al usuario).
    

Imagina que el datacenter es un edificio. El tráfico que entra o sale por la puerta principal es Norte-Sur.

#### Tráfico Este-Oeste (East-West)

Este es el tráfico que se mueve **horizontalmente, o _dentro_** del datacenter.

- Ejemplos: Un servidor web que consulta a un servidor de base de datos en otro rack. Un servidor de aplicaciones que se comunica con un servidor de autenticación.
    

Debido al auge de la virtualización, las nubes privadas y las arquitecturas como Spine and Leaf, la cantidad de tráfico Este-Oeste en los datacenters modernos ha aumentado exponencialmente.

Aquí tienes una tabla simple para tu estudio:

|**Tipo de Tráfico**|**Dirección**|**Descripción Simple**|
|---|---|---|
|**Norte-Sur**|Vertical|Tráfico que **entra o sale** del datacenter.|
|Sur (Southbound)|Hacia adentro|Tráfico que ingresa al datacenter (Usuario -> Servidor).|
|Norte (Northbound)|Hacia afuera|Tráfico que abandona el datacenter (Servidor -> Usuario).|
|**Este-Oeste**|Horizontal|Tráfico que se mueve **dentro** del datacenter (Servidor <-> Servidor).|
