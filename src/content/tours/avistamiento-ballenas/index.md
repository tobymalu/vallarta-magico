---
nombre: "Avistamiento de Ballenas"
h1: "Avistamiento de Ballenas Jorobadas: Expedición en Catamarán"
subtitulo: "Navega en catamarán con una bióloga naturalista a bordo y escucha el canto de las ballenas con nuestro hidrófono."
tldr: "Cada invierno, las aguas cálidas de la Bahía de Banderas reciben a la ballena jorobada: vienen a dar a luz, enseñar a sus crías y prepararse para su viaje de regreso al norte. No es solo un paseo en barco: es una expedición guiada por una bióloga naturalista en un catamarán estable con vistas 360°. Sumergimos un hidrófono profesional para que escuches en vivo los cantos y la comunicación entre madres y crías."
descripcion_corta: "Catamarán con bióloga a bordo, hidrófono para escuchar a las ballenas y desayuno incluido. Temporada diciembre a marzo."

duracion: "4 horas"
ubicacion: "Bahía de Banderas (salida desde Terminal Marítima, Puerto Mágico)"

badges:
  - "⏱️ 4 Horas"
  - "🕗 Check-in 7:30 AM"
  - "⛵ Catamarán (máx. 80 personas)"
  - "🔬 Bióloga a bordo"

# Highlights: se muestran justo debajo de la tabla de precios (distinto de
# "badges", que van en el Hero como datos logísticos) — son los
# diferenciadores que justifican el precio frente a un simple paseo en
# lancha.
highlights:
  - "🔬 Bióloga naturalista a bordo"
  - "⛵ Catamarán estable"
  - "🎧 Hidrófono profesional"
  - "🍳 Desayuno incluido"

precios:
  - etiqueta: "Adultos"
    precio: 1400
    moneda: "MXN"
  - etiqueta: "Menores (6 a 11 años)"
    precio: 700
    moneda: "MXN"
  - etiqueta: "Infantes (1 a 5 años)"
    precio: 300
    moneda: "MXN"

nota_precio: "Se paga un impuesto portuario de $30 MXN por persona, en efectivo, al momento del registro."

incluye:
  - "Navegación de 4 horas en catamarán con capacidad máxima de 80 personas (sin multitudes)"
  - "Bióloga naturalista como guía principal"
  - "Uso de hidrófono para escuchar los cantos de las ballenas"
  - "Desayuno a bordo (incluye café y jugo)"
  - "Bebidas sin alcohol y bebidas alcohólicas durante el recorrido"

no_incluye:
  - "Propinas para la tripulación y la bióloga"

itinerario:
  - hora: "07:30 AM"
    titulo: "Check-in"
    descripcion: "Nos vemos en la oficina Beachboy dentro de Puerto Mágico. Liquidamos saldos, pagamos impuestos portuarios y nos preparamos para abordar."
  - hora: "08:00 AM"
    titulo: "¡Zarpamos!"
    descripcion: "Mientras disfrutas de tu desayuno y tu café matutino, la embarcación se adentra en la bahía."
  - titulo: "La búsqueda"
    descripcion: "Nos comunicamos con otras embarcaciones y escaneamos el horizonte buscando los característicos 'soplos' de agua o saltos."
  - titulo: "El encuentro"
    descripcion: "Al encontrar un grupo, seguimos estrictos protocolos de protección ambiental: apagamos motores o mantenemos una distancia prudente para no estresar a las ballenas, permitiéndote ver su comportamiento natural, tomar fotos y usar el hidrófono."
  - hora: "12:00 PM"
    titulo: "Regreso"
    descripcion: "Finalizamos la experiencia volviendo a la Marina de Puerto Vallarta."

que_traer:
  - "Si eres sensible al mareo: toma una pastilla 30 minutos antes de zarpar (aunque el catamarán es mucho más estable que una lancha tradicional)"

faq:
  - pregunta: "¿Está garantizado que veremos ballenas?"
    respuesta: "La naturaleza es impredecible, pero durante la temporada oficial (diciembre a marzo) la tasa de avistamiento en la bahía es superior al 95%. Nuestra tripulación y bióloga saben exactamente dónde buscar."
  - pregunta: "¿Me voy a marear en el mar?"
    respuesta: "Una de las grandes ventajas de este tour es la embarcación: al ser un catamarán (dos cascos), es muchísimo más estable que una lancha tradicional, reduciendo significativamente el movimiento. Aún así, si eres sensible, recomendamos tomar una pastilla para el mareo 30 minutos antes."
  - pregunta: "¿Puedo reservar este tour en cualquier época del año?"
    respuesta: "No: opera exclusivamente de diciembre a marzo, la temporada oficial de la ballena jorobada en la bahía. Fuera de esas fechas puedes anotarte en la lista de espera y te avisamos en cuanto abra la temporada."

atraccion:
  nombre: "Bahía de Banderas"
  descripcion: "Una de las bahías más grandes de México y sitio de reproducción invernal de la ballena jorobada del Pacífico."

# Hard-cap real de temporada: fuera de estos meses, la UI (TourCard,
# TourHero, PriceTable, StickyBookBar) cambia el CTA a "lista de espera"
# y muestra un aviso — ver src/lib/temporada.ts.
temporada:
  descripcion: "Diciembre a Marzo"
  meses: [12, 1, 2, 3]

# Reseña real de Google Mi Negocio, elegida porque menciona explícitamente
# a las ballenas y al guía — conecta la emoción de compra con una
# experiencia ya comprobada, justo junto al precio.
featuredReview:
  autor: "Alejandra Quiles"
  texto: "Excelente experiencia, las ballenas y delfines fueron muy generosas con nosotros... Nuestro guía Benjamin tiene una pasión increíble y se nota que ama lo que hace... Lo mejor es que pudimos escuchar el canto de las ballenas. 10 de 10!"
  calificacion: 5

imagen_portada: "./avistamiento-salto.jpg"
galeria:
  - imagen: "./ballena-salto-cerca.jpg"
    alt: "Ballena jorobada saltando muy cerca de la embarcación, con la costa de Puerto Vallarta de fondo"
  - imagen: "./ballena-jorobada-salto.jpg"
    alt: "Ballena jorobada saltando frente a la Sierra Madre en Bahía de Banderas"
  - imagen: "./ballenas-vista-aerea.jpg"
    alt: "Vista aérea de dos ballenas jorobadas nadando juntas en la superficie"
  - imagen: "./catamaran.jpg"
    alt: "Catamarán de Vallarta Mágico anclado junto a un acantilado en la bahía"

destacado: true
orden_destacado: 5

seo:
  meta_title: "Tour Avistamiento de Ballenas en Puerto Vallarta | Vallarta Mágico"
  meta_description: "Conoce a las ballenas jorobadas en un catamarán con bióloga a bordo y desayuno incluido. Usa nuestro hidrófono para escuchar sus cantos. Temporada Dic-Mar."
  # Ya con foto real (2026-09-02) — noindex en false, esta página puede
  # indexarse normalmente.
  noindex: false
---
