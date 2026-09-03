// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // "site" es obligatorio para que @astrojs/sitemap (y los <link
  // rel="canonical"> de Layout.astro) generen URLs absolutas reales en
  // vez de relativas — debe ser la URL de producción, la misma que
  // SITE.url en src/lib/site.ts.
  site: 'https://vallartamagico.com',
  integrations: [
    // mdx(): la colección "guia" usa .mdx para poder inyectar
    // componentes (ej. CalloutTour) dentro del cuerpo del artículo, algo
    // que un .md plano no permite.
    mdx(),
    // sitemap(): genera /sitemap-index.xml + /sitemap-0.xml en cada
    // build a partir de todas las páginas estáticas — public/robots.txt
    // apunta ahí para que Google las descubra.
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});