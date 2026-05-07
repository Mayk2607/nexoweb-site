import { ecosystemLayers } from "../../config/data";
import { Box } from "lucide-react";

export function Ecosystem() {
  return (
    <section className="bg-white py-12 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Cómo funciona el ecosistema
          </h2>
          <p className="mt-4 text-slate-600">
            Construimos una arquitectura digital por capas para que cada inversión genere impacto medible y escalable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ecosystemLayers.map((layer) => (
            <article
              key={layer.title}
              className="rounded-2xl border border-slate-100 bg-[#f4f7fb]/50 p-6 hover:bg-[#f4f7fb] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 text-[#1c4a8f]">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{layer.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
