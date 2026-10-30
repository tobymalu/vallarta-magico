// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

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
  // trailingSlash: se probó "always" explícito y se revirtió — en el
  // servidor de "astro dev" (no en el build final) hace que CUALQUIER
  // link interno del sitio sin barra final (nav, tarjetas de tours,
  // breadcrumbs, etc. — son la mayoría) devuelva 404 en vez de redirigir.
  // No hacía falta de todos modos: el build estático ya genera cada
  // ruta como <ruta>/index.html consistentemente (verificado comparando
  // el <link rel="canonical"> de varias páginas), así que no hay
  // duplicados reales que corregir — el default "ignore" de Astro ya
  // resuelve ambas formas sin problema en dev.
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
  // Por qué este sitio NO sirve AVIF (aunque es la recomendación típica
  // de PageSpeed): se midió en este proyecto — con el "effort" por
  // defecto de sharp, los AVIF salían 26-60% MÁS PESADOS que el WebP
  // equivalente para las fotos reales del sitio (confirmado en varias
  // imágenes, no un caso aislado). Se probó subir el effort al máximo
  // (9) para forzar mejor compresión: el tamaño del AVIF no cambió NADA,
  // pero cada imagen tardó 15-35 segundos en codificarse (vs. ~1s en
  // default) — el build completo hubiera tardado ~15 minutos en vez de
  // ~1. AVIF generalmente le gana a WebP en ilustraciones/gráficos, pero
  // no siempre en fotografía — que es prácticamente todo el contenido de
  // este sitio. Por eso <Picture> solo pide formats={["webp"]}.
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
  // Fuentes: antes se pedían a fonts.googleapis.com/fonts.gstatic.com en
  // cada visita (2 dominios + 1 request de CSS + requests de woff2 =
  // la cadena de solicitudes críticas que marcaba PageSpeed). La Fonts
  // API de Astro (estable desde 6.0, usamos 7.2) descarga los woff2 en
  // build time y los sirve desde el propio dominio — cero requests a
  // Google en runtime. Solo se piden los pesos/estilos/subset que el
  // sitio usa de verdad (revisado en el CSS/Tailwind):
  // - Fraunces: solo se usa normal (nunca italic) en pesos 400
  //   (encabezados, sin utilidad de peso) y 600 (un solo badge en
  //   HotelCard.astro) — "400 600" pide el rango variable completo.
  // - Inter: normal en 400/500/600 (nunca 700 — ni siquiera el <strong>
  //   del plugin de @tailwindcss/typography pasa de 600).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-serif', 'Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  build: {
    // CSS pequeño (ej. el <style> con scope de SocialLinks.astro) va
    // inline en el HTML en vez de ser su propio request bloqueante.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});