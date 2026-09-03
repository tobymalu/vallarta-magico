import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Objeto SEO compartido por las 3 colecciones.
// noindex por defecto en false: solo lo activamos manualmente en páginas
// que no queremos que Google indexe (ej. borradores, páginas de prueba).
const seoSchema = z.object({
  meta_title: z.string(),
  meta_description: z.string(),
  canonical: z.string().url().optional(),
  og_image: z.string().optional(),
  noindex: z.boolean().default(false),
});

// tours: páginas transaccionales — lo que se vende directamente.
// El schema quedó más rico que la primera versión porque ya trabajamos
// el copy real del primer tour (Islas Marietas) y necesita: precios por
// nivel (adulto/menor/infante), itinerario, incluye/no incluye, FAQ y
// restricciones — no solo un precio único y una descripción.
const tours = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
  schema: ({ image }) =>
    z.object({
      // Nombre corto: tarjetas (TourCard), breadcrumbs, schema.org "name".
      nombre: z.string(),
      // Encabezado persuasivo de la página de detalle (distinto al title
      // tag y distinto de "nombre" — regla 7 del blueprint SEO).
      h1: z.string(),
      subtitulo: z.string(),
      // Respuesta rápida (sección TL;DR) para quien escanea la página.
      tldr: z.string(),
      // Para tarjetas (TourCard) y fallback de meta description.
      descripcion_corta: z.string(),

      duracion: z.string(), // ej. "8.5 horas"
      idiomas: z.string().optional(), // ej. "Español/Inglés"
      ubicacion: z.string(), // ej. "Islas Marietas"

      // Texto libre para los badges del Hero (ya vienen con su emoji desde
      // el contenido, ej. "⏱️ 8.5 Horas") — más flexible que derivarlos
      // de duracion/idiomas porque el copy no siempre calza 1:1.
      badges: z.array(z.string()).default([]),

      // Varios niveles de precio (adulto/menor/infante), no un precio único.
      precios: z.array(
        z.object({
          etiqueta: z.string(), // "Adultos", "Menores (3 a 11 años)"
          precio: z.number(),
          moneda: z.enum(["MXN", "USD"]).default("MXN"),
          // Texto corto opcional bajo el precio, para boletos cuyo alcance
          // no es obvio solo con la etiqueta (ej. qué incluye un "Pase de
          // Acompañante" vs el boleto principal).
          nota: z.string().optional(),
          // "addon": boleto de alcance distinto al producto principal
          // (ej. un pase de acompañante que no incluye la actividad
          // principal del tour). Se muestra visualmente diferenciado en
          // PriceTable y se excluye del cálculo de "Desde $X" en
          // TourCard/StickyBookBar, para no anunciar como precio de
          // entrada un boleto que no es el producto principal.
          tipo: z.enum(["estandar", "addon"]).default("estandar"),
        }),
      ),
      // Nota de transparencia sobre costos extra (brazalete, impuesto
      // portuario, etc.) — crucial para confianza, regla 12/13 del blueprint.
      nota_precio: z.string().optional(),

      incluye: z.array(z.string()).default([]),
      no_incluye: z.array(z.string()).default([]),

      itinerario: z
        .array(
          z.object({
            hora: z.string().optional(),
            titulo: z.string(),
            descripcion: z.string(),
          }),
        )
        .default([]),

      que_traer: z.array(z.string()).default([]),
      restricciones: z.array(z.string()).default([]),

      faq: z
        .array(
          z.object({
            pregunta: z.string(),
            respuesta: z.string(),
          }),
        )
        .default([]),

      // Atractivo/lugar geográfico del tour, para el JSON-LD TouristAttraction
      // de la página de detalle. Antes esto estaba hardcodeado a "Islas
      // Marietas" en [slug].astro — ahora cada tour lo declara (u omite si
      // no aplica, ej. un tour que no gira en torno a un solo atractivo).
      atraccion: z
        .object({
          nombre: z.string(),
          descripcion: z.string(),
          region: z.string().optional(), // ej. "Nayarit", "Jalisco"
        })
        .optional(),

      // Restricción REAL de temporada: cuando este campo existe, el tour
      // no opera fuera de esos meses (ej. ballenas: solo dic-mar). Esto es
      // distinto de un simple dato informativo como "en temporada de
      // ballenas también las puedes ver" (caso Yelapa, que no lleva este
      // campo) — aquí sí cambia el CTA a "Lista de espera" fuera de mes.
      temporada: z
        .object({
          descripcion: z.string(), // "Diciembre a Marzo", para mostrar en UI
          meses: z.array(z.number().int().min(1).max(12)), // ej. [12, 1, 2, 3]
        })
        .optional(),

      // Amenidades/diferenciadores que "anclan valor" justo debajo del
      // precio en la vista de detalle — distinto de "badges" (datos
      // logísticos del Hero: duración, horario). Mismo formato que badges
      // (string con emoji incluido) para no duplicar convenciones.
      highlights: z.array(z.string()).default([]),

      imagen_portada: image(),
      // Cada foto de galería lleva su propio alt: una galería de 6-8 fotos
      // no puede compartir el alt del título del tour, cada una describe
      // lo que se ve (esto también es señal para Google Imágenes).
      galeria: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string(),
          }),
        )
        .default([]),
      // Controla si el tour aparece en el FeaturedGrid del Home.
      destacado: z.boolean().default(false),
      // Orden manual entre los destacados (menor = primero). Opcional:
      // si no se define, se puede ordenar por fecha o alfabéticamente.
      orden_destacado: z.number().optional(),

      // Reseña real destacada para ESTE tour específicamente (ej. la
      // reseña de Alejandra sobre las ballenas, en el tour de ballenas).
      // Va embebida aquí (no referenciada desde src/lib/testimonios.ts)
      // a propósito: mismo criterio que "atraccion" o "faq" — el
      // contenido del tour queda autocontenido en su propio archivo.
      featuredReview: z
        .object({
          autor: z.string(),
          texto: z.string(),
          calificacion: z.number().min(1).max(5).default(5),
          fuente: z.string().default("Google"),
        })
        .optional(),

      seo: seoSchema,
    }),
});

