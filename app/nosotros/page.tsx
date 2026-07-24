import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2, Home, ChevronRight, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Quiénes Somos — Empresa de Soluciones Digitales en Saltillo | Nexoweb",
  description:
    "Conoce el equipo de Nexoweb: empresa de soluciones digitales fundada en Saltillo, Coahuila. Más de 10 años transformando negocios con diseño web, tecnología y marketing digital.",
};

const TIMELINE = [
  {
    year: "2013–2023",
    title: "10 años en las trincheras del mundo digital",
    body: "Antes de existir Nexoweb como empresa, su equipo ya estaba construyendo sitios web, sistemas a medida, campañas digitales y automatizaciones para negocios de distintas industrias. Aprendimos haciendo: proyectos que fallaron, proyectos que escalaron, clientes que crecieron y lecciones que no se aprenden en ninguna universidad.",
  },
  {
    year: "2023",
    title: "Mario Murillo funda Nexoweb",
    body: "A finales de 2023, Mario Murillo —con años de experiencia liderando proyectos digitales— tomó la decisión de construir algo diferente. No otro proveedor genérico. Una empresa de soluciones digitales con identidad propia, con equipo especializado y con un modelo de trabajo orientado 100% a los resultados del cliente.",
  },
  {
    year: "2024",
    title: "Primeros proyectos, primeros casos de éxito",
    body: "Alpha Dent Service, DML Security y otros clientes de distintos sectores confiaron en Nexoweb para digitalizar sus operaciones. Ecosistemas completos, CRM a medida, portales financieros y campañas con retorno medible. El equipo demostró que el tamaño de la empresa no determina la calidad de la solución.",
  },
  {
    year: "Hoy",
    title: "31 servicios, un solo equipo comprometido",
    body: "Nexoweb opera con un catálogo de 31 servicios tecnológicos especializados, organizados en tres grandes áreas: Presencia Digital, Marketing y Captación, y Tecnología Empresarial. Seguimos siendo una empresa joven, pero cargamos décadas de experiencia colectiva.",
  },
];

const VALUES = [
  {
    title: "Claridad antes que velocidad",
    body: "Preferimos tomarnos el tiempo necesario para entender tu negocio antes de escribir una línea de código o lanzar un anuncio. Las soluciones apresuradas cuestan más a largo plazo.",
  },
  {
    title: "Propiedad total para el cliente",
    body: "Todo lo que construimos es tuyo: código, dominios, cuentas, accesos. No creamos dependencia tecnológica. Si el día de mañana decides continuar con otro equipo, te entregamos todo.",
  },
  {
    title: "Resultados por encima de entregables",
    body: "Un sitio web bonito que no convierte no sirve. Una campaña que gasta sin retorno no funciona. Medimos nuestro trabajo en resultados de negocio, no en horas facturadas.",
  },
  {
    title: "Tecnología accesible para todos",
    body: "Creemos que las pymes y los negocios en crecimiento merecen las mismas soluciones que las grandes corporaciones. La tecnología no debería ser un privilegio de las empresas grandes.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-28 overflow-hidden bg-gradient-to-br from-[#1251a3] via-[#0d2a52] to-[#0d1f35]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_70%_30%,_rgba(220,232,248,0.12),_transparent)]" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <nav className="flex mb-10 text-sm text-[#93c5fd]">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link></li>
                <li><ChevronRight className="w-4 h-4 opacity-50" /></li>
                <li className="text-white font-medium">Nosotros</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd] mb-5">
                  Nuestra historia
                </p>
                <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                  Una empresa nueva.<br />
                  <span className="text-[#93c5fd]">Un equipo con décadas de experiencia.</span>
                </h1>
                <p className="text-[#b8d0ef] text-lg leading-relaxed">
                  Nexoweb nació a finales de 2023, pero las personas detrás de ella llevan más de 10 años construyendo,
                  rompiendo y escalando proyectos digitales reales. Esa experiencia es lo que ponemos a trabajar para ti.
                </p>
              </div>

              {/* Stats card */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "2023", l: "Año de fundación" },
                  { v: "10+", l: "Años de experiencia del equipo" },
                  { v: "31", l: "Servicios especializados" },
                  { v: "100%", l: "Comprometidos con tu éxito" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-[#0a1828] border border-[#1a3356] p-6">
                    <p className="text-3xl font-black text-white mb-1 tabular-nums">{s.v}</p>
                    <p className="text-sm text-[#dce8f8] leading-snug">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Founder quote ── */}
        <section className="bg-[#f0f4fa] py-20 border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Quote className="h-10 w-10 text-[#1251a3] mx-auto mb-6 opacity-60" />
            <blockquote className="text-2xl md:text-3xl font-bold text-[#0d1f35] leading-snug mb-8">
              &ldquo;Fundé Nexoweb porque vi que las empresas en crecimiento merecen un socio tecnológico real,
              no un proveedor que entrega y desaparece. Queremos ser parte del crecimiento de nuestros clientes,
              parte de su equipo, no solo un servicio más.&rdquo;
            </blockquote>
            <div className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#1251a3] flex items-center justify-center text-white font-black text-sm">
                MM
              </div>
              <div className="text-left">
                <p className="font-bold text-[#0d1f35] text-sm">Mario Murillo</p>
                <p className="text-xs text-gray-500">CEO & Fundador · Nexoweb</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Línea de tiempo</p>
              <h2 className="text-4xl font-black tracking-tight text-gray-900">
                El camino que nos trajo hasta aquí.
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#1251a3] via-[#1251a3]/30 to-transparent hidden md:block" />

              <div className="space-y-10">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 items-start">
                    {/* Year */}
                    <div className="flex items-center gap-4 md:justify-end">
                      <div className="hidden md:flex h-4 w-4 shrink-0 rounded-full bg-[#1251a3] ring-4 ring-[#f0f4fa] relative z-10" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#1251a3] bg-[#f0f4fa] border border-[#b8d0ef] rounded-full px-3 py-1">
                        {item.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:border-[#b8d0ef] hover:shadow-md transition-all">
                      <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="bg-gray-50 py-24 border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Lo que nos define</p>
              <h2 className="text-4xl font-black tracking-tight text-gray-900">
                Valores que guían cada decisión.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-2xl bg-white border border-gray-200 p-8 hover:border-[#b8d0ef] hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-[#1251a3] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-gray-900 mb-2">{v.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-gradient-to-br from-[#1251a3] via-[#0d2a52] to-[#0d1f35]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-black text-white mb-5">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-[#b8d0ef] text-lg mb-10 leading-relaxed">
              Cuéntanos tu proyecto. Te respondemos en menos de 24 horas con un diagnóstico claro y sin rodeos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1251a3] px-7 py-4 text-sm font-bold text-white hover:bg-white hover:text-[#0d1f35] transition-all shadow-lg"
              >
                Solicitar propuesta <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1a3356] px-7 py-4 text-sm font-bold text-[#b8d0ef] hover:border-[#1251a3] hover:text-white transition-all"
              >
                Ver nuestros servicios
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
