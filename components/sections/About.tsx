import { Layers, MapPin, Zap, Shield, Headphones, TrendingUp } from "lucide-react";
import { differentiators } from "@/config/data";

const ICONS = { Layers, MapPin, Zap, Shield, Headphones, TrendingUp } as Record<string, React.ElementType>;

const NUMBERS = [
  { v: "10+", l: "Años de experiencia" },
  { v: "31",  l: "Servicios especializados" },
  { v: "< 24h", l: "Tiempo de respuesta" },
  { v: "100%", l: "Propiedad de tu tecnología" },
];

export function About() {
  return (
    <section id="nosotros" className="bg-white py-20 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-6 items-stretch">

          {/* Panel oscuro izquierdo */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0d1f35] via-[#1251a3] to-[#0a2a52] p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#94b8e8] mb-4">Quiénes somos</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-5">
                Nexoweb es una empresa mexicana especializada en soluciones tecnológicas para empresas.
              </h2>
              <p className="text-[#b8d0ef] text-base leading-relaxed">
                Integramos estrategia digital, ingeniería de software e infraestructura tecnológica
                en un solo equipo. Nuestro objetivo es ser el aliado tecnológico de largo plazo
                de nuestros clientes.
              </p>
            </div>

            {/* Números */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {NUMBERS.map((n) => (
                <div key={n.l} className="rounded-xl bg-white/10 border border-white/10 px-4 py-4">
                  <p className="text-2xl font-black text-white tabular-nums">{n.v}</p>
                  <p className="text-xs text-[#94b8e8] mt-1 leading-snug">{n.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diferenciadores */}
          <div className="grid sm:grid-cols-2 sm:grid-rows-3 gap-4 h-full">
            {differentiators.map((d) => {
              const Icon = ICONS[d.icon];
              return (
                <div
                  key={d.title}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-[#b8d0ef] hover:bg-white transition-colors h-full"
                >
                  {Icon && (
                    <div className="shrink-0 mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#dce8f7] text-[#1251a3]">
                      <Icon className="h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{d.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{d.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
