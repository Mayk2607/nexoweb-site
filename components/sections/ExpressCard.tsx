import { expressPackage } from "@/config/data";
import { Check, X, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * ExpressCard — NEXOWEB EXPRESS mini card.
 *
 * Diseño intencionalmente compacto y sobrio.
 * NO debe verse más premium ni más grande que NEXOWEB START.
 * El objetivo visual: "rápido, económico, limitado".
 */
export function ExpressCard() {
  const pkg = expressPackage;

  return (
    <section id="nexoweb-express" className="mx-auto max-w-7xl px-6 pb-6">
      {/* Separador contextual */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          ¿Solo necesitas una página web?
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Card compacta — horizontal en desktop, stack en móvil */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">

          {/* Izquierda: nombre + precio */}
          <div className="shrink-0 md:w-52">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-slate-400" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {pkg.name}
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-800">{pkg.price}</span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              {pkg.priceSuffix} · sin mensualidad
            </span>
            <p className="mt-2 text-[11px] leading-snug text-slate-400">
              {pkg.deliveryTime}
            </p>
          </div>

          {/* Divider vertical */}
          <div className="hidden h-20 w-px bg-slate-100 md:block" />

          {/* Centro: qué incluye (compacto, 2 columnas) */}
          <div className="flex-1">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Incluye
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Check className="h-3 w-3 shrink-0 text-emerald-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Derecha: CTA */}
          <div className="shrink-0 md:w-44">
            <Link
              href={pkg.buttonLink}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              Ver plan <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Microcopy obligatorio */}
        <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] leading-snug text-slate-400">
          {pkg.microcopy}
        </p>
      </div>
    </section>
  );
}
