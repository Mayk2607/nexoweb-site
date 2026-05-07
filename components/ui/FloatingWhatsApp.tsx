import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const phoneNumber = "5218447502607";
  const message = encodeURIComponent("Hola, me interesa conocer más sobre los servicios de Nexoweb.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp — contacto rápido (opcional)"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Abrir WhatsApp para contacto rápido (opcional)"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
