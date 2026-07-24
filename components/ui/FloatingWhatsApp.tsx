"use client";
import { MessageCircle } from "lucide-react";
import { trackWhatsApp } from "@/lib/events";

export function FloatingWhatsApp() {
  const phone = "5218447993983";
  const msg = encodeURIComponent("Hola, me interesa conocer más sobre los servicios de Nexoweb.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onClick={() => trackWhatsApp({ location: "floating-button" })}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
