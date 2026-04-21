"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  "Cómo construir una marca digital consistente",
  "CRM para equipos comerciales: guía práctica",
  "Captación de clientes: estrategia y medición",
];

export function Blog() {
  return (
    <section id="blog" className="bg-[#f4f7fb] py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
        >
          Blog y Recursos
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg hover:border-[#1c4a8f]/30"
            >
              <div>
                <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Artículo destacado
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {post}
                </h3>
              </div>
              <a
                href="#contacto"
                className="mt-8 flex items-center gap-2 text-sm font-bold text-[#1c4a8f] transition hover:text-[#0f274f]"
              >
                Leer más <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
