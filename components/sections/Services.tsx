"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services, serviceCategories } from "@/config/data";
import type { ServiceCategory } from "@/config/data";
import { serviceImages } from "@/config/service-images";

const accentColor: Record<ServiceCategory, string> = {
  presencia: "bg-blue-50 text-blue-700 border-blue-200",
  marketing: "bg-emerald-50 text-emerald-700 border-emerald-200",
  tecnologia: "bg-violet-50 text-violet-700 border-violet-200",
};

const checkColor: Record<ServiceCategory, string> = {
  presencia: "text-blue-500",
  marketing: "text-emerald-500",
  tecnologia: "text-violet-500",
};

const dotColor: Record<ServiceCategory, string> = {
  presencia: "bg-blue-500",
  marketing: "bg-emerald-500",
  tecnologia: "bg-violet-500",
};

export function Services() {
  const [active, setActive] = useState<ServiceCategory>("presencia");
  const filtered = services.filter((s) => s.category === active);
  const cat = serviceCategories.find((c) => c.id === active)!;

  return (
    <section id="servicios" className="bg-gray-50 py-24 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Servicios</p>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 leading-[1.1]">
              Todo lo que tu empresa necesita, en un solo lugar.
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            31 servicios especializados. 3 áreas de solución. Un equipo que trabaja contigo de principio a fin.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id as ServiceCategory)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                active === cat.id
                  ? "bg-[#1251a3] text-white border-[#1251a3] shadow-sm shadow-[#1251a3]/25"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#94b8e8] hover:text-[#1251a3]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Grid de cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filtered.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-[#94b8e8] hover:shadow-xl transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                {serviceImages[s.slug] ? (
                  <Image
                    src={serviceImages[s.slug]}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#dce8f7] to-[#f0f4fa]" />
                )}
                {/* Overlay suave al hover */}
                <div className="absolute inset-0 bg-[#1251a3]/0 group-hover:bg-[#1251a3]/10 transition-colors duration-300" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                {/* Badge */}
                <div className={`inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[11px] font-bold mb-3 ${accentColor[active]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${dotColor[active]}`} />
                  {cat.title}
                </div>

                {/* Título + tagline */}
                <h3 className="font-black text-gray-900 text-base leading-snug group-hover:text-[#1251a3] transition-colors mb-1">
                  {s.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-4">{s.tagline}</p>

                {/* 2 bullets */}
                <ul className="space-y-2 mb-5 flex-1">
                  {s.benefits.slice(0, 2).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${checkColor[active]}`} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1251a3] group-hover:gap-2.5 transition-all mt-auto">
                  Ver servicio completo <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA catálogo */}
        <div className="text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-[#94b8e8] hover:text-[#1251a3] transition-colors"
          >
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
