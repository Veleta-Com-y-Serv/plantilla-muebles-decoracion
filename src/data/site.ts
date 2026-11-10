// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico (`items`): servicios (con `precio`), pasos del proyecto (con `duracion`), datos de la portada. */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; precio?: string; duracion?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (de dónde viene: «Google»…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Tipo de mueble (muebles.muebles). Con `detalle`, tiene página propia en /muebles/<slug>/. `precio` siempre como cadena. */
export interface Mueble { nombre: string; texto: string; precio: string; imagen: string; [campo: string]: unknown }
/** Estilo que trabaja la tienda (estilos.estilos): una hoja de muestra. */
export interface Estilo { nombre: string; texto: string; materiales: string; medida: string }
/** Planta de la exposición (exposicion.plantas): qué hay en cada una. */
export interface Planta { nombre: string; texto: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace | null;
  cta_secundario?: Enlace | null;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  /** muebles */
  muebles: Mueble[];
  /** estilos */
  estilos: Estilo[];
  nota?: string;
  /** exposicion */
  plantas: Planta[];
  /** ambientes: un pie por foto de `galeria`, separados por «;» */
  pies?: string;
  /** hero */
  pie_foto?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
export function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
const enlaceDe = (v: unknown): Enlace | null => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : null;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    nota: texto(s.nota),
    pie_foto: texto(s.pie_foto),
    cta: enlaceDe(s.cta),
    cta_secundario: enlaceDe(s.cta_secundario),
    items: lista<Crudo>(s.items)
      .filter((i) => texto(i.titulo) || texto(i.texto))
      .map((i) => ({ ...i, titulo: texto(i.titulo), texto: texto(i.texto), precio: texto(i.precio), duracion: texto(i.duracion), imagen: texto(i.imagen) })),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)).map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).filter((h) => texto(h.dia) || texto(h.horas)).map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Crudo>(s.preguntas).filter((p) => texto(p.pregunta)).map((p) => ({ pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })),
    // Los muebles conservan el objeto original: src/lib/paginas.ts los reconoce por identidad (enlaceDe).
    muebles: lista<Crudo>(s.muebles).filter((m) => texto(m.nombre)) as Mueble[],
    estilos: lista<Crudo>(s.estilos)
      .filter((e) => texto(e.nombre))
      .map((e) => ({ nombre: texto(e.nombre), texto: texto(e.texto), materiales: texto(e.materiales), medida: texto(e.medida) })),
    plantas: lista<Crudo>(s.plantas)
      .filter((p) => texto(p.nombre) || texto(p.texto))
      .map((p) => ({ nombre: texto(p.nombre), texto: texto(p.texto) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi tienda de muebles',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#162434', acento: '#e97219', fondo: '#f1f7f8', texto: '#111c28', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'FurnitureStore',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** ¿El enlace sale de la web? (abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** Atributos de un enlace que sale de la web (otra pestaña); vacío si es interno. */
export const fuera = (u?: string) => (externo(u) ? { rel: 'noopener', target: '_blank' } : {});
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
