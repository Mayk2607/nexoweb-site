import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { serviceCategories, services } from "@/config/data";

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/nexowebmx",
    svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexowebmx",
    svg: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "X",
    href: "https://x.com/nexowebmx",
    svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nexowebmx/",
    svg: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1f35] text-[#7a96b8]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-[#1a3356]">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nexoweb-logo-blanco.svg"
              alt="Nexoweb"
              className="h-12 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              Empresa mexicana de soluciones tecnológicas. Estrategia digital, ingeniería de software e infraestructura para empresas que quieren crecer.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="tel:8447993983" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-[#5a8fd4] shrink-0" /> 844 799 3983
              </a>
              <a href="https://wa.me/5218447993983" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4 text-[#5a8fd4] shrink-0" /> WhatsApp directo
              </a>
              <a href="mailto:consultoria@nexoweb.mx" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-[#5a8fd4] shrink-0" /> consultoria@nexoweb.mx
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#5a8fd4] shrink-0" /> Saltillo, Coahuila · México
              </span>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-[#1a3356] text-[#7a96b8] hover:bg-[#1251a3] hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    {svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Servicios por categoría */}
          {serviceCategories.map((cat) => (
            <div key={cat.id}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">{cat.title}</h4>
              <ul className="space-y-2.5">
                {services.filter((s) => s.category === cat.id).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {year} Nexoweb. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-[#7a96b8] transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#7a96b8] transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
