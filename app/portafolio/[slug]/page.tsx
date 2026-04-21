import { cases } from "../../../config/data";
import { notFound } from "next/navigation";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return cases.map((item) => ({
    slug: item.slug,
  }));
}

export default async function PortfolioCasePage({ params }: Props) {
  const resolvedParams = await params;
  const portfolioCase = cases.find((c) => c.slug === resolvedParams.slug);

  if (!portfolioCase) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c4a8f]/5 via-white to-[#f4f7fb] z-10" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="mb-12">
            <Link href="/#portafolio" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c4a8f] mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Volver al Portafolio
            </Link>
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              
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
            </div>
          )}
        </div>
      </section>

      {/* Review Section */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Contexto - Columna Principal (2/3) */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-sm">1</span>
                  El Desafío (Antes)
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {portfolioCase.review?.before}
                </p>
              </div>

              <div className="h-px w-full bg-slate-100" />

              <div>
                <h2 className="text-2xl font-bold text-[#1c4a8f] mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c4a8f]/10 text-[#1c4a8f] text-sm">2</span>
                  La Solución (Después)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  {portfolioCase.review?.after}
                </p>
              </div>
            </div>
            
            {/* Ficha Técnica - Barra lateral (1/3) */}
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
            </div>

          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Quieres resultados similares para tu negocio?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Agenda una llamada de diagnóstico gratuita de 30 minutos. Analizaremos tus procesos y diseñaremos una solución digital a tu medida.
          </p>
          <a
            href="/#contacto"
            className="inline-block bg-white text-[#0f274f] font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform"
          >
            Agendar diagnóstico
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
