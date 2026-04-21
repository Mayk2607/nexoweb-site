"use client";

import { motion } from "framer-motion";
import { ecosystemLayers } from "../../config/data";
import { Box } from "lucide-react";

export function Ecosystem() {
  return (
    <section className="bg-white py-24 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            Cómo funciona el ecosistema
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-slate-600"
          >
            Construimos una arquitectura digital por capas para que cada inversión genere impacto medible y escalable.
          </motion.p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ecosystemLayers.map((layer, i) => (
            <motion.article
              key={layer.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
