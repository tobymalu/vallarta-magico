// Un tour con "temporada" definida (ver content.config.ts) solo opera en
// esos meses del año (ej. ballenas: diciembre a marzo). Fuera de esos
// meses, la UI cambia el CTA de "Reservar" a "Lista de espera" en vez de
// dejar que el usuario intente reservar una fecha que no existe.
//
// No hay un calendario de fechas reales en el sitio (la reserva se hace
// por WhatsApp, no por un date-picker) — el "bloqueo" se traduce aquí en
// no ofrecer un CTA de reserva directa mientras el tour esté fuera de
// temporada, y mostrar un aviso visible en su lugar.
export function estaEnTemporada(temporada?: { meses: number[] }): boolean {
  if (!temporada) return true;
  const mesActual = new Date().getMonth() + 1; // getMonth() es 0-indexed
  return temporada.meses.includes(mesActual);
}
