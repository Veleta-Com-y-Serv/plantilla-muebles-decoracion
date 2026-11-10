# Plantilla «Muebles y decoración» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **studio** (tema
Studio de la skill Hallmark: hoja de pruebas de papel blanco frío, tinta azul casi negra, marcas de corte, guías naranjas
de construcción, una señal naranja). Todo en castellano de España, frases cortas, sin jerga, de tú. Brief de diseño
completo en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (fondo = papel, texto = tinta, acento = naranja del botón, de las guías y del foco, primario = la banda de tinta del proyecto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los demás tonos (`--papel-2`, `--papel-3`, `--papel-hi`, `--tinta-2`, `--apagado`, `--filete`, `--punto`, `--marca`, `--foco`, `--sobre-primario`, `--sobre-acento`) se derivan en `src/styles/global.css` con `color-mix()` y `oklch(from …)`: el texto sobre primario y sobre acento se elige solo (claro u oscuro). No pongas colores literales en componentes.
- **Tipografías**: Hedvig Letters Serif 400 (titulares, cifras, precios y el nombre) y Geist 400/500 (texto, etiquetas y botones), alojadas en `public/fuentes/` (licencias en `public/fuentes/LICENCIAS.md`). No añadas fuentes ni servicios externos. Nunca Hedvig en párrafos.
- **Aspecto general**: `src/styles/global.css`: la hoja de pruebas `.prueba` (retícula de puntos y grano; solo cabecera, portada, pie y páginas sueltas), marcas de corte `.crop` / `.crop--hoja` (también en `.btn` y `.btn-sec`), hoja de papel con la única sombra `.hoja`, guías de construcción `.guias` (medidas reales de Hedvig: no cambies `--g-*` si no cambias la fuente o el interlineado), bandas `.banda--papel|clara|tinta`, cabeza de sección con filete de tinta `.cabeza`, etiquetas `.menuda`, botón impreso naranja `.btn` y con filete `.btn-sec`, foto `.foto`, mitades a sangre `.mitades`. Radio 3 px (2 px en controles). El naranja solo rellena el botón; en todo lo demás son líneas finas.
- **Bandas**: `src/components/ui/Banda.astro` pinta una sección de borde a borde con el contenido en `.contenedor` (90 rem, 16 px de margen en móvil). Una sola banda de tinta por página (el proyecto).
- **Imágenes**: fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` muestra `/placeholders/<mismo nombre>.svg`. En `site.yaml`, ruta absoluta (`/fotos/salon.jpg`). Personas: siempre `/placeholders/persona.svg`, nunca caras generadas. Color natural, sin filtros.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en Hedvig Letters Serif.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis). En móvil, barra fija abajo con «Llamar» y «Pedir cita» (WhatsApp o, sin él, el contacto).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → portada «Ledge»: folio con el antetítulo y la dirección bajo un filete de tinta, la foto muy ancha con marcas de corte y `pie_foto`, y abajo el titular con guías a la izquierda y la frase con los dos botones a la derecha; `items` como datos cortos. En móvil todo en una columna.
- `muebles` → `muebles` con foto en filas de dos (7 y 5 columnas) y de tres (4, 4 y 4); uno suelto al final, a todo el ancho; los que no tienen foto, en filas con filetes. Nombre, precio de partida y una línea; los que tienen `detalle` enlazan a su página.
- `estilos` → banda clara con los `estilos` como hojas de muestra (nombre grande, línea, «Materiales» y «A medida») y `nota`.
- `exposicion` → foto a sangre a la izquierda y, a la derecha, titular, dirección, `plantas` como directorio, `horario` en tabla y botones (`cta` y «Cómo llegar»).
- `servicios` → banda clara con los `items` en filas a todo el ancho: nombre, qué incluye y condición o precio a la derecha.
- `proyecto` → banda de tinta con los `items` como una cota de plano (línea naranja, marcas, `duracion` leída sobre la línea, número, paso y línea). En móvil, en vertical.
- `ambientes` → escaparate: la primera foto de `galeria` a todo el ancho (21:9) y las demás de dos en dos, con su pie de `pies`.
- `opiniones` → la primera opinión como frase grande, las demás en columnas.
- `preguntas` → titular fijo a la izquierda y filas `details/summary`.
- `contacto` → vías grandes (teléfono, WhatsApp, email, dirección) y el formulario sobre una hoja con marcas de corte.
- `texto` → apartado genérico (`tipo: texto`), con foto a sangre si lleva `imagen`.

## Campos propios de esta plantilla (además del esquema común)
- `hero`: `cta` y `cta_secundario` (sin `cta` el botón llama; sin `cta_secundario`, «Cómo llegar»); `pie_foto` (una frase bajo la foto); `items` = datos cortos (solo `titulo`).
- `muebles.muebles` [{nombre, texto, precio, imagen, imagenes, detalle}]: `precio` SIEMPRE como cadena («desde 690 €», «Consultar»); vacío = sin precio. Sin `imagen`, sale en las filas de abajo. `detalle` da página propia.
- `estilos.estilos` [{nombre, texto, materiales, medida}]: `materiales` y `medida` en texto libre («Roble, fresno y lino», «Medidas y telas a elegir»). `estilos.nota`: una línea bajo las hojas.
- `exposicion`: `imagen`, `plantas` [{nombre, texto}] (planta o zona y qué hay), `horario` [{dia, horas}] (las horas que empiezan por «Cerrado» salen apagadas), `cta`.
- `servicios.items` [{titulo, texto, precio}]: `precio` es la condición o el precio como cadena («Gratis», «Incluido en la Ribera», «desde 30 €»).
- `proyecto.items` [{titulo, texto, duracion}]: `duracion` en texto libre («Una hora», «En una semana»); vacía = no sale.
- `ambientes`: `galeria` (rutas de fotos; 3 o 5 es lo que mejor queda) y `pies` (un pie por foto en el mismo orden, separados por «;»; lo que va tras la última coma sale a la derecha: «Comedor de roble, planta baja»).
- `opiniones.testimonios` [{texto, autor, nota}]: `nota` opcional (de dónde viene). Sin estrellas ni notas.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`. La cabecera es siempre sólida y va por encima (z-index 50): no depende del orden.
3. **Cambiar textos, muebles, precios, horarios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Para varios datos, una cadena. Máximo 24 elementos por lista.
5. **Nunca inventes** precios, metros, cifras, plazos ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan). No uses marcas de fabricantes que el cliente no haya nombrado.
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, con bandas como `src/pages/aviso-legal.astro`; enlázala en `site.yaml → menu`.
7. **Apartado nuevo**: añade `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `muebles`, `servicios`, `ambientes`… (el diseño que quiera reutilizar). `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base, salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (solo hay el de la cabecera), bandas a todo el ancho, 16 px de margen lateral del texto, botones de 44 px de alto como mínimo, sin scroll horizontal en móvil, titulares sin palabras partidas (`overflow-wrap: normal`, `hyphens: manual`; el `h1` y los `h2` miden con `cqi` para que quepa una palabra de 20 letras). Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `muebles.muebles` → `/muebles/<slug>/`.
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (precio…) salen en la hoja de datos de la ficha.
- Una orden «añade una página para los sofás» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/muebles/`: salen solas de `src/pages/[coleccion]/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y producto con precio si lo hay).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "muebles; estilos" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada (`/muebles/`…); el menú se hace solo con las páginas (las entradas `/#…` de `menu` no salen) y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
