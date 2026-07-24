import { portfolioCases } from "../../../config/data";
import { notFound } from "next/navigation";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { ArrowRight, ArrowUpRight, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = portfolioCases.find((item) => item.slug === slug);
  if (!c) return { title: "Caso no encontrado" };
  return {
    title: c.name,
    description: c.result,
  };
}

export default async function PortfolioCasePage({ params }: Props) {
  const { slug } = await params;
  const portfolioCase = portfolioCases.find((c) => c.slug === slug);

  if (!portfolioCase) notFound();

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c4a8f]/5 via-white to-[#f4f7fb]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex mb-10 text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#1c4a8f] transition-colors">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li>
                <Link href="/portafolio" className="hover:text-[#1c4a8f] transition-colors">
                  Portafolio
                </Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                {portfolioCase.name}
              </li>
            </ol>
          </nav>

          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
              {portfolioCase.client}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-medium">
              {portfolioCase.result}
            </p>
          </div>

          {portfolioCase.image && (
            <div className="relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
              <Image
                src={portfolioCase.image}
                alt={portfolioCase.client}
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

              {portfolioCase.link && (
                <div className="absolute bottom-8 right-8 hidden sm:block">
                  <a
                    href={portfolioCase.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-[#0f274f] font-bold px-6 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform"
                  >
                    Visitar sitio web en vivo
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Case detail */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Antes / Después */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-sm">1</span>
                  El Desafío (Antes)
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {portfolioCase.before}
                </p>
              </div>

              <div className="h-px w-full bg-slate-100" />

              <div>
                <h2 className="text-2xl font-bold text-[#1c4a8f] mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c4a8f]/10 text-[#1c4a8f] text-sm">2</span>
                  La Solución (Después)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  {portfolioCase.after}
                </p>
              </div>
            </div>

            {/* Ficha técnica */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Ficha Técnica</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Cliente</p>
                  <p className="text-slate-900 font-medium">{portfolioCase.client}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Tiempo de ejecución</p>
                  <p className="text-slate-900 font-medium">{portfolioCase.duration}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Tecnologías / Soluciones</p>
                  <div className="flex flex-wrap gap-2">
                    {portfolioCase.tags?.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-medium text-[#1c4a8f] shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {portfolioCase.link && (
                <div className="mt-10">
                  <a
                    href={portfolioCase.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#0a1224] text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:bg-[#1c4a8f] transition-colors"
                  >
                    Ver Proyecto Real
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Quieres resultados similares para tu negocio?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Cuéntanos tu reto y diseñaremos una solución digital a tu medida.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-white text-[#0f274f] font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-95 transition-opacity"
          >
            Solicitar diagnóstico gratuito <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
