import type { CollectionEntry } from 'astro:content';
import altres from '../data/altres-actuacions.json';
import web from '../data/web.json';

// Nombre de representacions d'una obra: el que diu el camp, o si no, les funcions apuntades.
export const repDe = (o: CollectionEntry<'obres'>) => o.data.representacions ?? o.data.funcions.length;

export const formatData = (d: Date) =>
  d.toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '.');

export const formatMesAny = (d: Date) => d.toLocaleDateString('ca-ES', { month: 'long', year: 'numeric' });

export const perEstrena = (a: CollectionEntry<'obres'>, b: CollectionEntry<'obres'>) =>
  b.data.estrena.getTime() - a.data.estrena.getTime();

export const perData = <T extends { data: { data: Date } }>(a: T, b: T) => b.data.data.getTime() - a.data.data.getTime();

// «de» o «d'» segons si el nom comença per vocal o h (d'Àngel, de David)
export const de = (nom: string) => (/^[aeiouàáèéíïòóúüh]/i.test(nom.trim()) ? `d'${nom}` : `de ${nom}`);

// Converteix un enllaç de YouTube o Vimeo en un enllaç per incrustar.
export function embedVideo(url?: string): string | undefined {
  if (!url) return undefined;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return undefined;
}

// Xifres de la companyia: obres i també les altres actuacions (lectures, performances, contes...).
export function xifres(obres: CollectionEntry<'obres'>[]) {
  const actuacions = altres.actuacions ?? [];
  const poblacions = new Set<string>();
  for (const o of obres) {
    o.data.poblacions.forEach((p) => p.trim() && poblacions.add(p.trim()));
    o.data.funcions.forEach((f) => f.poblacio?.trim() && poblacions.add(f.poblacio.trim()));
  }
  actuacions.forEach((a) => (a.poblacions ?? []).forEach((p: string) => p.trim() && poblacions.add(p.trim())));
  return {
    anys: new Date().getFullYear() - Number(web.anyInici),
    obres: obres.filter((o) => !o.data.secundaria).length,
    representacions: obres.reduce((n, o) => n + repDe(o), 0) + actuacions.reduce((n, a) => n + (Number(a.representacions) || 0), 0),
    poblacions: poblacions.size,
  };
}

// Valors que es poden fer servir dins dels textos del gestor amb claus: {nom}, {poblacio}, {obres}...
export function variables(extra: Record<string, string | number> = {}, obres?: CollectionEntry<'obres'>[]) {
  const x = obres ? xifres(obres) : { anys: '', obres: '', representacions: '', poblacions: '' };
  return {
    nom: web.nom,
    poblacio: web.poblacio,
    anyInici: web.anyInici,
    presentacio: web.presentacio,
    email: web.email,
    telefon: web.telefon,
    ...x,
    ...extra,
  } as Record<string, string | number>;
}

// Omple les {claus} d'un text.
export const omple = (text: string | undefined, vars: Record<string, string | number> = {}) =>
  (text ?? '').replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

// Text del gestor a HTML segur: *això* surt en cursiva i els salts de línia es respecten.
export function rich(text: string | undefined, vars: Record<string, string | number> = {}) {
  return omple(text, vars)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}
