

# Laboratorio 1: Descompilación

### Entorno necesario:

- **Máquina virtual de Windows**
    
- **.NET**
    
- **Herramienta a instalar:** [JetBrains dotPeek](https://www.jetbrains.com/decompiler/) 

    
- Los enlaces para cualquier herramienta están disponibles en GitHub, dentro de la sección **‘Tools’**.
    

---

### Pasos a seguir:

1. **Alvas Audio** es una herramienta de edición y grabación de audio basada en .NET.
    
2. Tras descargar la carpeta de código fuente del laboratorio, navega a: `Alvas.Audio\Alvas.Audio\bin`.
    
3. Ejecuta **AudioCS**.
    
    - Explora un poco el programa, simplemente para observar sus capacidades básicas.
        
4. Ejecuta **JetBrains dotPeek**.
    
5. Nuestro objetivo es cargar **AudioCS** para examinarlo.
    
    - Dirígete a **File > Open >** (Archivo > Abrir).
        
6. Navega hasta la ruta `\Alvas.Audio\Alvas.Audio\bin\AudioCS.exe`.
    
7. Una vez importado, puedes navegar a través del proyecto; todo el código se encuentra ubicado en: **AudioCS > AudioCS > Mainform**.
    
8. Dedica unos minutos a explorar el código fuente. Observa cómo **todo el código** (manejadores de la interfaz gráfica, lógica de la aplicación, absolutamente todo) ha sido recuperado por el descompilador.
    
9. Dado que nuestro objetivo final es la ingeniería inversa, no exploraremos Visual Studio en esta clase; sin embargo, en este punto del proceso, el código fuente recuperado podría volcarse directamente en Visual Studio y recompilarse de nuevo para obtener el programa original, o bien fragmentarse, modificarse, extraerse o reutilizarse de cualquier forma que consideremos conveniente.


---

# Prueba

- Se logra visualizar el código en su totalidad.

![[JetBrains_dotPeek.png]]

