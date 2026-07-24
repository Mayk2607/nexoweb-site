import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolioCases } from "@/config/data";

export function Portfolio() {
  return (
    <section id="portafolio" className="bg-white py-24 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Portafolio</p>
            <h2 className="text-4xl font-black tracking-tight text-gray-900">
              Casos de éxito reales.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioCases.map((c) => (
            <article key={c.slug} className="group overflow-hidden rounded-2xl border border-gray-200 hover:border-[#b8d0ef] hover:shadow-xl transition-all">
              {/* Image */}
              <div className="relative h-60 bg-gray-100 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">{c.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">{c.result}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-600 font-medium">Duración: {c.duration}</span>
                  <div className="flex items-center gap-4">
                    {c.link && (
                      <a href={c.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-[#1251a3] transition-colors">
                        Sitio en vivo <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Link href={`/portafolio/${c.slug}`}
                      className="flex items-center gap-1 text-xs font-bold text-[#1251a3] hover:text-[#0a1525] transition-colors">
                      Caso completo <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
