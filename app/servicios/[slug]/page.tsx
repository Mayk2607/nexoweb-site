import { services } from "../../../config/data";
import { serviceExtras, whyChooseBySlug } from "../../../config/service-extras";
import { serviceImages } from "../../../config/service-images";
import { notFound } from "next/navigation";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import {
  CheckCircle2, ArrowRight, Home, ChevronRight,
  Clock, Users, ChevronDown, Star, Building2,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Servicio no encontrado" };
  return {
    title: service.title,
    description: service.description,
  };
}

const categoryLabel: Record<string, string> = {
  presencia: "Presencia Digital",
  marketing: "Marketing y Captación",
  tecnologia: "Tecnología Empresarial",
};

const accent: Record<string, { badge: string; check: string; stepBg: string; planBorder: string; planCheck: string }> = {
  presencia:  { badge: "bg-blue-50 text-blue-700 border-blue-200",   check: "text-blue-500",   stepBg: "bg-blue-600",   planBorder: "border-blue-500",   planCheck: "text-blue-500" },
  marketing:  { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", check: "text-emerald-500", stepBg: "bg-emerald-600", planBorder: "border-emerald-500", planCheck: "text-emerald-500" },
  tecnologia: { badge: "bg-violet-50 text-violet-700 border-violet-200",   check: "text-violet-500",  stepBg: "bg-violet-600",  planBorder: "border-violet-500",  planCheck: "text-violet-500" },
};

const howWeWork = [
  { step: "01", title: "Reunión de descubrimiento", text: "Conocemos tu negocio, tus objetivos y los retos que quieres resolver. Sin tecnicismos, con escucha real." },
  { step: "02", title: "Análisis de necesidades", text: "Evaluamos tu situación actual y definimos con claridad el alcance y los entregables del proyecto." },
  { step: "03", title: "Propuesta personalizada", text: "Te presentamos una propuesta clara con precios, tiempos y el plan de trabajo. Sin letra chica." },
  { step: "04", title: "Desarrollo e implementación", text: "Ejecutamos con comunicación constante. Tienes visibilidad del avance en todo momento." },
  { step: "05", title: "Entrega, capacitación y acompañamiento", text: "Entregamos, te capacitamos y te acompañamos en los primeros pasos para que todo funcione desde el día uno." },
];

const whyChooseFallback: Record<string, string[]> = {
  presencia: [
    "Diseño a medida — construido con tu identidad y objetivos, no con plantillas genéricas.",
    "Entregas visibles desde las primeras semanas — metodología ágil, no esperas meses para ver resultados.",
    "SEO técnico incluido — tu presencia llega a Google desde el primer día.",
    "Sin costos ocultos — la propuesta que apruebas es lo que pagas. Transparencia total.",
    "Capacitación incluida — editas y administras tu plataforma con autonomía.",
    "Garantía post-entrega — no desaparecemos cuando lanzamos. Seguimos contigo.",
  ],
  marketing: [
    "Estrategia basada en datos reales — cada decisión tiene respaldo analítico, no intuición.",
    "Reportes claros y honestos — sabes exactamente qué generó cada peso de tu inversión.",
    "Sin intermediarios — el mismo equipo que planea es quien ejecuta tu estrategia.",
    "Optimización continua — ajustamos en tiempo real según lo que muestran los resultados.",
    "Integración con tu sitio y CRM — trazabilidad completa del lead hasta la venta.",
    "Sin contratos de permanencia — nos quedamos porque los resultados nos respaldan.",
  ],
  tecnologia: [
    "Sistemas diseñados para tu proceso real — el software se adapta a ti, no al revés.",
    "Implementación guiada — acompañamos a tu equipo en la adopción desde el día uno.",
    "Arquitectura escalable — crece sin necesidad de rehacer todo desde cero.",
    "Sin vendor lock-in — eres dueño del código, los datos y la infraestructura.",
    "Documentación completa — cualquier técnico puede mantener y evolucionar lo que construimos.",
    "Soporte técnico directo — acceso al equipo que construyó tu sistema, no a un helpdesk externo.",
  ],
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const a = accent[service.category] ?? accent.presencia;
  const extras = serviceExtras[service.slug];
  const whyNexoweb = whyChooseBySlug[service.slug] ?? whyChooseFallback[service.category] ?? whyChooseFallback.presencia;

  const crossSell = extras?.relatedServices
    ?.map((rSlug) => services.find((s) => s.slug === rSlug))
    .filter((s): s is typeof services[0] => !!s) ?? [];
  const related = crossSell.length > 0
    ? crossSell.slice(0, 3)
    : services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  const ctaHref = `/contacto?servicio=${service.slug}`;
  const heroImage = serviceImages[service.slug] ?? service.image;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 bg-white border-b border-gray-200 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_-10%,_rgba(18,81,163,0.07),_transparent)]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex mb-10 text-sm text-gray-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-[#1251a3] transition-colors"><Home className="w-4 h-4" /></Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/servicios" className="hover:text-[#1251a3] transition-colors">Servicios</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="font-medium text-gray-900 truncate max-w-[240px]">{service.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${a.badge}`}>
                  {categoryLabel[service.category]}
                </span>
                {service.timeline && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                    <Clock className="h-3.5 w-3.5" /> {service.timeline}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-[1.08] mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-gray-500 font-medium mb-5 leading-relaxed">{service.tagline}</p>
              <p className="text-base text-gray-600 leading-relaxed mb-8">{service.description}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#1251a3] text-white font-bold text-sm hover:bg-[#0d1f35] transition-colors shadow-lg shadow-[#1251a3]/20">
                  Solicitar una asesoría <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:border-[#94b8e8] hover:text-[#1251a3] transition-colors">
                  Ver todos los servicios
                </Link>
              </div>
            </div>

            {heroImage && (
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200">
                <img src={heroImage} alt={service.title} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1f35]/20 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6">

          {/* Encabezado con contexto */}
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Qué incluye</p>
              <h2 className="text-3xl font-black text-gray-900 leading-tight">
                Todo lo que obtienes con<br />{service.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm">
                <Users className="h-4 w-4 text-[#1251a3] shrink-0" />
                <span className="text-sm text-gray-700 leading-snug">{service.forWho}</span>
              </div>
              {service.timeline && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm">
                  <Clock className="h-4 w-4 text-[#1251a3] shrink-0" />
                  <span className="text-sm font-bold text-gray-900">{service.timeline}</span>
                </div>
              )}
            </div>
          </div>

          {/* Benefits numerados */}
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {service.benefits.map((b, i) => (
              <li key={b} className="flex gap-4 rounded-xl bg-white border border-gray-200 p-6 hover:border-[#b8d0ef] hover:shadow-md transition-all">
                <div className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white ${a.stepBg}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{b}</p>
              </li>
            ))}
          </ul>

          {/* CTA banner */}
          <div className="rounded-2xl bg-[#0d1f35] px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-black text-white text-lg mb-1">¿Listo para empezar?</p>
              <p className="text-[#b8d0ef] text-sm">Propuesta personalizada en menos de 24 horas. Sin costo ni compromiso.</p>
            </div>
            <Link href={ctaHref}
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#1251a3] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#1a3a7a] transition-colors whitespace-nowrap">
              Solicitar una asesoría <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ ELEGIR NEXOWEB? ─────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Por qué elegirnos</p>
              <h2 className="text-2xl font-black text-gray-900 mb-4">¿Por qué elegir Nexoweb?</h2>
              <p className="text-gray-600 leading-relaxed">Somos tu empresa de soluciones digitales: diseño, tecnología y marketing en un solo equipo, comprometido con los resultados de tu negocio.</p>
            </div>
            <ul className="space-y-4">
              {whyNexoweb.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-[#1251a3]" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PLANES Y PRECIOS ─────────────────────────────────────────────────── */}
      {extras?.plans && extras.plans.length > 0 && (
        <section className="py-20 bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Planes y precios</p>
              <h2 className="text-2xl font-black text-gray-900 mb-3">Elige el plan que se adapta a tu etapa</h2>
              <p className="text-gray-600">Todos los planes incluyen propuesta personalizada. Los precios son referenciales y pueden ajustarse según el alcance de tu proyecto.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {extras.plans.map((plan) => (
                <div key={plan.name}
                  className={`relative flex flex-col rounded-2xl border-2 p-7 transition-all ${
                    plan.recommended
                      ? `${a.planBorder} shadow-lg`
                      : "border-gray-200"
                  }`}>
                  {plan.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#1251a3] px-4 py-1 text-xs font-black text-white shadow">
                        <Star className="h-3 w-3 fill-white" /> Más popular
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{plan.name}</p>

                  {/* Price */}
                  <p className="text-xs text-gray-400 mb-1">Desde</p>
                  <p className="text-2xl font-black text-gray-900 mb-2">{plan.price}</p>

                  {/* Type badge */}
                  {plan.type && (
                    <span className="inline-flex items-center self-start gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-500 mb-2">
                      {plan.type === "monthly" ? "🔄 Servicio mensual" : "📋 Proyecto único"}
                    </span>
                  )}

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-400 italic mb-5 leading-relaxed">
                    Precio inicial de referencia. La cotización final depende del alcance y los requerimientos específicos de tu proyecto.
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{plan.description}</p>

                  {/* Includes */}
                  <ul className="space-y-3 mb-8">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${a.planCheck}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contacto?servicio=${service.slug}&nota=${encodeURIComponent(`Interesado en el plan: ${plan.name} (${plan.price})`)}`}
                    className={`flex items-center justify-center gap-2 w-full rounded-lg px-5 py-3 text-sm font-bold transition-colors ${
                      plan.recommended
                        ? "bg-[#1251a3] text-white hover:bg-[#0d1f35]"
                        : "border border-gray-300 text-gray-700 hover:border-[#1251a3] hover:text-[#1251a3]"
                    }`}>
                    Solicitar una asesoría <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 mt-8">
              ¿Necesitas algo diferente? Cotizamos proyectos a medida.{" "}
              <Link href={ctaHref} className="text-[#1251a3] font-semibold hover:underline">Contáctanos →</Link>
            </p>
          </div>
        </section>
      )}

      {/* ── CASOS DE USO POR INDUSTRIA ───────────────────────────────────────── */}
      {extras?.useCases && extras.useCases.length > 0 && (
        <section className="py-20 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Casos de uso</p>
              <h2 className="text-2xl font-black text-gray-900 mb-3">¿En qué industrias aplica este servicio?</h2>
              <p className="text-gray-600">Ejemplos reales de cómo empresas como la tuya usan este servicio para crecer.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {extras.useCases.map((uc) => (
                <div key={uc.industry} className="flex gap-4 rounded-xl bg-gray-50 border border-gray-200 p-6 hover:border-[#b8d0ef] hover:shadow-md transition-all">
                  <div className="shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f4fa] text-[#1251a3]">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm mb-2">{uc.industry}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{uc.scenario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ¿CÓMO TRABAJAMOS? ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Nuestro proceso</p>
            <h2 className="text-2xl font-black text-gray-900">¿Cómo trabajamos?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {howWeWork.map((step, i) => (
              <div key={step.step} className="relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
                {i < howWeWork.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-5 h-px bg-gray-300 z-10" />
                )}
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-white text-xs font-black ${a.stepBg}`}>
                  {step.step}
                </div>
                <h3 className="font-black text-gray-900 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-20 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Preguntas frecuentes</p>
              <h2 className="text-2xl font-black text-gray-900">Lo que más nos preguntan sobre este servicio</h2>
            </div>
            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white overflow-hidden">
              {service.faq.map((item, i) => (
                <details key={i} className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-7 py-5 hover:bg-gray-50 transition-colors">
                    <span className="font-bold text-gray-900 text-sm pr-4">{item.q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-7 pb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICIOS RELACIONADOS ───────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">También te puede interesar</p>
                <h2 className="text-2xl font-black text-gray-900">Servicios relacionados</h2>
              </div>
              <Link href="/servicios" className="text-sm font-semibold text-[#1251a3] hover:text-[#0d1f35] transition-colors inline-flex items-center gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link key={s.slug} href={`/servicios/${s.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 hover:border-[#94b8e8] hover:shadow-md transition-all">
                  <h3 className="font-black text-gray-900 text-sm group-hover:text-[#1251a3] transition-colors">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{s.tagline}</p>
                  {s.timeline && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" /> {s.timeline}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1251a3] group-hover:gap-2 transition-all">
                    Ver servicio <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#0d1f35] via-[#0d2a52] to-[#1251a3] text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black text-white mb-4">¿Listo para dar el siguiente paso?</h2>
          <p className="text-[#b8d0ef] text-lg mb-10 leading-relaxed">
            Cuéntanos tu reto. Te respondemos en menos de 24 horas con una propuesta clara y sin rodeos.
          </p>
          <Link href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-[#0d1f35] font-black px-8 py-4 rounded-xl shadow-xl hover:opacity-95 transition-opacity text-sm">
            Solicitar una asesoría <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
