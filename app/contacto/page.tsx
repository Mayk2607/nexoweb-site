import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto — Nexoweb | Empresa de Soluciones Digitales en Saltillo, Coahuila",
  description:
    "Habla con el equipo de Nexoweb. Propuesta personalizada en menos de 24 horas hábiles. Sin compromiso. Diseño web, marketing digital y sistemas a medida en Saltillo, México.",
  openGraph: {
    title: "Contacto — Nexoweb",
    description: "Propuesta personalizada en menos de 24 horas. Sin compromiso.",
    url: "https://nexoweb.mx/contacto",
    siteName: "Nexoweb",
    locale: "es_MX",
    type: "website",
  },
};

const INFO_ITEMS = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "844 799 3983",
    href: "tel:8447993983",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "844 799 3983",
    href: "https://wa.me/5218447993983",
    external: true,
  },
  {
    icon: Mail,
    label: "Correo",
    value: "consultoria@nexoweb.mx",
    href: "mailto:consultoria@nexoweb.mx",
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lunes a viernes · 9:00 am – 6:00 pm CST",
    href: null,
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Saltillo, Coahuila · México",
    href: null,
  },
];

const NEXT_STEPS = [
  { step: "01", title: "Recibimos tu solicitud", text: "Tu mensaje llega directamente al equipo de Nexoweb, sin intermediarios." },
  { step: "02", title: "Analizamos tus necesidades", text: "Revisamos tu proyecto y preparamos las preguntas clave antes de contactarte." },
  { step: "03", title: "Nos comunicamos contigo", text: "Te contactamos por el medio de tu preferencia en menos de 24 horas hábiles." },
  { step: "04", title: "Elaboramos tu propuesta", text: "Diseñamos una propuesta personalizada con alcance, tiempos y precio claro." },
  { step: "05", title: "Presentamos y afinamos", text: "Agendamos una reunión para presentar la propuesta y resolver todas tus dudas." },
];

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-white border-b border-gray-200 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_-10%,_rgba(18,81,163,0.07),_transparent)]" />
          </div>
          <div className="mx-auto max-w-7xl px-6 relative z-10">

            {/* Breadcrumb */}
            <nav className="flex mb-10 text-sm text-gray-500">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#1251a3] transition-colors">
                    <Home className="w-4 h-4" />
                  </Link>
                </li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="font-medium text-gray-900">Contacto</li>
              </ol>
            </nav>

            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Contacto</p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-[1.08] mb-5">
                Hablemos sobre<br className="hidden sm:block" /> tu negocio.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Cuéntanos tu proyecto y te respondemos con una propuesta personalizada.
                Sin costo, sin compromiso y en menos de 24 horas hábiles.
              </p>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1251a3]">
                ✓ Respuesta en menos de 24 horas hábiles &nbsp;·&nbsp; ✓ Sin compromiso
              </p>
            </div>
          </div>
        </section>

        {/* Datos de contacto */}
        <section className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href, external }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-3 hover:border-[#b8d0ef] transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dce8f7] text-[#1251a3]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-sm font-semibold text-gray-900 hover:text-[#1251a3] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario */}
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Contact />
        </Suspense>

        {/* ¿Qué sucede después? */}
        <section className="py-24 bg-[#f0f4fa] border-t border-[#dce8f7]">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">El proceso</p>
              <h2 className="text-3xl font-black tracking-tight text-gray-900">
                ¿Qué sucede después de contactarnos?
              </h2>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                Desde que envías tu mensaje hasta que tienes tu propuesta en mano, así funciona el proceso.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {NEXT_STEPS.map((s, i) => (
                <div key={s.step} className="relative">
                  {i < NEXT_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(100%+10px)] right-[-10px] h-px bg-gradient-to-r from-[#1251a3]/30 to-transparent z-0" />
                  )}
                  <div className="relative z-10 bg-white rounded-2xl border border-[#dce8f7] p-6 h-full flex flex-col gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1251a3] text-white font-black text-sm">
                      {s.step}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
