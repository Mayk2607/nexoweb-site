import { cases } from "../../config/data";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { leadCaptureHref } from "@/lib/contact-intent";
import { getLeadCaptureCtaLabel } from "@/lib/lead-tier";

export function Portfolio() {
  return (
    <section id="portafolio" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c4a8f]/80">
          Casos reales
        </p>
        <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Resultados y casos de éxito
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {cases.map((item) => (
          <div key={item.name}>
            <Link
              href={`/portafolio/${item.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl hover:-translate-y-1 block"
            >
              <div className="relative h-72 w-full overflow-hidden border-b border-slate-100 bg-[#0a1224]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#1c4a8f]">
                    {item.name}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f7fb] text-[#1c4a8f] transition group-hover:bg-[#1c4a8f] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.result}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* CTA de cierre */}
      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-[#1c4a8f]/15 bg-[#f4f7fb] px-8 py-10 text-center md:flex-row md:text-left md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1c4a8f]/70">Siguiente paso</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">¿Tu negocio podría ser el siguiente caso?
          </h3>
          <p className="mt-1 text-sm text-slate-600 max-w-lg">
            Cuéntanos qué necesitas y armamos una propuesta alineada a tu objetivo real.
          </p>
        </div>
        <Link
          href={leadCaptureHref({ servicio: "proyecto-medida" })}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg hover:-translate-y-0.5"
        >
          {getLeadCaptureCtaLabel("proyecto-medida")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
