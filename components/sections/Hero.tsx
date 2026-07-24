import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

const HIGHLIGHTS = [
  "Estrategia · Desarrollo · Infraestructura",
  "Propuesta personalizada en 24 horas",
  "Equipo dedicado en México",
];

const STATS = [
  { value: "+20", label: "Clientes activos" },
  { value: "+10 años", label: "Experiencia del equipo" },
  { value: "100%", label: "Propiedad de tu tecnología" },
  { value: "< 24 h", label: "Respuesta garantizada" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_-10%,_rgba(18,81,163,0.09),_transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#94b8e8] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Texto */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b8d0ef] bg-[#f0f4fa] px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1251a3] animate-pulse" />
              <span className="text-xs font-bold text-[#0d1f35] tracking-wide">
                Empresa de Soluciones Tecnológicas · Saltillo, Coahuila
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6">
              Tecnología que impulsa
              <br />
              <span className="text-[#1251a3]">el crecimiento de tu empresa.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Integramos estrategia digital, ingeniería de software e infraestructura
              tecnológica en un solo equipo comprometido con tus resultados.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {HIGHLIGHTS.map((h) => (
                <span key={h} className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <CheckCircle className="h-4 w-4 text-[#1251a3] shrink-0" /> {h}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1251a3] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0d1f35] transition-colors shadow-lg shadow-[#1251a3]/25"
              >
                Solicitar propuesta gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 hover:border-[#94b8e8] hover:text-[#1251a3] transition-colors"
              >
                Explorar capacidades
              </Link>
            </div>
            <p className="text-xs text-gray-400">
              ✓ Respuesta en menos de 24 horas &nbsp;·&nbsp; ✓ Sin compromiso &nbsp;·&nbsp; ✓ Propuesta personalizada
            </p>
          </div>

          {/* Imagen equipo */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1251a3]/15 border border-gray-200 -rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Equipo Nexoweb trabajando en soluciones digitales"
                width={720}
                height={480}
                className="w-full h-auto"
                priority
              />
              {/* Overlay sutil para dar profundidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/30 to-transparent" />
            </div>

            {/* Badge flotante: experiencia */}
            <div className="absolute -bottom-5 -left-6 rounded-xl bg-white shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#dce8f7] flex items-center justify-center">
                <span className="text-[#1251a3] font-black text-sm">10+</span>
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Años de experiencia</p>
                <p className="text-xs text-gray-500">Saltillo, México</p>
              </div>
            </div>

            {/* Badge flotante: tiempo */}
            <div className="absolute -top-4 -right-4 rounded-xl bg-[#1251a3] shadow-xl px-4 py-2.5">
              <p className="text-sm font-black text-white">{"< 24h"}</p>
              <p className="text-xs text-[#94b8e8]">Respuesta garantizada</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 mt-16">
          {STATS.map((s) => (
            <div key={s.value} className="bg-white px-6 py-6 text-center">
              <p className="text-3xl font-black text-[#1251a3] tabular-nums">{s.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
