import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowWeHelp } from "@/components/sections/HowWeHelp";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Nexoweb — Empresa de Soluciones Tecnológicas en Saltillo, Coahuila",
  description:
    "Empresa de soluciones tecnológicas en Saltillo, Coahuila. Estrategia digital, ingeniería de software e infraestructura tecnológica para empresas en México. Propuesta en 24 horas.",
  keywords: [
    "empresa de soluciones tecnológicas Saltillo",
    "desarrollo de software Saltillo",
    "agencia digital Saltillo",
    "diseño web Saltillo",
    "desarrollo web Coahuila",
    "marketing digital Saltillo",
    "software a medida México",
    "infraestructura cloud México",
  ],
  openGraph: {
    title: "Nexoweb — Empresa de Soluciones Tecnológicas en Saltillo, Coahuila",
    description: "Estrategia digital, ingeniería de software e infraestructura tecnológica para empresas que quieren crecer. Saltillo, México.",
    url: "https://nexoweb.mx",
    siteName: "Nexoweb",
    locale: "es_MX",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <HowWeHelp />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Faq />
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
