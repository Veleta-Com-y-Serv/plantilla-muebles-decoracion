# Muebles y decoración: brief de diseño

Plantilla `muebles-decoracion` creada el 10/11/2026 a partir de `arquitectura-interiorismo` con `php artisan plantillas:nueva`
y rediseñada entera con el tema **Studio** de la skill Hallmark (género editorial). De la base solo queda la estructura técnica.
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: tiendas de muebles, decoración y descanso con exposición propia (sectores `muebles`, `decoracion`,
  `descanso`, `cocinas`, `mueble-exterior`): salones, sofás, dormitorios y juveniles, colchones, cocinas, exterior,
  iluminación, textil y cortinas, con medición, proyecto con plano o 3D, transporte, montaje y financiación. Su cliente
  quiere ver ambientes en grande, saber qué estilos trabajan y qué se hace a medida, qué servicios dan, dónde está la
  exposición y cuándo abre. No es un estudio de interiorismo (para eso, `arquitectura-interiorismo`) ni una tienda con carrito.
- **Qué tiene que conseguir la web**: que **vengan a la exposición** y que **pidan cita o presupuesto**. «Pide cita» en la
  cabecera y en la portada; en móvil, barra fija con «Llamar» y «Pedir cita» (WhatsApp o el formulario).
- **Tono**: exacto, tranquilo, de oficio: el mueble medido antes de llegar a casa. Sí: la hoja de pruebas de un estudio, con
  sus marcas de corte y sus cotas. No: el catálogo de grandes almacenes con banners de rebajas ni la plantilla crema y
  terracota de cualquier generador.

## Tema Hallmark y cómo se ha traducido

Studio (`references/themes/studio.md`): papel blanco frío con retícula de puntos y grano, tinta azul casi negra, Hedvig Letters
Serif en titulares sobre Geist, marcas de corte en cada pieza impresa, guías naranjas de construcción, fotos en color natural y
una sola señal naranja.

- **Cuatro colores** → `fondo` = papel (`#f1f7f8`, el oklch 97 % / 215 del tema), `texto` = tinta (`#111c28`), `acento` =
  naranja cadmio (`#e97219`: el botón, las guías, el foco), `primario` = banda de tinta (`#162434`: el proyecto).
- **Derivados** (`src/styles/global.css`): `--papel-2` (bandas claras), `--papel-3` (fondo de fotos al cargar), `--papel-hi`
  (hojas), `--tinta-2`, `--apagado` (etiquetas, AA sobre papel y papel-2), `--filete`, `--punto` (retícula), `--marca` (marcas
  de corte), `--foco` (el naranja oscurecido hasta L 0,52 para el anillo de foco), `--sobre-primario` y `--sobre-acento` (texto
  claro u oscuro según el color del cliente). Probado con primario granate, acento azul y papel crema: el botón azul pasa a
  texto claro, la banda granate lleva texto claro, guías y foco en azul. Legible.
- **Material**: la hoja de pruebas (`.prueba`: retícula de 24 px y grano `feTurbulence`) solo en la cabecera, la portada y el
  pie, con máscara para que se apague antes de la sección siguiente; marcas de corte (`.crop`: ocho trazos de 1 px fuera de las
  esquinas) en cada foto con margen, en las hojas y en los botones, que se abren un poco al pasar; hojas de papel claro con la
  única sombra de la página (`.hoja`: estilos, formulario, datos de la ficha); filete de tinta de 1 px abriendo cada conjunto y
  filetes claros entre filas; radio 3 px (2 px en controles); botones impresos con filete interior a 2 px. El naranja solo
  rellena el botón; todo lo demás naranja son líneas finas de construcción. Movimiento quieto: solo el subrayado del menú, las
  marcas de los botones y el signo de las preguntas.
- **Firma**: el titular medido. Las guías naranjas del `h1` de la portada, del `404` y del nombre en el pie van en la altura de
  mayúsculas, la altura de la x y la línea base **reales** de Hedvig Letters Serif (medidas con el navegador: ascendente
  1,02 em, descendente 0,32 em, mayúsculas 0,703 em, x 0,531 em; con interlineado 1,02 quedan a 0,157, 0,329 y 0,86 em de cada
  línea), así que siguen a cada línea aunque el titular se parta. Y el proyecto como una cota de plano: una línea de
  construcción con una marca por paso y la duración leída sobre ella.

## Tipografías y licencias

