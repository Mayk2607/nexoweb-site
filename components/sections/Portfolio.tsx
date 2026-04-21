"use client";

import { motion } from "framer-motion";
import { cases } from "../../config/data";
import { ArrowUpRight } from "lucide-react";

export function Portfolio() {
  return (
    <section id="portafolio" className="mx-auto max-w-7xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
      >
        Resultados y casos de éxito
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((item, i) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1c4a8f]">
                {item.name}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f7fb] text-[#1c4a8f] opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 leading-snug">
              {item.result}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
