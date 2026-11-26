import { defineConfig } from 'astro/config';

// Quan tingueu el domini propi, canvieu aquesta adreça (per exemple https://somelsquesom.cat)
export default defineConfig({
  site: 'https://somelsquesom.pages.dev',
  trailingSlash: 'ignore',
});
