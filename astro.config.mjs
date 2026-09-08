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
  // Mapa de redirecciones de URLs viejas → nuevas. OJO: en este sitio
  // (output estático, sin adaptador de servidor) esto NO genera un 301 real
  // — Astro solo puede emitir una página HTML con <meta http-equiv="refresh">
  // cuando no hay servidor. El 301 de verdad para SEO viene del archivo
  // public/_redirects (formato Cloudflare Pages), que se resuelve en el
  // edge antes de tocar cualquier archivo. Esto de aquí es respaldo para
  // que las rutas también funcionen en `astro dev`/`astro preview`.
  redirects: {
    '/tour/islas-marietas-tour': '/tours/islas-marietas-todo-incluido',
    '/tour/yelapa': '/tours/yelapa-majahuitas',
    '/tour/razers': '/tours/atv-rzr-ruta-cuale',
    '/tour/ballenas-avistamiento': '/tours/avistamiento-ballenas',
    // Corregido: la ruta real del artículo es "...-puerto-vallarta" (el
    // slug que se usó al crear la guía), no "/guia/actividades/el-malecon"
    // como venía en el mapa original — esa apuntaba a un 404.
    '/destino/mexico/vallarta/malecon': '/guia/actividades/el-malecon-puerto-vallarta',
  },
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