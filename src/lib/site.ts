// Datos de contacto y marca centralizados. Un solo lugar para actualizar
// cuando cambien (ej. cuando el correo quede dado de alta).
export const SITE = {
  nombre: "Vallarta Mágico",
  url: "https://vallartamagico.com",
  email: "info@vallartamagico.com",
  whatsapp: {
    // Formato wa.me para móviles MX: 52 + 1 + 10 dígitos.
    // Si el botón da "número no válido" al probarlo, quitar el "1".
    numero: "5213223048986",
    mensajeDefault:
      "Hola, quiero información sobre tours en Puerto Vallarta y Bahía de Banderas.",
  },
  redes: {
    facebook: "https://www.facebook.com/MiVallartaMagico/",
    instagram: "https://www.instagram.com/vallartamagico/",
    tiktok: "https://www.tiktok.com/@vallartamagico",
  },
} as const;

// Tipo de cambio fijo para mostrar en MXN los tours cotizados en USD (hoy
// solo Canopy Los Veranos) en listados donde conviene un solo precio en
// una sola moneda — ej. TourCard. Es una conversión de referencia para
// mostrar en pantalla, no el tipo de cambio real del día ni algo que se
// cobre: el precio real en USD sigue siendo el oficial (ver PriceTable en
// la página de detalle de cada tour). Actualízalo aquí cuando cambie.
export const TIPO_CAMBIO_USD_MXN = 18;

export function whatsappUrl(mensaje: string = SITE.whatsapp.mensajeDefault): string {
  return `https://wa.me/${SITE.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

// Puntos de encuentro/salida, recopilados de los itinerarios de cada tour
// (no hay una sola "oficina" física: cada tour zarpa o sale de un punto
// distinto). "mapaQuery" es opcional: solo lo tienen los puntos con
// dirección concreta, para poder embeber un mapa de Google sin API key.
export const PUNTOS_ENCUENTRO = [
  {
    nombre: 'Puerto Mágico (Oficina Beachboy)',
    direccion: "Marina Vallarta, Puerto Vallarta, Jalisco",
    nota: "Salida de los tours en barco: Islas Marietas, Yelapa y Majahuitas, y Avistamiento de Ballenas.",
    mapaQuery: "Puerto Mágico Marina Vallarta Puerto Vallarta",
  },
  {
    nombre: 'Muelle "E", Paradise Village',
    direccion: "Nuevo Vallarta, Nayarit (junto al estacionamiento del Hospital Joya)",
    nota: "Salida alterna del tour Canopy Los Veranos con Lancha Rápida.",
    mapaQuery: "Paradise Village Marina Nuevo Vallarta",
  },
  {
    nombre: "Oficina Los Veranos",
    direccion: "Estacionamiento de Chedraui Playa de Oro, Puerto Vallarta, Jalisco",
    nota: "Salida alterna del tour Canopy Los Veranos con Lancha Rápida.",
    mapaQuery: "Chedraui Playa de Oro Puerto Vallarta",
  },
  {
    nombre: "Base ATV y RZR Ruta Cuale",
    direccion: "A 5 minutos del Malecón (dirección exacta al confirmar tu reserva)",
    nota: "Salida del tour ATV y RZR: Ruta del Río Cuale.",
    mapaQuery: undefined,
  },
] as const;

// Navegación principal, compartida entre Header y Footer para que no se
// desincronicen. Las rutas que todavía no tienen página quedan marcadas.
export const NAV_LINKS = [
  { label: "Tours", href: "/tours" },
  { label: "Guía", href: "/guia" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  // Hospedaje: nueva línea de negocio (hoteles, renta vacacional, villas).
  // Colección y schema ya listos (ver "hospedaje" en content.config.ts) —
  // esta pestaña queda oculta a propósito para el lanzamiento del MVP.
  // Para activarla, descomenta la siguiente línea (y crea /hospedaje):
  // { label: "Hospedaje", href: "/hospedaje" },
] as const;
