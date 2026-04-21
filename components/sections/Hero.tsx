"use client";

import { motion } from "framer-motion";
import { metrics } from "../../config/data";
import { ArrowRight, BarChart } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-6 pt-32 pb-14 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1c4a8f]/20 bg-[#1c4a8f]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1c4a8f]"
      >
        <BarChart className="w-4 h-4" /> Ecosistema digital para crecimiento real
      </motion.div>
      <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
            Convierte tu presencia digital en una{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f274f] to-[#2c63b8]">
              máquina de crecimiento.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Unificamos marca, tecnología, marketing y soporte IT para que escales con estrategia, ejecución y control total.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl hover:-translate-y-0.5"
            >
              Agendar diagnóstico <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              Ver ecosistema
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 relative z-10">
            Nexoweb en acción
          </p>
          <div className="mt-6 grid grid-cols-2 gap-5 relative z-10">
            {metrics.map((metric, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                key={metric.label}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-slate-50 transition-colors"
              >
                <p className="text-3xl font-bold text-[#0f274f]">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-600 font-medium leading-snug">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
