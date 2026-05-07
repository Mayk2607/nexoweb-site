import { webPackages } from "../../config/data";
import { Check, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { getLeadCaptureCtaLabel } from "@/lib/lead-tier";
import { leadCaptureHref } from "@/lib/contact-intent";

export function Pricing() {
  const startPlan = webPackages[0];
  const secondaryPlans = webPackages.slice(1, 4);

  return (
    <section id="paquetes" className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Modelos para dominar tu sector
        </h2>
        <p className="mt-3 text-slate-600 text-sm md:text-base">
          Arranca con una base profesional y escala conforme tu negocio lo necesite. Sin complicaciones técnicas.
        </p>
      </div>

      {/* START — EL PROTAGONISTA */}
      <article className="mb-10 relative overflow-hidden rounded-3xl border-2 border-[#1c4a8f]/30 bg-gradient-to-br from-[#0f274f] via-[#1c4a8f] to-[#0f274f] p-6 md:p-10 text-white shadow-2xl">
        <div className="absolute top-5 right-5 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
          {startPlan.highlightLabel || "Más solicitado"}
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
          {/* Info Principal */}
          <div className="flex-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#1c4a8f] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] mb-4">
              <Sparkles className="h-3 w-3" /> Solución Recomendada
            </p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">{startPlan.name}</h3>
            <p className="mt-3 text-blue-100 max-w-xl text-sm md:text-base leading-relaxed">
              {startPlan.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/70">Inversión inicial</p>
                <p className="text-3xl font-black">{startPlan.setupPrice}</p>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/70">Mantenimiento mensual</p>
                <p className="text-3xl font-black">{startPlan.monthlyPrice}</p>
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="flex-1 lg:max-w-md bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200 mb-4 flex items-center gap-2">
              <Check className="h-3.5 w-3.5" /> Qué incluye tu éxito
            </p>
            <div className="grid gap-3 sm:grid-cols-1">
              {startPlan.breakdown.flatMap((group) => group.items).slice(0, 6).map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-blue-50 font-medium">
                  <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center gap-6 border-t border-white/10 pt-8">
          <Link
            href={leadCaptureHref({ servicio: "nexoweb-start" })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black text-[#0f274f] transition hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
          >
            <Calendar className="w-4 h-4" /> {getLeadCaptureCtaLabel("nexoweb-start")}
          </Link>
          <div className="flex flex-wrap gap-4">
            {(startPlan.trust || []).map((line: string) => (
              <span key={line} className="text-[10px] font-bold uppercase tracking-widest text-blue-200/60">
                • {line}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Otros planes — más discretos */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {secondaryPlans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "relative rounded-2xl bg-white p-6 shadow-sm border transition-all hover:shadow-md flex flex-col",
              plan.highlighted ? "border-[#1c4a8f]/30 ring-4 ring-[#1c4a8f]/5" : "border-slate-200/60"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-slate-900 tracking-tight">{plan.name}</h3>
              {plan.highlightLabel && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  {plan.highlightLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-4 line-clamp-2">{plan.summary}</p>
            
            <div className="mb-5 flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">{plan.setupPrice}</span>
              <span className="text-[10px] font-bold text-slate-400">setup</span>
            </div>

            <Link
              href={plan.buttonLink}
              className={cn(
                "mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-black transition uppercase tracking-wider",
                plan.highlighted
                  ? "bg-[#1c4a8f] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {getLeadCaptureCtaLabel(plan.buttonLink.match(/servicio=([^#&]+)/)?.[1] ?? null)}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

