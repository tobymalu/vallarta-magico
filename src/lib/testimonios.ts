// Reseñas reales de Google Mi Negocio, para prueba social en Home y
// Nosotros (vía TestimonialGrid.astro). Texto verbatim: no se parafrasean
// reseñas de clientes reales, solo se citan tal cual las dejaron.
//
// La reseña de Alejandra (sobre ballenas y el guía Benjamín) también vive,
// embebida, en el frontmatter del tour de avistamiento de ballenas —ver
// featuredReview en content.config.ts— así que aparece dos veces a
// propósito: aquí como prueba social general, y en su tour como reseña
// contextual justo junto al precio.
export const TESTIMONIOS = [
  {
    autor: "Erick Librado L.",
    texto:
      "Un verdadero tour !!! Sin engaños !!! Todo lo que te prometen lo cumplen !!! Son verdaderos capitanes y no piratas!!!! Superó mis expectativas la barra libre",
    calificacion: 5,
  },
  {
    autor: "Alejandra Quiles",
    texto:
      "Excelente experiencia, las ballenas y delfines fueron muy generosas con nosotros... Nuestro guía Benjamin tiene una pasión increíble y se nota que ama lo que hace... Lo mejor es que pudimos escuchar el canto de las ballenas. 10 de 10!",
    calificacion: 5,
  },
  {
    autor: "Magda Palma",
    texto: "Lo recomiendo ampliamente!! La pasamos increíble. Siempre súper atentos 10/10",
    calificacion: 5,
  },
] as const;
