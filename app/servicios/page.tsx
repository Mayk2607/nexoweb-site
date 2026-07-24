import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, TrendingUp, Cpu, Home, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { services, serviceCategories } from "@/config/data";
import type { ServiceCategory } from "@/config/data";

export const metadata: Metadata = {
  title: "Servicios — Nexoweb",
  description:
    "31 servicios tecnológicos especializados: diseño web, marketing digital, CRM, inteligencia artificial, hosting, ciberseguridad y más.",
};

const categoryIcons: Record<ServiceCategory, React.ReactNode> = {
  presencia: <Globe className="h-6 w-6" />,
  marketing: <TrendingUp className="h-6 w-6" />,
  tecnologia: <Cpu className="h-6 w-6" />,
};

const categoryAccent: Record<ServiceCategory, { bg: string; text: string; light: string; border: string }> = {
  presencia: { bg: "bg-blue-600", text: "text-blue-600", light: "bg-blue-50", border: "border-blue-200" },
  marketing: { bg: "bg-emerald-600", text: "text-emerald-600", light: "bg-emerald-50", border: "border-emerald-200" },
  tecnologia: { bg: "bg-violet-600", text: "text-violet-600", light: "bg-violet-50", border: "border-violet-200" },
};

export default function ServiciosPage() {
  const byCategory = serviceCategories.map((cat) => ({
    ...cat,
    services: services.filter((s) => s.category === cat.id),
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f4f7fb] pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Breadcrumbs */}
          <nav className="flex mb-10 text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#1c4a8f] transition-colors">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="font-medium text-slate-900">Servicios</li>
            </ol>
          </nav>

          {/* Hero de página */}
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1c4a8f] mb-4">
              Catálogo completo
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              Todo lo que necesitas para crecer digitalmente
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              31 servicios especializados organizados en 3 áreas de solución. Trabaja con un solo
              equipo que entiende tu negocio de principio a fin.
            </p>
          </div>

          {/* Anclas de categorías */}
          <div className="flex flex-wrap gap-3 mb-16">
            {serviceCategories.map((cat) => {
              const accent = categoryAccent[cat.id as ServiceCategory];
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border ${accent.light} ${accent.text} ${accent.border} hover:opacity-80 transition-opacity`}
                >
                  {categoryIcons[cat.id as ServiceCategory]}
                  {cat.title}
                </a>
              );
            })}
          </div>

          {/* Secciones por categoría */}
          <div className="space-y-24">
            {byCategory.map((cat) => {
              const accent = categoryAccent[cat.id as ServiceCategory];
              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-28">
                  {/* Header de categoría */}
                  <div className="flex items-start gap-5 mb-10 pb-6 border-b border-slate-200">
                    <div className={`w-14 h-14 rounded-2xl ${accent.light} ${accent.text} flex items-center justify-center shrink-0`}>
                      {categoryIcons[cat.id as ServiceCategory]}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-extrabold ${accent.text} mb-1`}>{cat.title}</h2>
                      <p className="text-slate-600 leading-relaxed max-w-2xl">{cat.description}</p>
                    </div>
                  </div>

                  {/* Grid de servicios */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cat.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/servicios/${service.slug}`}
                        className="group flex flex-col gap-4 p-7 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
                      >
                        <div>
                          <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug group-hover:text-[#1c4a8f] transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{service.tagline}</p>
                        </div>

                        <ul className="space-y-1.5 flex-1">
                          {service.benefits.slice(0, 3).map((b) => (
                            <li key={b} className="flex items-start gap-2 text-xs text-slate-500">
                              <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${accent.bg}`} />
                              {b}
                            </li>
                          ))}
                        </ul>

                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${accent.text} group-hover:gap-2.5 transition-all`}>
                          Ver servicio completo <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* CTA final */}
          <div className="mt-24 rounded-2xl bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              ¿No encuentras exactamente lo que buscas?
            </h2>
            <p className="text-blue-100/90 mb-8 max-w-xl mx-auto">
              Desarrollamos soluciones a medida para necesidades específicas. Cuéntanos tu reto y armamos la propuesta correcta.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0f274f] font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              Solicitar propuesta personalizada <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
