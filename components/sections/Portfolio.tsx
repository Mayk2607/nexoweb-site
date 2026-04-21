"use client";

import { motion } from "framer-motion";
import { cases } from "../../config/data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

      <div className="grid gap-8 md:grid-cols-2">
        {cases.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/portafolio/${item.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl hover:-translate-y-1 block"
          >
            <div className="relative h-72 w-full overflow-hidden border-b border-slate-100 bg-[#0a1224]">
              {item.image && (
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              )}
            </div>
            <div className="p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-[#1c4a8f]">
                  {item.name}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f7fb] text-[#1c4a8f] transition group-hover:bg-[#1c4a8f] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                {item.result}
              </p>
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
