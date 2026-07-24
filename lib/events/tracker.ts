// Event tracker — the only file that needs to change when HQ integration arrives.
//
// Current implementation:
//   Development  → console.debug() for visibility during local work
//   Production   → Promise.resolve() (silent no-op, zero overhead)
//
// Future implementation (HQ ready):
//   Replace `emit()` body with: POST /api/events → Nexoweb HQ Event Hub
//   No component changes required.

import type {
  EventType,
  PageViewPayload,
  ServiceViewPayload,
  PortfolioViewPayload,
  BlogViewPayload,
  CTAClickPayload,
  ContactChannelPayload,
  FormPayload,
  LeadPayload,
  DownloadPayload,
  SearchPayload,
  PlanSelectedPayload,
  QuoteRequestedPayload,
} from "./types";

const isDev = process.env.NODE_ENV === "development";

function emit(type: EventType, payload: unknown): Promise<void> {
  if (isDev) {
    console.debug(`[nexoweb:event] ${type}`, payload, { _ts: new Date().toISOString() });
  }
  // ─── Integration point ────────────────────────────────────────────────────
  // When HQ is ready, replace the line below with:
  //   return fetch("/api/events", { method: "POST", body: JSON.stringify({ type, payload }) })
  //            .then(() => void 0);
  // ─────────────────────────────────────────────────────────────────────────
  return Promise.resolve();
}

// ─── Tracker functions ────────────────────────────────────────────────────────

export const trackPageView = (payload: PageViewPayload): Promise<void> =>
  emit("PAGE_VIEW", payload);

export const trackServiceView = (payload: ServiceViewPayload): Promise<void> =>
  emit("SERVICE_VIEW", payload);

export const trackPortfolioView = (payload: PortfolioViewPayload): Promise<void> =>
  emit("PORTFOLIO_VIEW", payload);

export const trackBlogView = (payload: BlogViewPayload): Promise<void> =>
  emit("BLOG_VIEW", payload);

export const trackCTA = (payload: CTAClickPayload): Promise<void> =>
  emit("CTA_CLICK", payload);

export const trackWhatsApp = (payload?: Partial<ContactChannelPayload>): Promise<void> =>
  emit("WHATSAPP_CLICK", { channel: "whatsapp", ...payload });

export const trackPhone = (payload?: Partial<ContactChannelPayload>): Promise<void> =>
  emit("PHONE_CLICK", { channel: "phone", ...payload });

export const trackEmail = (payload?: Partial<ContactChannelPayload>): Promise<void> =>
  emit("EMAIL_CLICK", { channel: "email", ...payload });

export const trackFormStart = (payload: FormPayload): Promise<void> =>
  emit("FORM_STARTED", payload);

export const trackFormSubmit = (payload: FormPayload): Promise<void> =>
  emit("FORM_SUBMITTED", payload);

export const trackLead = (payload: LeadPayload): Promise<void> =>
  emit("LEAD_CREATED", payload);

export const trackDownload = (payload: DownloadPayload): Promise<void> =>
  emit("DOWNLOAD", payload);

export const trackSearch = (payload: SearchPayload): Promise<void> =>
  emit("SEARCH", payload);

export const trackPlanSelected = (payload: PlanSelectedPayload): Promise<void> =>
  emit("PLAN_SELECTED", payload);

export const trackQuoteRequested = (payload: QuoteRequestedPayload): Promise<void> =>
  emit("QUOTE_REQUESTED", payload);