// Categorías de la guía — tupla compartida entre el enum de Zod y el
// mapeo de etiquetas humanas (ver CATEGORIA_INFO en src/lib/guia.ts).
// Un solo lugar para agregar una categoría nueva sin que el enum y las
// etiquetas de UI se desincronicen.
export const CATEGORIAS_GUIA = ["actividades", "gastronomia", "info-util", "hospedaje-tips"] as const;

// guia: contenido informativo/SEO (antes "actividades") — es el
// blog/guía del destino: atrae tráfico, no siempre es una página con
// precio. Enlaza hacia tours mediante slugs simples. Cada artículo vive
// en /guia/[categoria]/[slug] — la categoría es obligatoria (no
// opcional) porque la URL y las páginas de archivo dependen de ella.
const guia = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guia" }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(), // nombre corto: tarjetas, breadcrumbs
      h1: z.string(), // encabezado editorial (distinto de "titulo", regla 7 del blueprint SEO — mismo criterio que en tours)
      categoria: z.enum(CATEGORIAS_GUIA),
      descripcion: z.string(),
      // Ficha de datos rápidos tipo TL;DR (ej. "Longitud: 1 km"),
      // renderizada como tarjeta justo debajo del Hero. Formato
      // etiqueta/valor en vez de string libre (a diferencia de los
      // "badges" de tours) porque aquí es información de referencia, no
      // ganchos de venta.
      datos_rapidos: z
        .array(
          z.object({
            etiqueta: z.string(), // "Longitud", "Acceso"
            valor: z.string(), // "Casi 1 km", "100% peatonal y gratuito"
          }),
        )
        .default([]),
      imagen_portada: image().optional(),
      // Mismo campo/componente Gallery.astro que ya usan los tours —
      // carrusel al final del artículo, antes del Footer.
      galeria: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string(),
          }),
        )
        .default([]),
      // Slugs simples de /tours/ (sin reference()) para no acoplar el
      // contenido de tráfico a que el tour exista todavía. Se muestran
      // como "tours relacionados" al final del artículo — distinto de
      // CalloutTour.astro, que es una recomendación puntual insertada a
      // mano dentro del cuerpo del MDX.
      tours_relacionados: z.array(z.string()).default([]),
      seo: seoSchema,
    }),
});

// hospedaje: línea de negocio futura (hoteles, renta vacacional, villas).
// Antes se llamaba "hoteles" — se renombró porque el nombre no cubría
// rentas vacacionales/villas, que tienen datos distintos a un hotel
// tradicional (ej. "habitaciones" en vez de "tipos de cuarto"). Colección
// lista desde ya en el schema; la pestaña de nav está preparada pero
// oculta hasta que se active esta línea de negocio (ver NAV_LINKS en
// src/lib/site.ts).
const hospedaje = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/hospedaje" }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      // Determina cómo se presenta la propiedad (ej. una "Villa" no
      // necesariamente tiene "habitaciones" numeradas como un hotel).
      tipo: z.enum(["Hotel", "Renta Vacacional", "Villa"]),
      descripcion: z.string(),
      // Mismo patrón precio/moneda que "precios" en tours, por si en el
      // futuro hay propiedades cotizadas en USD.
      precio_noche: z.object({
        precio: z.number(),
        moneda: z.enum(["MXN", "USD"]).default("MXN"),
      }),
      // Opcional: no todos los "tipo" se describen igual (una Villa puede
      // publicarse solo con "amenidades" y sin desglose de habitaciones).
      habitaciones: z.number().optional(),
      amenidades: z.array(z.string()).default([]),
      ubicacion: z.string(),
      imagen_portada: image().optional(),
      seo: seoSchema,
    }),
});

export const collections = { tours, guia, hospedaje };
