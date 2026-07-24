import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { process as steps } from "@/config/data";

const GUARANTEES = [
  { value: "< 24 h", label: "Tiempo de respuesta inicial" },
  { value: "Semanal", label: "Entregas y reportes de avance" },
  { value: "100%", label: "Transparencia en cada etapa" },
];

export function Process() {
  return (
    <section id="proceso" className="bg-[#f0f4fa] py-28 border-t border-[#dce8f7]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Cómo trabajamos</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0d1f35] leading-tight">
              De la idea al resultado,<br />con claridad en cada paso.
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              No trabajamos con metodologías genéricas. Cada proyecto comienza con un diagnóstico real,
              continúa con entregas semanales medibles y termina con acompañamiento a largo plazo.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1251a3] hover:text-[#0d1f35] transition-colors"
            >
              Iniciar diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              {i < steps.length - 1 && i % 4 !== 3 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%+10px)] right-[-10px] h-px bg-gradient-to-r from-[#1251a3]/40 to-transparent z-0" />
              )}
              <div className="relative z-10 bg-white rounded-2xl border border-[#dce8f7] p-7 h-full flex flex-col gap-4 hover:border-[#1251a3]/40 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1251a3] text-white font-black text-base">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="h-px flex-1 bg-[#dce8f7]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1f35] text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees bar */}
        <div className="grid sm:grid-cols-3 gap-4">
          {GUARANTEES.map((g) => (
            <div key={g.label} className="bg-white rounded-2xl border border-[#dce8f7] px-8 py-6 flex items-center gap-5">
              <span className="text-2xl font-black text-[#1251a3] tabular-nums shrink-0">{g.value}</span>
              <span className="text-sm text-gray-700 leading-snug font-medium">{g.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
