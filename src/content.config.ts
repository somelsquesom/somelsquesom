import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    llocs: z.string().optional(),
    temporada: z.string(),
    estrena: z.coerce.date(),
    estrenaText: z.string().optional(),
    resum: z.string().optional(),
    autoria: z.string().optional(),
    direccio: z.string().optional(),
    durada: z.string().optional(),
    public: z.string().optional(),
    format: z.string().optional(),
    foto: z.string().optional(),
    galeria: z.array(z.string()).default([]),
    trailer: z.string().optional(),
    videos: z.array(z.object({ titol: z.string().optional(), enllac: z.string(), imatge: z.string().optional() })).default([]),
    entrades: z.string().optional(),
    entradesInfo: z.string().optional(),
    dossier: z.string().optional(),
    rider: z.string().optional(),
    cartell: z.string().optional(),
    flyer: z.string().optional(),
    fotosPremsa: z.string().optional(),
    fitxaArtistica: z.array(z.object({ rol: z.string(), nom: z.string() })).default([]),
    fitxaTecnica: z.array(z.object({ concepte: z.string(), valor: z.string() })).default([]),
    funcions: z
      .array(z.object({ data: z.string(), espai: z.string().optional(), poblacio: z.string().optional(), nota: z.string().optional(), entrades: z.string().optional(), adreca: z.string().optional() }))
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
    entradeta: z.string().optional(),
    foto: z.string().optional(),
    peuFoto: z.string().optional(),
    galeria: z.array(z.string()).default([]),
    videos: z.array(z.object({ titol: z.string().optional(), enllac: z.string(), imatge: z.string().optional() })).default([]),
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
    dataText: z.string().optional(),
    tipus: z.enum(['Article', 'Entrevista', 'Àudio', 'Vídeo']).default('Article'),
    enllac: z.string().optional(),
  }),
});

// Pàgines lliures (p. ex. «Escola de teatre», «Col·laboradors»...).
const pagines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pagines' }),
  schema: z.object({
    titol: z.string(),
    titolGran: z.string().optional(),
    etiqueta: z.string().optional(),
    entradeta: z.string().optional(),
    foto: z.string().optional(),
    galeria: z.array(z.string()).default([]),
    boto: z.object({ text: z.string().optional(), enllac: z.string().optional() }).optional(),
    esborrany: z.boolean().default(false),
  }),
});

export const collections = { obres, noticies, premsa, pagines };
