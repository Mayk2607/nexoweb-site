"use client";

import { motion } from "framer-motion";
import { niches } from "../../config/data";
import { Target, CheckCircle2 } from "lucide-react";

export function Niches() {
  return (
    <section className="bg-gradient-to-b from-[#f4f7fb] to-white py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1c4a8f]/20 bg-[#1c4a8f]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c4a8f]">
              <Target className="w-4 h-4" /> Casos de Uso Especializados
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Verticales de negocio
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-slate-600 leading-relaxed"
          >
            Combinamos contexto, ejecución técnica y enfoque absoluto en resultados comerciales adaptados a tu sector.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {niches.map((niche, i) => (
            <motion.article
              key={niche.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl hover:-translate-y-1"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-[#1c4a8f]/5 to-transparent blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-slate-900">{niche.title}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-[#1c4a8f]">
                  {niche.zone}
                </p>
                
                <ul className="mt-8 space-y-4">
                  {niche.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1c4a8f]" />
                      <span className="leading-relaxed font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
