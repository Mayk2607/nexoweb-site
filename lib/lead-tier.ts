/** Commercial tier for contextual copy and CTA labels. */
export type LeadTier = "entry" | "mid" | "enterprise" | "general";

const ENTRY = new Set(["nexoweb-start", "nexoweb-express", "plan-express"]);

const MID = new Set([
  "plan-business",
  "plan-growth",
  "diagnostico",
  "proyecto-medida",
  "otro",
  "diseno-web-profesional",
  "branding-diseno-marca",
  "marketing-digital-captacion",
  "hosting-administrado",
  "soporte-it",
  "digitalizacion-cobranza-pagos",
]);

const ENTERPRISE = new Set(["plan-corporate-360", "desarrollo-sistemas-crm"]);

export function getLeadTier(servicio: string | null | undefined): LeadTier {
  if (!servicio || !servicio.trim()) return "general";
  const s = servicio.trim().toLowerCase();
  if (ENTRY.has(s)) return "entry";
  if (ENTERPRISE.has(s)) return "enterprise";
  if (MID.has(s)) return "mid";
  return "general";
}

/** Short line above form fields (prefill-aware). */
export function getFormContextHint(servicio: string | null | undefined): string | null {
  if (getLeadTier(servicio) === "entry") {
    return "Ideal para negocios locales y emprendedores.";
  }
  return "Te ayudaremos a evaluar la mejor estrategia para crecimiento y automatización.";
}

/** Primary submit button on the capture form. */
export function getFormSubmitLabel(servicio: string | null | undefined): string {
  const tier = getLeadTier(servicio);
  if (tier === "entry") return "Quiero mi sitio web";
  if (tier === "enterprise") return "Agendar diagnóstico";
  return "Solicitar información";
}

/** Label for nav / landing links that point to lead capture. */
export function getLeadCaptureCtaLabel(servicio?: string | null): string {
  return getFormSubmitLabel(servicio ?? null);
}
