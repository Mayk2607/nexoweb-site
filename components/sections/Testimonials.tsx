import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Lic. Jenny Nava",
    company: "Alpha Dent Service",
    role: "Alpha Dent Service — Saltillo, Coahuila",
    quote:
      "Nexoweb transformó por completo nuestra operación. Pasamos de agendar por WhatsApp a tener un sistema completo de reservas automatizadas y control financiero. El resultado superó lo que esperábamos.",
    result: "Ecosistema digital completo en 6 semanas",
  },
  {
    name: "Ing. Daniel Murillo",
    company: "DML Security",
    role: "DML Security — Saltillo, Coahuila",
    quote:
      "Necesitábamos una presencia digital que reflejara nuestro nivel empresarial. Lo que entregó Nexoweb es exactamente eso: profesional, rápido y orientado a captar clientes B2B desde el primer día.",
    result: "Plataforma de captación B2B activa 24/7",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-white py-24 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Lo que dicen nuestros clientes</p>
            <h2 className="text-4xl font-black tracking-tight text-gray-900">
              Resultados que hablan<br className="hidden sm:block" /> por sí solos.
            </h2>
          </div>
          <Link
            href="/portafolio"
            className="flex items-center gap-2 text-sm font-bold text-[#1251a3] hover:text-[#0d1f35] transition-colors shrink-0"
          >
            Ver casos completos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.company}
              className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-[#b8d0ef] hover:bg-white transition-all"
            >
              <Quote className="h-8 w-8 text-[#b8d0ef] shrink-0" />
              <blockquote className="text-gray-700 leading-relaxed text-base flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#dce8f7] px-3 py-1 text-xs font-semibold text-[#1251a3]">
                  {t.result}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
