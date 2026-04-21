import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexoweb | Desarrollo Web, Software a la Medida y Soluciones B2B",
  description:
    "Agencia experta en desarrollo web corporativo, software a medida, sistemas CRM y automatización. Diseñamos ecosistemas digitales para escalar negocios B2B.",
  keywords: ["desarrollo web", "software a la medida", "CRM", "automatización B2B", "diseño corporativo", "agencia digital", "sistemas web"],
  authors: [{ name: "Nexoweb" }],
  openGraph: {
    title: "Nexoweb | Desarrollo Web y Soluciones B2B",
    description: "Digitalizamos y escalamos tu negocio con desarrollo web corporativo y sistemas a la medida.",
    url: "https://nexoweb.mx",
    siteName: "Nexoweb",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexoweb | Desarrollo Web y Software B2B",
    description: "Digitalizamos y escalamos tu negocio con desarrollo web corporativo y sistemas a la medida.",
  },
};

import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

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
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
