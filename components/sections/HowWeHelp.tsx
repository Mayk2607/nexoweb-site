import Link from "next/link";
import { ArrowRight, TrendingUp, Settings, Server, Code2 } from "lucide-react";

const NEEDS = [
  {
    Icon: TrendingUp,
    headline: "Quiero atraer más clientes",
    description:
      "Construye presencia digital y estrategias que conviertan audiencias en oportunidades reales de negocio.",
    services: [
      { label: "Diseño Web",        slug: "diseno-desarrollo-web" },
      { label: "SEO",               slug: "posicionamiento-seo" },
      { label: "Marketing Digital", slug: "marketing-digital" },
      { label: "Publicidad Digital",slug: "publicidad-facebook-instagram-ads" },
    ],
    iconBg:   "bg-blue-100 text-blue-700",
    cardBg:   "bg-blue-50 border-blue-100",
    tagColor: "bg-white text-blue-700 border-blue-200 hover:bg-blue-100",
    ctaColor: "text-blue-700 hover:text-blue-900",
  },
  {
    Icon: Settings,
    headline: "Quiero digitalizar mi operación",
    description:
      "Automatiza procesos, centraliza información y haz crecer tu empresa con software desarrollado a tu medida.",
    services: [
      { label: "CRM Comercial",       slug: "crm-gestion-comercial" },
      { label: "Automatización",      slug: "automatizacion-de-procesos" },
      { label: "Integraciones",       slug: "integracion-de-sistemas" },
      { label: "Transformación Digital", slug: "transformacion-digital" },
    ],
    iconBg:   "bg-violet-100 text-violet-700",
    cardBg:   "bg-violet-50 border-violet-100",
    tagColor: "bg-white text-violet-700 border-violet-200 hover:bg-violet-100",
    ctaColor: "text-violet-700 hover:text-violet-900",
  },
  {
    Icon: Server,
    headline: "Quiero modernizar mi infraestructura",
    description:
      "Migra a la nube, protege tus datos y opera con la tecnología correcta para la escala de tu empresa.",
    services: [
      { label: "Cloud",          slug: "soluciones-en-la-nube" },
      { label: "Hosting",        slug: "hosting-hospedaje-web" },
      { label: "Ciberseguridad", slug: "ciberseguridad-proteccion-datos" },
      { label: "Backups",        slug: "respaldo-recuperacion-informacion" },
    ],
    iconBg:   "bg-emerald-100 text-emerald-700",
    cardBg:   "bg-emerald-50 border-emerald-100",
    tagColor: "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    ctaColor: "text-emerald-700 hover:text-emerald-900",
  },
  {
    Icon: Code2,
    headline: "Quiero construir una solución tecnológica",
    description:
      "Desde aplicaciones móviles hasta plataformas empresariales complejas e inteligencia artificial.",
    services: [
      { label: "Apps Móviles",         slug: "desarrollo-aplicaciones-moviles" },
      { label: "Plataformas Enterprise",slug: "plataformas-empresariales-enterprise" },
      { label: "Inteligencia Artificial",slug: "inteligencia-artificial" },
      { label: "Business Intelligence", slug: "business-intelligence-dashboards" },
    ],
    iconBg:   "bg-orange-100 text-orange-700",
    cardBg:   "bg-orange-50 border-orange-100",
    tagColor: "bg-white text-orange-700 border-orange-200 hover:bg-orange-100",
    ctaColor: "text-orange-700 hover:text-orange-900",
  },
];

export function HowWeHelp() {
  return (
    <section className="bg-[#0d1f35] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#94b8e8] mb-4">¿Cómo podemos ayudarte?</p>
          <h2 className="text-4xl font-black text-white leading-[1.1] mb-4">
            Dinos qué necesitas.<br />
            <span className="text-[#94b8e8]">Tenemos la solución.</span>
          </h2>
          <p className="text-[#b8d0ef] text-lg leading-relaxed">
            No importa en qué etapa esté tu empresa. Identificamos el reto y
            construimos la solución tecnológica correcta para resolverlo.
          </p>
        </div>

        {/* Grid de necesidades */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {NEEDS.map(({ Icon, headline, description, services, iconBg, cardBg, tagColor, ctaColor }) => (
            <div
              key={headline}
              className={`flex flex-col gap-5 rounded-2xl border p-7 ${cardBg}`}
            >
              {/* Icono + headline */}
              <div className="flex items-start gap-4">
                <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-black text-gray-900 text-lg leading-snug">{headline}</h3>
              </div>

              {/* Descripción */}
              <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

              {/* Tags — cada uno va al servicio específico */}
              <div className="flex flex-wrap gap-2">
                {services.map(({ label, slug }) => (
                  <Link
                    key={slug}
                    href={`/servicios/${slug}`}
                    className={`inline-flex items-center gap-1 text-xs font-semibold border rounded-full px-3 py-1.5 transition-colors ${tagColor}`}
                  >
                    {label} <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/contacto`}
                className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors mt-auto ${ctaColor}`}
              >
                Solicitar diagnóstico gratuito <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Pie */}
        <p className="text-center text-[#7a96b8] text-sm">
          ¿Tu caso es más específico?{" "}
          <Link href="/contacto" className="text-[#94b8e8] font-semibold hover:text-white transition-colors">
            Cuéntanos tu reto y te proponemos la solución →
          </Link>
        </p>
      </div>
    </section>
  );
}
