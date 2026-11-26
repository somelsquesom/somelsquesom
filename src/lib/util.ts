import type { CollectionEntry } from 'astro:content';
import altres from '../data/altres-actuacions.json';

// Nombre de representacions d'una obra: el que diu el camp, o si no, les funcions apuntades.
export const repDe = (o: CollectionEntry<'obres'>) => o.data.representacions ?? o.data.funcions.length;

export const formatData = (d: Date) =>
  d.toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '.');

export const formatMesAny = (d: Date) => d.toLocaleDateString('ca-ES', { month: 'long', year: 'numeric' });

export const perEstrena = (a: CollectionEntry<'obres'>, b: CollectionEntry<'obres'>) =>
  b.data.estrena.getTime() - a.data.estrena.getTime();

export const perData = <T extends { data: { data: Date } }>(a: T, b: T) => b.data.data.getTime() - a.data.data.getTime();

// Converteix un enllaç de YouTube o Vimeo en un enllaç per incrustar.
export function embedVideo(url?: string): string | undefined {
  if (!url) return undefined;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return undefined;
}

// Xifres de la companyia calculades a partir de les obres.
// Compta les obres i també les altres actuacions (lectures, performances, contes...).
export function xifres(obres: CollectionEntry<'obres'>[], anyInici: string) {
  const actuacions = altres.actuacions ?? [];
  const poblacions = new Set<string>();
  for (const o of obres) {
    o.data.poblacions.forEach((p) => p.trim() && poblacions.add(p.trim()));
    o.data.funcions.forEach((f) => f.poblacio?.trim() && poblacions.add(f.poblacio.trim()));
  }
  actuacions.forEach((a) => (a.poblacions ?? []).forEach((p: string) => p.trim() && poblacions.add(p.trim())));
  return {
    anys: new Date().getFullYear() - Number(anyInici),
    obres: obres.length,
    funcions: obres.reduce((n, o) => n + repDe(o), 0) + actuacions.reduce((n, a) => n + (Number(a.representacions) || 0), 0),
    poblacions: poblacions.size,
  };
}
