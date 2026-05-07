import { webPackages, expressPackage } from "@/config/data";
const start = webPackages[0];
const business = webPackages[1];
import { Check, Minus, ArrowRight, Zap, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Comparison Data with rich labels */
const ROWS = [
  { label: "Modelo Comercial",    express: "Pago único",                  start: "Mensualidad",        business: "Mensualidad" },
  { label: "Configuración Inicial", express: expressPackage.price,          start: start.setupPrice,     business: business.setupPrice },
  { label: "Costo Mensual",       express: "—",                           start: start.monthlyPrice,   business: business.monthlyPrice },
  { label: "Estructura Web",      express: "Landing básica",              start: "Landing Pro",        business: "Multi-página" },
  { label: "Dominio y Hosting",   express: true,                          start: true,                 business: true },
  { label: "SSL de Seguridad",    express: true,                          start: true,                 business: true },
  { label: "Botón WhatsApp",      express: true,                          start: true,                 business: true },
  { label: "Soporte Técnico",     express: false,                         start: "Continuo",           business: "Prioritario" },
  { label: "Cambios Mensuales",   express: false,                         start: "1 incluido",         business: "2 incluidos" },
  { label: "SEO & Visibilidad",   express: false,                         start: "Básico",             business: "Avanzado" },
  { label: "Correos Empresa",     express: false,                         start: "Opcional",           business: "Incluidos" },
  { label: "Escalabilidad",       express: "Baja",                        start: "Media",              business: "Alta" },
];

function FeatureCell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110",
          highlight ? "bg-white text-[#1c4a8f] shadow-lg shadow-white/20" : "bg-emerald-100 text-emerald-600"
        )}>
          <Check className="h-4 w-4 stroke-[3]" />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <div className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full",
          highlight ? "bg-white/10 text-white/30" : "bg-slate-100 text-slate-300"
        )}>
          <Minus className="h-4 w-4" />
        </div>
      </div>
    );
  }
  return (
    <span className={cn(
      "text-[13px] font-bold tracking-tight block",
      highlight ? "text-white text-right md:text-center" : "text-slate-600 text-right md:text-center"
    )}>
      {value}
    </span>
  );
}



