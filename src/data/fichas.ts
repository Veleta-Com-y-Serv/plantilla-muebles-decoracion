// Páginas propias de esta plantilla (NoExpertise): espejo de `fichas:` y `zonas:` de template.yaml.
// Cada tipo de mueble con `detalle` tiene su página en /muebles/<slug>/ (src/pages/[coleccion]/[slug].astro). Sin zonas.
import type { DefFicha, DefZonas } from '../lib/paginas';

export const FICHAS: DefFicha[] = [
  { lista: 'muebles', campo: 'muebles', ruta: 'muebles', nombre: 'Tipo de mueble', tipo: 'Product' },
];

export const ZONAS: DefZonas | null = null;
