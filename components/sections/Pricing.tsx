"use client";

import { motion } from "framer-motion";
import { plans, webPackages } from "../../config/data";
import { Check, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

export function Pricing() {
  const [activeTab, setActiveTab] = useState<"web" | "global">("web");

  const currentPlans = activeTab === "web" ? webPackages : plans;

  return (
    <section id="paquetes" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
        >
          Paquetes y planes a la medida
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-slate-600"
        >
          Desde la presencia web de un negocio local, hasta ecosistemas 360 corporativos. 
          Desarrollamos soluciones reales (sin plantillas) para cada etapa de tu empresa.
        </motion.p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1.5 rounded-full inline-flex border border-slate-200 overflow-x-auto w-full max-w-fit justify-start md:justify-center flex-nowrap">
          <button
            onClick={() => setActiveTab("web")}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
              activeTab === "web"
                ? "bg-white text-[#1c4a8f] shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            )}
          >
            Web + Hosting (Pymes)
          </button>
          <button
            onClick={() => setActiveTab("global")}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
              activeTab === "global"
                ? "bg-white text-[#1c4a8f] shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            )}
          >
            Ecosistema 360 (Corporativo)
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {currentPlans.map((plan, i) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 flex flex-col h-full transition-transform",
              (plan as any).highlighted
                ? "border-2 border-[#1c4a8f] scale-100 lg:scale-105 z-10"
                : "border border-slate-200 mt-0 lg:mt-4 lg:mb-4"
            )}
          >
            {(plan as any).highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg whitespace-nowrap">
                Recomendado
              </div>
            )}
            
            <div className="mb-6 flex-shrink-0">
              <h3 className="text-2xl font-extrabold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-sm font-semibold text-[#1c4a8f]">{plan.idealFor}</p>
              {/* min-h to align summaries even if text wraps differently */}
              <p className="mt-3 text-sm leading-relaxed text-slate-600 min-h-[4.5rem]">
                {plan.summary}
              </p>
            </div>

            <div className="mb-8 rounded-2xl bg-slate-50 p-5 border border-slate-100 flex-shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Inversión inicial
              </p>
              <p className="text-3xl font-black text-slate-900">{plan.setupPrice}</p>
              
              <div className="my-4 h-px w-full bg-slate-200" />
              
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                {activeTab === "web" ? "Suscripción / Mantenimiento" : "Gestión Mensual"}
              </p>
              <p className="text-lg font-bold text-[#0f274f]">{plan.monthlyPrice}</p>
            </div>

            <div className="flex-1 space-y-6">
              {plan.breakdown.map((group) => (
                <div key={group.title}>
                  <p className="text-sm font-bold text-slate-900 mb-3">{group.title}</p>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1c4a8f]" strokeWidth={3} />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 flex-shrink-0">
              <a
                href={(plan as any).buttonLink || "#contacto"}
                target={(plan as any).buttonLink?.startsWith("http") ? "_blank" : "_self"}
                rel={(plan as any).buttonLink?.startsWith("http") ? "noopener noreferrer" : ""}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5",
                  (plan as any).highlighted
                    ? "bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] text-white"
                    : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                )}
              >
                <Calendar className="w-4 h-4" />
                {(plan as any).buttonText || "Agendar cita"}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
