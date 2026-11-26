import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// El gestor desa els camps buits com a text buit (''): els tractem com si no hi fossin.
const opt = () => z.string().optional().transform((v) => (v && v.trim() ? v : undefined));

// Totes les obres de la companyia: les que estan en gira i les de l'arxiu.
const obres = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/obres' }),
  schema: z.object({
    titol: z.string(),
    estat: z.enum(['en-gira', 'arxiu']).default('arxiu'),
    grup: z.enum(['Companyia', 'Companyia Jove', 'Companyia Jove 2.0', 'Taller de teatre']).default('Companyia'),
    etiquetes: z.array(z.string()).default([]),
    textPropi: z.boolean().default(false),
    representacions: z.number().optional(),
    poblacions: z.array(z.string()).default([]),
    llocs: opt(),
    temporada: z.string(),
    estrena: z.coerce.date(),
    estrenaText: opt(),
    resum: opt(),
    autoria: opt(),
    direccio: opt(),
    durada: opt(),
    public: opt(),
    format: opt(),
    foto: opt(),
    galeria: z.array(z.string()).default([]),
    seccionsGaleria: z.array(z.object({ titol: z.string(), fotos: z.array(z.string()).default([]) })).default([]),
    trailer: opt(),
    videos: z.array(z.object({ titol: opt(), enllac: z.string(), imatge: opt() })).default([]),
    entrades: opt(),
    entradesInfo: opt(),
    dossier: opt(),
    rider: opt(),
    cartell: opt(),
    flyer: opt(),
    fotosPremsa: opt(),
    fitxaArtistica: z.array(z.object({ rol: z.string(), nom: z.string() })).default([]),
    fitxaTecnica: z.array(z.object({ concepte: z.string(), valor: z.string() })).default([]),
    funcions: z
      .array(z.object({ data: z.string(), espai: opt(), poblacio: opt(), nota: opt(), entrades: opt(), adreca: opt() }))
      .default([]),
    cites: z.array(z.object({ text: z.string(), autor: z.string() })).default([]),
    destacada: z.boolean().default(false),
    secundaria: z.boolean().default(false),
  }),
});

// Notícies i activitats (conta contes, extraescolars, sortides...).
const noticies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticies' }),
  schema: z.object({
    titol: z.string(),
    data: z.coerce.date(),
    entradeta: opt(),
    foto: opt(),
    peuFoto: opt(),
    galeria: z.array(z.string()).default([]),
    videos: z.array(z.object({ titol: opt(), enllac: z.string(), imatge: opt() })).default([]),
    destacada: z.boolean().default(false),
  }),
});

// Racó de premsa: on hem sortit.
const premsa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/premsa' }),
  schema: z.object({
    titol: z.string(),
    mitja: z.string(),
    data: z.coerce.date(),
    dataText: opt(),
    tipus: z.enum(['Article', 'Entrevista', 'Àudio', 'Vídeo']).default('Article'),
    enllac: opt(),
  }),
});

// Pàgines lliures (p. ex. «Escola de teatre», «Col·laboradors»...).
const pagines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pagines' }),
  schema: z.object({
    titol: z.string(),
    titolGran: opt(),
    etiqueta: opt(),
    entradeta: opt(),
    foto: opt(),
    galeria: z.array(z.string()).default([]),
    boto: z.object({ text: opt(), enllac: opt() }).optional(),
    esborrany: z.boolean().default(false),
  }),
});

export const collections = { obres, noticies, premsa, pagines };
