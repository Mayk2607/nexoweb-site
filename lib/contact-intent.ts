/** Hash id of the contact / lead capture section on the home page. */
export const CONTACT_SECTION_ID = "contacto";

/**
 * Build home URL with optional query params for form prefill (servicio, nota).
 * Example: /?servicio=nexoweb-start#contacto
 */
export function leadCaptureHref(params?: { servicio?: string; nota?: string }) {
  const search = new URLSearchParams();
  if (params?.servicio) search.set("servicio", params.servicio);
  if (params?.nota) search.set("nota", params.nota);
  const q = search.toString();
  return q ? `/?${q}#${CONTACT_SECTION_ID}` : `/#${CONTACT_SECTION_ID}`;
}