export function PlanComparison() {
  const plans = [
    { 
      name: "EXPRESS", 
      price: expressPackage.price, 
      sub: "Pago único", 
      icon: Zap, 
      color: "bg-slate-50",
      textColor: "text-slate-900",
      borderColor: "border-slate-200",
      buttonClass: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      link: expressPackage.buttonLink,
      key: "express" as const
    },
    { 
      name: start.name, 
      price: start.monthlyPrice, 
      sub: start.highlightLabel, 
      icon: Star, 
      color: "bg-[#1c4a8f]",
      textColor: "text-white",
      borderColor: "border-[#1c4a8f]",
      highlight: true,
      buttonClass: "bg-white text-[#1c4a8f] hover:bg-slate-50 shadow-xl shadow-black/20",
      link: start.buttonLink,
      key: "start" as const
    },
    { 
      name: business.name, 
      price: business.monthlyPrice, 
      sub: "Crecimiento", 
      icon: ShieldCheck, 
      color: "bg-slate-900",
      textColor: "text-white",
      borderColor: "border-slate-900",
      buttonClass: "bg-white text-slate-900 hover:bg-slate-50",
      link: business.buttonLink,
      key: "business" as const
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#1c4a8f]/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#1c4a8f] mb-4">
          <ShieldCheck className="w-4 h-4" /> Transparencia total
        </div>
        <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          Elige con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1c4a8f] to-[#2c63b8]">certeza.</span>
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto">
          Comparamos nuestras soluciones para que elijas el motor que tu negocio necesita hoy.
        </p>
      </div>

      {/* Mobile View: Cards */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={cn(
              "relative overflow-hidden rounded-[2rem] border p-8 transition-all",
              plan.borderColor,
              plan.color, // Apply the plan's background color
              plan.highlight ? "shadow-2xl shadow-[#1c4a8f]/30 scale-[1.02] z-10" : "bg-white"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#00b4d8]" />
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl",
                plan.highlight ? "bg-white/10 text-white" : "bg-slate-100 text-[#1c4a8f]"
              )}>
                <plan.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className={cn("text-xl font-black tracking-tight", plan.textColor)}>{plan.name}</h3>
                <p className={cn("text-xs font-bold uppercase tracking-widest opacity-70", plan.textColor)}>{plan.sub}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className={cn("text-3xl font-black", plan.textColor)}>{plan.price}</div>
              <div className={cn("text-xs font-medium opacity-60", plan.textColor)}>
                {plan.key === "express" ? "Inversión única" : "Mantenimiento mensual"}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {ROWS.map((row) => (
                <div 
                  key={row.label} 
                  className={cn(
                    "flex items-center justify-between py-2 border-b last:border-0",
                    plan.highlight ? "border-white/10" : "border-slate-100"
                  )}
                >
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    plan.highlight ? "text-white/80" : "text-slate-400"
                  )}>
                    {row.label}
                  </span>
                  <div className="flex-1 flex justify-end">
                    <FeatureCell value={row[plan.key]} highlight={plan.highlight} />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={plan.link}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-black uppercase tracking-widest transition-all active:scale-95",
                plan.buttonClass
              )}
            >
              {plan.name === "START" ? "Elegir START" : plan.name === "BUSINESS" ? "Business" : "Ver detalles"} 
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>


      {/* Desktop View: Table */}
      <div className="hidden md:block relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/40">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-left w-[28%] border-b border-slate-100">
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                    Propuesta Comercial
                  </div>
                </th>
                
                {/* EXPRESS Header */}
                <th className="p-8 text-center w-[24%] border-b border-l border-slate-100">
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="h-6 w-6 text-slate-400" />
                    <div className="text-xl font-black text-slate-900 tracking-tight">EXPRESS</div>
                    <div className="text-lg font-bold text-[#1c4a8f]">{expressPackage.price}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Pago único
                    </div>
                  </div>
                </th>

                {/* START Header — Highlighted */}
                <th className="p-8 text-center w-[24%] border-b border-slate-100 bg-[#1c4a8f] relative">
                  <div className="absolute -top-1 left-0 w-full h-2 bg-[#00b4d8]" />
                  <div className="flex flex-col items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    <div className="text-xl font-black text-white tracking-tight">{start.name}</div>
                    <div className="text-lg font-bold text-white">{start.monthlyPrice}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#0f274f] bg-white px-2 py-0.5 rounded-full shadow-lg">
                      {start.highlightLabel}
                    </div>
                  </div>
                </th>

                {/* BUSINESS Header */}
                <th className="p-8 text-center w-[24%] border-b border-l border-slate-100">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-slate-800" />
                    <div className="text-xl font-black text-slate-900 tracking-tight">{business.name}</div>
                    <div className="text-lg font-bold text-[#1c4a8f]">{business.monthlyPrice}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Crecimiento
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {ROWS.map((row) => (
                <tr key={row.label} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-6 md:px-8 text-sm font-bold text-slate-600 uppercase tracking-wide">
                    {row.label}
                  </td>
                  <td className="p-6 text-center border-l border-slate-100/50">
                    <FeatureCell value={row.express} />
                  </td>
                  <td className="p-6 text-center bg-[#1c4a8f]">
                    <FeatureCell value={row.start} highlight />
                  </td>
                  <td className="p-6 text-center border-l border-slate-100/50">
                    <FeatureCell value={row.business} />
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td className="p-8 bg-slate-50/50" />
                <td className="p-8 text-center bg-slate-50/50 border-l border-slate-100">
                  <Link
                    href={expressPackage.buttonLink}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1c4a8f] bg-[#1c4a8f]/5 px-4 py-2 rounded-lg hover:bg-[#1c4a8f]/10 transition-colors"
                  >
                    Ver detalles <ArrowRight className="h-4 w-4" />
                  </Link>
                </td>
                <td className="p-8 text-center bg-[#1c4a8f]">
                  <Link
                    href={start.buttonLink}
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-black text-[#1c4a8f] uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Elegir START
                  </Link>
                </td>
                <td className="p-8 text-center bg-slate-50/50 border-l border-slate-100">
                  <Link
                    href={business.buttonLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-slate-900 px-6 py-3 text-sm font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Business <ArrowRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <p className="text-slate-400 text-sm italic">
          * Todos los planes recurrentes incluyen mantenimiento y actualizaciones mensuales.
        </p>
      </div>
    </section>
  );
}


