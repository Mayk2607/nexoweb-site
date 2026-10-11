import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexoweb.mx"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: "Nexoweb — Empresa de Soluciones Tecnológicas en Saltillo, Coahuila",
    template: "%s | Nexoweb",
  },
  description:
    "Empresa de soluciones tecnológicas en Saltillo, Coahuila. Estrategia digital, ingeniería de software e infraestructura tecnológica para empresas en México. Propuesta en 24 horas.",
  keywords: ["empresa de soluciones tecnológicas Saltillo", "desarrollo de software Saltillo", "agencia digital Saltillo", "diseño web Saltillo", "desarrollo web Coahuila", "marketing digital Saltillo", "software a medida México", "infraestructura cloud México"],
  authors: [{ name: "Nexoweb" }],
  openGraph: {
    title: "Nexoweb — Empresa de Soluciones Tecnológicas en Saltillo, Coahuila",
    description: "Estrategia digital, ingeniería de software e infraestructura tecnológica para empresas que quieren crecer. Saltillo, México.",
    url: "https://nexoweb.mx",
    siteName: "Nexoweb",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexoweb — Empresa de Soluciones Digitales en Saltillo, Coahuila",
    description: "Diseño web, software a medida y marketing digital para empresas que quieren crecer. Saltillo, México.",
  },
};

import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nexoweb",
  description: "Empresa mexicana de soluciones tecnológicas especializada en estrategia digital, ingeniería de software e infraestructura tecnológica para empresas.",
  url: "https://nexoweb.mx",
  telephone: "+52-844-799-3983",
  email: "consultoria@nexoweb.mx",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saltillo",
    addressRegion: "Coahuila",
    addressCountry: "MX",
  },
  areaServed: [
    { "@type": "State", name: "Coahuila" },
    { "@type": "Country", name: "México" },
  ],
  sameAs: [
    "https://wa.me/5218447993983",
    "https://www.facebook.com/nexowebmx",
    "https://www.instagram.com/nexowebmx",
    "https://x.com/nexowebmx",
    "https://www.linkedin.com/company/nexowebmx/",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
