# Web de SOM ELS QUE SOM

La web de la companyia, feta amb [Astro](https://astro.build), allotjada gratis a Cloudflare i amb un gestor de continguts ([Sveltia CMS](https://github.com/sveltia/sveltia-cms), compatible amb Decap CMS) per afegir obres, notícies i premsa sense tocar codi.

## Què hi ha

| Pàgina | Adreça | D'on surt el contingut |
| --- | --- | --- |
| Inici | `/` | Obres, notícies i Dades de la web |
| La companyia | `/companyia` | Dades de la web + la història es fa sola amb les obres |
| En gira | `/en-gira` | Obres amb estat «En gira» |
| Temporades anteriors | `/arxiu` | Totes les obres, agrupades per temporada |
| Fitxa de cada obra | `/obres/nom-de-lobra` | Cada obra (tràiler, galeria, dossier, cartell, flyer, funcions…) |
| Notícies i premsa | `/noticies` | Notícies + Premsa |
| Contractació | `/contractacio` | Dades de la web + dossiers de les obres en gira |
| Gestor de continguts | `/admin` | — |

Les xifres (anys, obres, funcions, poblacions) es calculen soles a partir de les obres i les seves funcions.

Ja hi ha posades les 27 obres i les 29 actuacions més del registre (2009–2026, 121 representacions), tres notícies del blog antic i dues aparicions a la premsa. Les etiquetes (Comèdia, Nadal, Musical...) es poden posar a cada obra, i a Temporades anteriors es pot filtrar per etiqueta. Hi ha també una obra d'exemple en gira (`exemple-obra-en-gira`) perquè vegeu com queda: editeu-la o esborreu-la.

## Posar la web en marxa (un sol cop)

### 1. Pujar el codi a GitHub
1. Feu-vos un compte a [github.com](https://github.com) (millor un compte de la companyia).
2. Creeu un repositori nou que es digui `somelsquesom`.
3. Al repositori, «Add file → Upload files» i arrossegueu-hi **el contingut** d'aquesta carpeta (no la carpeta sencera). Confirmeu amb «Commit changes».

### 2. Publicar-la a Cloudflare (gratis)
1. Feu-vos un compte a [dash.cloudflare.com](https://dash.cloudflare.com).
2. Aneu a «Workers & Pages» → «Create» → «Pages» → «Connect to Git», i trieu el repositori `somelsquesom`.
3. Configuració de compilació:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. «Save and Deploy». En un parell de minuts la web serà a `https://somelsquesom.pages.dev` (o el nom que us deixi triar).

Cada cop que es canvia alguna cosa al repositori (també des del gestor), Cloudflare torna a publicar la web sola.

> Si al tauler de Cloudflare només us ofereix «Workers», trieu «Import a repository»: Astro també hi funciona i el pla gratuït és el mateix.

### 3. Entrar al gestor de continguts
1. Aneu a `https://la-vostra-web/admin`.
2. La manera més fàcil: «Sign in with token». A GitHub, aneu a Settings → Developer settings → Personal access tokens → **Fine-grained tokens**, creeu-ne un només per al repositori `somelsquesom` amb permís **Contents: Read and write**, i enganxeu-lo al gestor.
3. Si hi ha de poder entrar més gent amb el botó «Login with GitHub», cal posar l'autenticador de Sveltia a Cloudflare Workers ([instruccions](https://github.com/sveltia/sveltia-cms-auth)) i descomentar `base_url` a `public/admin/config.yml`. Cada persona necessita un compte de GitHub afegit com a col·laboradora del repositori.

### 4. Domini propi (quan vulgueu)
1. Compreu el domini (per exemple `somelsquesom.cat`) en qualsevol registrador.
2. A Cloudflare: el vostre projecte → «Custom domains» → «Set up a custom domain», i seguiu els passos.
3. Canvieu l'adreça a `astro.config.mjs` (`site`) i a `public/admin/config.yml` (`site_url`).

## Afegir contingut (cada dia)

Tot es fa des de `/admin`:

- **Obres**: una fitxa per obra, amb les seves etiquetes. Marqueu «En gira» les que es poden contractar; quan deixin de girar, passeu-les a «Arxiu» i aniran soles a Temporades anteriors. Hi podeu pujar el dossier, el rider, el cartell, el flyer, les fotos i l'enllaç de YouTube del tràiler.
- **Notícies**: conta contes, extraescolars, sortides, bolos… Les categories les podem afegir més endavant.
- **Premsa**: cada article, entrevista o vídeo on heu sortit.
- **Dades de la web**: textos de la companyia, contacte, Instagram, TikTok, fotos de portada i de grup.

## El formulari de contractació

Ara mateix, en enviar-lo s'obre el programa de correu de qui l'omple, adreçat a la companyia. Si voleu que arribi sense passar pel correu de l'altre, feu-vos un formulari en un servei com Formspree (consulteu-ne les condicions del pla gratuït) i enganxeu-ne l'adreça a «Dades de la web → Adreça del formulari».

## Provar-la a l'ordinador (opcional)

Cal tenir [Node.js](https://nodejs.org) 20 o més nou.

```
npm install
npm run dev
```

I obriu `http://localhost:4321`.

## On és cada cosa

```
src/content/obres/      una fitxa .md per obra
src/content/noticies/   una notícia .md per fitxer
src/content/premsa/     una aparició a la premsa per fitxer
src/data/web.json       textos i dades de contacte
src/pages/              les plantilles de cada pàgina
src/styles/global.css   colors, lletres i estil «Galeria blanca»
public/uploads/         fotos i PDFs que es pugen des del gestor
public/admin/           el gestor de continguts
```
