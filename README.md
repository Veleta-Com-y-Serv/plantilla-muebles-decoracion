# Plantilla NoExpertise · Muebles y decoración

Web para tiendas de muebles, decoración y descanso con exposición propia: los ambientes en fotos grandes, lo que venden por estancia, los estilos y lo que se hace a medida, la exposición por plantas con su horario, los servicios (medición, proyecto con plano y 3D, transporte y montaje, financiación) y pedir cita o presupuesto.

- Sectores: muebles, decoracion, descanso, cocinas, mueble-exterior. Estilo: studio (tema Studio de Hallmark). Plan mínimo: gratis. Orden 810.
- Secciones: hero, muebles, estilos, exposicion, servicios, proyecto, ambientes, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño a ancho completo sobre la «hoja de pruebas» de un estudio: papel blanco frío con retícula de puntos y grano en la cabecera, la portada y el pie; marcas de corte en cada foto, hoja y botón; el titular en Hedvig Letters Serif con guías naranjas de construcción en sus medidas reales; muebles en filas de dos y tres fotos; estilos como hojas de muestra; la exposición como directorio por plantas junto a una foto a sangre; servicios en filas; el proyecto como una cota de plano en la banda de tinta; escaparate de ambientes; pie con el nombre como mástil. Hedvig Letters Serif y Geist alojadas en `public/fuentes/` (OFL). Detalle en `DISEÑO.md`.
- Ejemplo: Casa Vadillo, tienda de muebles ficticia en Tudela (Navarra).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD (`FurnitureStore`) y preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Páginas propias: cada tipo de mueble con `detalle` tiene su página en `/muebles/<slug>/` (`fichas:` en `template.yaml`, espejo en `src/data/fichas.ts`).
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (Muebles, Servicios, Visítanos). Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente (13 pasos) en `template.yaml`; reglas para el agente en `CLAUDE.md`; fotos a generar en `fotos.json` (11).

## Campos propios

| Sección | Campos |
|---|---|
| `hero` | `cta`, `cta_secundario`, `pie_foto` (pie bajo la foto), `items` [{titulo}] (datos cortos bajo el titular) |
| `muebles` | `muebles` [{nombre, texto, precio, imagen, imagenes, detalle, slug}] |
| `estilos` | `estilos` [{nombre, texto, materiales, medida}], `nota` |
| `exposicion` | `imagen`, `plantas` [{nombre, texto}], `horario` [{dia, horas}], `cta` |
| `servicios` | `items` [{titulo, texto, precio}], `cta` |
| `proyecto` | `items` [{titulo, texto, duracion}], `cta` |
| `ambientes` | `galeria` [rutas], `pies` (un pie por foto, separados por «;») |
| `opiniones` | `testimonios` [{texto, autor, nota}] |
| `preguntas` | `preguntas` [{pregunta, respuesta}] |

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes con licencia SIL Open Font License 1.1 (`public/fuentes/LICENCIAS.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.

## Páginas propias

- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
