import { CATEGORIAS_GUIA } from "../content.config";

// Etiquetas/descripciones humanas por categoría, para el nav, las
// páginas de archivo (/guia/[categoria]) y breadcrumbs. Las claves vienen
// de CATEGORIAS_GUIA (content.config.ts) para que TypeScript avise si
// falta o sobra una categoría aquí.
export const CATEGORIA_INFO: Record<(typeof CATEGORIAS_GUIA)[number], { label: string; descripcion: string }> = {
  actividades: {
    label: "Qué Hacer",
    descripcion: "Turismo, miradores y actividades en Puerto Vallarta y Bahía de Banderas.",
  },
  gastronomia: {
    label: "Gastronomía",
    descripcion: "Restaurantes, rutas de tacos y dónde comer como local.",
  },
  "info-util": {
    label: "Info Útil",
    descripcion: "Emergencias, transporte y datos prácticos para tu viaje.",
  },
  "hospedaje-tips": {
    label: "Tips de Hospedaje",
    descripcion: "Zonas y recomendaciones de dónde quedarte en la bahía.",
  },
};

// Versión en inglés — mismas claves (el segmento de URL /guia/[categoria]
// se queda en español incluso en /en/guide/[categoria]: son nombres
// propios de la categoría a nivel de ruta, no texto de interfaz, y así
// no hay que mantener un segundo mapa de slugs). Solo el label/descripcion
// que ve el usuario cambian de idioma.
export const CATEGORIA_INFO_EN: Record<(typeof CATEGORIAS_GUIA)[number], { label: string; descripcion: string }> = {
  actividades: {
    label: "Things to Do",
    descripcion: "Sightseeing, viewpoints and activities in Puerto Vallarta and Banderas Bay.",
  },
  gastronomia: {
    label: "Food & Dining",
    descripcion: "Restaurants, taco routes and where to eat like a local.",
  },
  "info-util": {
    label: "Useful Info",
    descripcion: "Emergencies, transportation and practical tips for your trip.",
  },
  "hospedaje-tips": {
    label: "Lodging Tips",
    descripcion: "Areas and recommendations for where to stay in the bay.",
  },
};
