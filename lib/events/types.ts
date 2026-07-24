// Event catalogue — every observable action the site can generate.
// Adding a new event here is the only change needed when HQ integration arrives.

export const EventType = {
  PAGE_VIEW:       "PAGE_VIEW",
  SERVICE_VIEW:    "SERVICE_VIEW",
  PORTFOLIO_VIEW:  "PORTFOLIO_VIEW",
  BLOG_VIEW:       "BLOG_VIEW",
  CTA_CLICK:       "CTA_CLICK",
  WHATSAPP_CLICK:  "WHATSAPP_CLICK",
  PHONE_CLICK:     "PHONE_CLICK",
  EMAIL_CLICK:     "EMAIL_CLICK",
  FORM_STARTED:    "FORM_STARTED",
  FORM_SUBMITTED:  "FORM_SUBMITTED",
  LEAD_CREATED:    "LEAD_CREATED",
  DOWNLOAD:        "DOWNLOAD",
  SEARCH:          "SEARCH",
  PLAN_SELECTED:   "PLAN_SELECTED",
  QUOTE_REQUESTED: "QUOTE_REQUESTED",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

// ─── Payload contracts ────────────────────────────────────────────────────────
// Each payload is the typed interface HQ will eventually receive.
// Keeping them explicit here lets HQ define its schema from this file.

export interface PageViewPayload {
  path: string;
  title?: string;
  referrer?: string;
}

export interface ServiceViewPayload {
  slug: string;
  name: string;
  category: string;
}

export interface PortfolioViewPayload {
  slug: string;
  name: string;
}

export interface BlogViewPayload {
  slug: string;
  title: string;
}

export interface CTAClickPayload {
  label: string;
  destination: string;
  location?: string; // e.g. "hero", "service-detail", "footer"
}

export interface ContactChannelPayload {
  channel: "whatsapp" | "phone" | "email";
  location?: string;
}

export interface FormPayload {
  formId: string;
  service?: string;
}

export interface LeadPayload {
  formId: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  goal?: string;
}

export interface DownloadPayload {
  filename: string;
  url?: string;
}

export interface SearchPayload {
  query: string;
  resultCount?: number;
}

export interface PlanSelectedPayload {
  serviceSlug: string;
  planName: string;
  planPrice: string;
}

export interface QuoteRequestedPayload {
  serviceSlug: string;
  planName?: string;
}
