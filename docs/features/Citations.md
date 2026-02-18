---
title: Citations
tags:
  - feature/transformer
---

Quartz utiliza [rehype-citation](https://github.com/timlrx/rehype-citation) para permitir el análisis de un archivo bibliográfico en formato BibTeX.

Con la configuración predeterminada, una clave de citación como `[@templeton2024scaling]` se exportará como `(Templeton et al., 2024)`.

> [!example]- Archivo BibTeX
> 
> ```bib
> @article{templeton2024scaling,
>   title={Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet},
>   author={Templeton, Adly and Conerly, Tom and Marcus, Jonathan and Lindsey, Jack and Bricken, Trenton and Chen, Brian and Pearce, Adam and Citro, Craig and Ameisen, Emmanuel and Jones, Andy and Cunningham, Hoagy and Turner, Nicholas L and McDougall, Callum and MacDiarmid, Monte and Freeman, C. Daniel and Sumers, Theodore R. and Rees, Edward and Batson, Joshua and Jermyn, Adam and Carter, Shan and Olah, Chris and Henighan, Tom},
>   year={2024},
>   journal={Transformer Circuits Thread},
>   url={https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html}
> }
> ```

> [!note] Comportamiento de las referencias
> 
> De forma predeterminada, las referencias se incluyen al final del archivo. Para controlar dónde se insertan las referencias, utiliza `[^ref]`.
> 
> Consulta la documentación de `rehype-citation` para más información.

---

## Personalización

El análisis de citaciones es una funcionalidad del plugin [[plugins/Citations|Citation]]. **Este plugin no está habilitado por defecto**. Consulta la página del plugin para conocer las opciones de personalización disponibles.