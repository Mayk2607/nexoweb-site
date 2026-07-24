import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { portfolioCases } from "@/config/data";
import { ArrowRight, ArrowUpRight, Home, ChevronRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Portafolio — Casos de Éxito | Nexoweb Saltillo",
  description:
    "Conoce los proyectos que hemos desarrollado para nuestros clientes: sitios web, sistemas a medida, e-commerce y más. Casos reales con resultados medibles.",
  openGraph: {
    title: "Portafolio — Nexoweb",
    description: "Proyectos reales, resultados concretos.",
    url: "https://nexoweb.mx/portafolio",
    siteName: "Nexoweb",
    locale: "es_MX",
    type: "website",
  },
};

export default function PortafolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f4f7fb]">

        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-white border-b border-gray-200 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_-10%,_rgba(18,81,163,0.07),_transparent)]" />
          </div>
          <div className="mx-auto max-w-7xl px-6 relative z-10">

            {/* Breadcrumb */}
            <nav className="flex mb-10 text-sm text-gray-500">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#1251a3] transition-colors">
                    <Home className="w-4 h-4" />
                  </Link>
                </li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="font-medium text-gray-900">Portafolio</li>
              </ol>
            </nav>

            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Portafolio</p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-[1.08] mb-5">
                Casos de éxito reales.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cada proyecto es único. Trabajamos de cerca con nuestros clientes para entender
                sus retos y entregar soluciones que generan resultados concretos.
              </p>
            </div>
          </div>
        </section>

        {/* Casos */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {portfolioCases.map((c) => (
                <article
                  key={c.slug}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-[#b8d0ef] hover:shadow-xl transition-all"
                >
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-black text-gray-900 mb-2">{c.name}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.result}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="h-3.5 w-3.5" /> {c.duration}
                      </span>
                      <div className="flex items-center gap-4">
                        {c.link && (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-[#1251a3] transition-colors"
                          >
                            Sitio en vivo <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/portafolio/${c.slug}`}
                          className="flex items-center gap-1 text-xs font-bold text-[#1251a3] hover:text-[#0a1525] transition-colors"
                        >
                          Ver caso completo <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Próximamente */}
            <div className="rounded-2xl border-2 border-dashed border-[#b8d0ef] bg-white p-12 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dce8f7] text-[#1251a3] mb-6">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Más casos en camino</h3>
              <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
                Actualmente estamos documentando nuestros proyectos más recientes para compartirlos
                con detalle. Próximamente verás más casos de éxito aquí.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-black text-white mb-5">
              ¿Quieres resultados así para tu negocio?
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Cuéntanos tu reto y diseñaremos una solución digital a tu medida.
              Propuesta en menos de 24 horas hábiles, sin compromiso.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white text-[#0f274f] font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-95 transition-opacity"
            >
              Solicitar diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-blue-200 text-xs">
              ✓ Respuesta en menos de 24 horas hábiles &nbsp;·&nbsp; ✓ Sin compromiso
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
