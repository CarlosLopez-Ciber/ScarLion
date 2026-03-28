# Topología de Redes Inalambricas

## 1. Modo Infraestructura (Infrastructure Mode)

Es el tipo de red inalámbrica más común y el estándar en entornos corporativos y domésticos.

- **Arquitectura:** Se basa en un dispositivo de gestión centralizada llamado **WAP (Wireless Access Point)**.
    
- **Topología Lógica:** Funciona de manera similar a una **topología en estrella** física, donde el WAP es el nodo central.
    
- **Ventajas:** 
	- Permite controles de seguridad centralizados (WPA3, filtrado MAC).
	- Escalabilidad mediante la interconexión de múltiples puntos de acceso.
	- Gestión de tráfico eficiente.
        

## 2. Modo Ad Hoc

Es una red descentralizada, temporal y de tipo **P2P (Peer-to-Peer)**.

- **Arquitectura:** No existen routers ni puntos de acceso. Los dispositivos se comunican directamente entre sí (ej. laptop a laptop).
    
- **Funcionamiento:** Las decisiones de enrutamiento se toman de manera dinámica y "al vuelo". Los nodos pueden entrar y salir de la red libremente.
    
- **Uso común:** Intercambio rápido de archivos en lugares sin infraestructura o configuraciones de emergencia.
    
- **Dato de Examen:** CompTIA se refiere a esto técnicamente como **IBSS (Independent Basic Service Set)**.
    

## 3. Malla Inalámbrica (Wireless Mesh)

Una interconexión compleja de nodos, dispositivos y radios diseñada para la **alta disponibilidad** y entornos hostiles.

- **Arquitectura:** Una red única creada por la unión de diversos radios (Wi-Fi, Bluetooth, Celular, Satelital, Microondas).
    
- **Redundancia:** Si un nodo falla, la red busca automáticamente una ruta alterna, lo que la hace extremadamente confiable.
    
- **Alcance Escalonado:** * **Wi-Fi:** Cobertura de decenas a cientos de pies.
    
    - **Microondas:** Cobertura de 30 a 40 millas.
        
    - **Satelital:** Cobertura de miles de millas.
        
- **Casos de Uso Críticos:** Misiones de asistencia humanitaria, recuperación tras desastres naturales (huracanes) y entornos industriales.

## 4. Laboratorio de Escritorio: Escenario de Desastre Natural

**Situación:** Acabas de ser desplegado en una zona donde un huracán destruyó todas las torres de telefonía y cables de fibra óptica. Tienes un equipo de 5 personas con laptops y una antena satelital portátil.

**Resuelve los siguientes retos de configuración:**

1. **Necesitas que todo el equipo tenga acceso a Internet a través de la única antena satelital disponible.** ¿Qué modo configurarías en un router inalámbrico conectado a la antena para que todos se conecten de forma centralizada?
    
    - _Respuesta:_ **Modo Infraestructura**. El router actuará como WAP central.
        
2. **Un equipo de reconocimiento debe alejarse 5 millas del campamento para evaluar daños.** Llevan una radio de microondas. ¿Cómo integrarías esto para no perder comunicación?
    
    - _Respuesta:_ Configurando una **Topología de Malla (Mesh)**. Usarías el enlace de microondas para extender la red del campamento base hacia el equipo remoto.
        
3. **Dos técnicos en el campo necesitan pasarse un reporte PDF pesado, pero están fuera del alcance del Wi-Fi del campamento y no tienen cables.** ¿Qué modo usarían en sus laptops para la transferencia rápida?
    
    - _Respuesta:_ **Modo Ad Hoc**. Conexión directa P2P entre sus tarjetas de red inalámbricas.
        

**Nota del Instructor:** La clave del examen es identificar la palabra "centralizado" para Infraestructura y "redundancia/desastre" para Mesh. ¡Excelente trabajo procesando esta lección!