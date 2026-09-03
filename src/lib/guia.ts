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
