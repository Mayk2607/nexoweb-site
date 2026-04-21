"use client";

import { motion } from "framer-motion";
import { services } from "../../config/data";
import { Layers } from "lucide-react";

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Servicios todo-en-uno
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-md text-slate-600"
        >
          Cada servicio está diseñado para integrarse y aumentar el rendimiento comercial de tu negocio.
        </motion.p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-[#1c4a8f]/30"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#1c4a8f]/5 to-transparent blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#15366b] to-[#2c63b8] text-white shadow-md">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
