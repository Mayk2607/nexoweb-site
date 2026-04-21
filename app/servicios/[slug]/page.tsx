import { services } from "../../../config/data";
import { notFound } from "next/navigation";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all services so they are built statically
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-[#f4f7fb] z-10" />
          {/* Vibrant colorful abstract blobs for more dynamic color */}
          <div className="absolute -top-40 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-[#1c4a8f]/20 to-[#00b4d8]/15 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#00b4d8]/15 to-[#1c4a8f]/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <Link href="/#servicios" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c4a8f] mb-6 hover:underline">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Volver a Servicios
              </Link>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>
            
            {service.image && (
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content & Benefits */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">El enfoque Nexoweb</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.content}
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">¿Qué incluye este servicio?</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1c4a8f] shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Individual Plans */}
      {service.individualPlans && service.individualPlans.length > 0 && (
        <section className="py-24 bg-[#f4f7fb]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Paquetes Individuales
              </h2>
              <p className="mt-4 text-slate-600">
                Opciones escalables diseñadas específicamente para {service.title.toLowerCase()}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
              {service.individualPlans.map((plan, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  <div className="mb-6 flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-3xl font-black text-[#0f274f] mt-4">{plan.price}</p>
                  </div>
                  
                  <div className="my-6 h-px w-full bg-slate-100 flex-shrink-0" />
                  
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#1c4a8f] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex-shrink-0">
                    <a
                      href="/#contacto"
                      className="block w-full text-center py-3 px-4 rounded-xl font-bold text-sm bg-[#1c4a8f] text-white shadow-lg shadow-[#1c4a8f]/25 hover:bg-[#0f274f] hover:-translate-y-0.5 transition-all"
                    >
                      Me interesa este plan
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Buscas una solución a la medida?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Agenda una llamada de diagnóstico gratuita de 30 minutos y construyamos un plan exacto para tus objetivos comerciales.
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