Hedvig Letters Serif 400 (Kristian Möller) y Geist 400 y 500 (Vercel), las dos **OFL-1.1** (comprobado en la API de Fontsource),
woff2 `latin` de Fontsource en `public/fuentes/` (48 KB en total), `font-display: swap`, respaldo del sistema de la misma clase y
`preload` solo de Hedvig. La cara de muestra del tema (Sofia Sans Extra Condensed) no se usa: solo vale dentro de un espécimen y
esta web no tiene ninguno.

Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`. En Hedvig una palabra de 20 letras
(«Impermeabilizaciones») mide 9,74 em con el seguimiento del tema: el `h1` es `clamp(1.8rem, .4rem + 7.4vw, 5.25rem)` en móvil
(34 px a 375) y `min(5.25rem, 10cqi)` en escritorio dentro de su columna de 7/12; los `h2` llevan `min(…, 9.6cqi)` para caber
también en las columnas estrechas (preguntas, opiniones); el nombre del pie, `min(9rem, 9.6cqi)`.

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| — | cabecera | hoja de pruebas | nombre, menú y el botón impreso, fija y siempre sólida (z-index 50) |
| 1 | `hero` | hoja de pruebas | Ledge: folio bajo filete de tinta, foto muy ancha con marcas de corte, titular medido abajo a la izquierda y frase con botones a la derecha |
| 2 | `muebles` | papel | filas de 2 (7/5, 5/7) y de 3 fotos con marcas de corte; uno suelto a todo el ancho; los sin foto, en filas |
| 3 | `estilos` | clara | hojas de muestra (Range del tema: «sistemas como hojas de muestra») |
| 4 | `exposicion` | papel | foto a sangre y el directorio por plantas con el horario en tabla |
| 5 | `servicios` | clara | filas a todo el ancho: nombre, qué incluye, condición |
| 6 | `proyecto` | tinta | la cota de plano (firma) |
| 7 | `ambientes` | papel | escaparate: una foto 21:9 y dos debajo (7/5) |
| 8 | `opiniones` | clara | la primera como frase grande |
| 9 | `preguntas` | papel | titular fijo y filas `details` |
| 10 | `contacto` | clara | vías grandes y el formulario sobre una hoja |
| — | pie | hoja de pruebas | el nombre como mástil con sus guías, cuatro columnas, barra móvil |

Se alternan bandas guiadas por foto (portada, muebles, exposición, ambientes) con bandas que solo hace el material (hojas de
muestra, filas con filetes, la cota en la banda de tinta, la hoja del formulario).

## Listas propias y páginas

- `muebles.muebles` {nombre, texto, precio, imagen, imagenes, detalle}, `estilos.estilos` {nombre, texto, materiales, medida},
  `exposicion.plantas` {nombre, texto}, `exposicion.horario` {dia, horas}, `servicios.items` {titulo, texto, precio},
  `proyecto.items` {titulo, texto, duracion}, `ambientes.galeria` (rutas) con `ambientes.pies`.
- `ambientes` usa `galeria` (y no una lista de objetos) para que una web nueva salga con las fotos de ejemplo y el paso «Tus
  fotos» del asistente las pueda cambiar; los pies van en una cadena con «;».
- Fichas: cada tipo de mueble con `detalle` tiene su página en `/muebles/<slug>/` (`Product`, con `AggregateOffer` si el precio
  es «desde N €»). Sin zonas: es una tienda a la que se viene.
- Varias páginas recomendadas: Muebles (muebles, estilos), Servicios (servicios, proyecto), Visítanos (exposición, preguntas,
  contacto). Inicio se queda con la portada, los ambientes y las opiniones.

## Fotos

11 fotos generadas con IA a partir de `fotos.json` (salón de portada, salón comedor de nogal, zona de sofás, dormitorio, juvenil,
zona de descanso con colchones, cocina verde salvia, la exposición de dos plantas, comedor de roble, rincón de lectura con
cortinas, terraza). Sin texto, sin logotipos, sin caras (en la exposición, dos personas lejos y de espaldas). La herramienta
devuelve 1024×1024 (dos vinieron con bandas blancas, recortadas): se recortan al aspecto y se amplían ×1,33-1,5 (la portada a
1536 px), así que la portada a pantalla completa no está del todo nítida; por eso va dentro del contenedor con marcas de corte y
no a sangre. Conviene que el cliente ponga las suyas. Se repitieron dos: la primera portada salía vacía y los colchones tenían
un bordado con letras.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como etiqueta de folio en Geist, caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` lleva ejemplos ficticios en el `site.yaml` de muestra (Hallmark prohíbe inventarlos); la plataforma deja la
  sección desmarcada y vacía al crear una web.
- Los `items` de la portada la plataforma los trata como cifras: por eso no van en el paso «negocio» del guion.
- El tema pide «readouts» junto a las guías; aquí no van, porque el titular lo escribe el cliente y una etiqueta fija podría
  pisarlo. Las guías sí son las medidas reales.
- Hallmark pide fotos como mucho en un tercio de la página y nunca dos secciones de foto seguidas; Roberto quiere fotos
  grandes, así que hay cuatro bandas de foto, siempre separadas por una del material.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea) y `comun.css`
  (común a todas las plantillas) trae colores literales y etiquetas en mayúsculas que aquí se anulan. `sloplint` da esos FAIL y
  el aviso de palabras (más de 450: catálogo, servicios, horario y preguntas son contenido que el cliente necesita).
