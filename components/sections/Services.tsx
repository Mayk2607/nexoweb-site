import { serviceCategories, services } from "../../config/data";
import { Globe, Megaphone, Workflow, Server, ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { leadCaptureHref } from "@/lib/contact-intent";
import { getLeadCaptureCtaLabel } from "@/lib/lead-tier";

/** Map category title → first matching service slug for deep-links */
const categorySlug: Record<string, string> = {
  "Sitios Web": "diseno-web-profesional",
  "Marketing y Captación": "marketing-digital-captacion",
  "Sistemas y Automatización": "desarrollo-sistemas-crm",
  "Infraestructura y Soporte": "hosting-administrado",
};

const categoryIcons: Record<string, LucideIcon> = {
  "Sitios Web": Globe,
  "Marketing y Captación": Megaphone,
  "Sistemas y Automatización": Workflow,
  "Infraestructura y Soporte": Server,
};

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-6 py-10 md:py-12">
      <div className="mb-5 md:mb-6 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c4a8f]/80">
          Líneas de servicio
        </p>
        <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          Cuatro pilares, un solo equipo
        </h2>
        <p className="mt-2 text-sm text-slate-500 leading-snug">
          Guía rápida. Los planes y precios están abajo en <span className="text-slate-700 font-medium">NEXOWEB START</span> y paquetes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-3">
        {serviceCategories.map((service) => {
          const Icon = categoryIcons[service.title] ?? Globe;
          const slug = categorySlug[service.title];
          return (
            <Link
              key={service.title}
              href={slug ? `/servicios/${slug}` : leadCaptureHref()}
              className="group flex flex-row items-start gap-3 rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition hover:border-[#1c4a8f]/35 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#15366b] to-[#2c63b8] text-white shadow-sm">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="flex items-center justify-between text-sm font-bold leading-tight text-slate-900 md:text-[0.9375rem]">
                  {service.title}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#1c4a8f] opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5" aria-hidden />
                </h3>
                <p className="mt-1 text-xs leading-snug text-slate-600 line-clamp-2">
                  {service.description}
                </p>
                <ul className="mt-2 space-y-0.5 border-t border-slate-100 pt-2">
                  {service.points.map((point) => (
                    <li key={point} className="text-[11px] leading-snug text-slate-500">
                      <span className="text-[#1c4a8f]/70">·</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
