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
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-[#1c4a8f]/30 flex flex-col"
          >
            {/* Image Header */}
            <div className="w-full h-48 relative overflow-hidden bg-slate-100">
              <img
                src={service.image || "/assets/media__1776786135245.png"}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#15366b] to-[#2c63b8] text-white shadow-md relative -mt-14 z-10 border-4 border-white">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-600 flex-1">{service.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
