import { ArrowRight, BarChart3, Users, LayoutDashboard, ExternalLink } from "lucide-react";
import Link from "next/link";
import { leadCaptureHref } from "@/lib/contact-intent";
import { getLeadCaptureCtaLabel } from "@/lib/lead-tier";

/** CRM URL — set NEXT_PUBLIC_CRM_URL in .env.local for production */
const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL ?? "https://crm.nexoweb.mx";

export function CrmBanner() {
  return (
    <section className="bg-[#f4f7fb] py-24 border-y border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-[#1c4a8f]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-64 h-64 bg-[#0f274f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1c4a8f]/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#1c4a8f] shadow-sm mb-6">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#0f274f] ring-2 ring-[#1c4a8f]/40" />
              Nuevo Servicio Exclusivo
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl leading-tight">
              Presentamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f274f] to-[#1c4a8f]">Nexoweb CRM</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-lg">
              Desarrollamos una plataforma propia para que las agencias y empresas de servicios dejen de perder cotizaciones en WhatsApp y automaticen su proceso comercial. <strong>El complemento perfecto a tu estrategia digital.</strong>
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={CRM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-8 py-4 font-bold text-white shadow-lg shadow-[#1c4a8f]/25 transition hover:shadow-xl hover:shadow-[#1c4a8f]/40 hover:-translate-y-0.5"
              >
                Conocer el CRM <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href={leadCaptureHref({
                  servicio: "desarrollo-sistemas-crm",
                  nota: "Interés en Nexoweb CRM",
                })}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#1c4a8f] bg-white px-8 py-4 font-bold text-[#0f274f] shadow-sm transition hover:bg-slate-50"
              >
                {getLeadCaptureCtaLabel("desarrollo-sistemas-crm")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-[#1c4a8f]/10">
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              ¿Por qué usar nuestro CRM?
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1c4a8f]/10 text-[#1c4a8f]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Pipeline Visual</h4>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">Arrastra tus prospectos desde &quot;Contacto&quot; hasta &quot;Cierre&quot;. Todo el equipo sabe qué sigue.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1c4a8f]/10 text-[#1c4a8f]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Cotizaciones y Seguimiento</h4>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">Crea propuestas online. El CRM te avisa a quién debes llamar hoy para cerrar la venta.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1c4a8f]/10 text-[#1c4a8f]">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Promesas de Pago</h4>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">No entregues proyectos sin cobrar. Protege tus ingresos con el sistema de cobranza integrado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
