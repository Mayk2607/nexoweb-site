import Link from "next/link";
import { Send } from "lucide-react";
import { leadCaptureHref } from "@/lib/contact-intent";
import { getLeadCaptureCtaLabel } from "@/lib/lead-tier";

const WHATSAPP_QUICK = "https://wa.me/528447502607";

export default function CustomProjectBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a1224]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1c4a8f]/30 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-16 border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-[#1c4a8f]/10 z-0"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                Desarrollo 100% a la medida
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ¿Ninguno de nuestros planes encaja con tu visión?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Si necesitas algo especializado o integraciones complejas, <strong>armamos una propuesta formal</strong>{" "}
                a partir de tu brief — sin depender de chats sueltos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href={leadCaptureHref({
                    servicio: "proyecto-medida",
                    nota: "Proyecto a la medida — cotización",
                  })}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Solicitar cotización
                </Link>
                <Link
                  href={leadCaptureHref({ servicio: "diagnostico" })}
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center"
                >
                  {getLeadCaptureCtaLabel("diagnostico")}
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                ¿Prefieres algo inmediato?{" "}
                <a
                  href={WHATSAPP_QUICK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400/90 underline-offset-2 hover:underline"
                >
                  Escríbenos por WhatsApp
                </a>
              </p>
            </div>

            <div className="hidden lg:block w-72 relative">
              <div className="w-full aspect-square rounded-full border border-cyan-500/30 flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                <div className="w-[80%] aspect-square rounded-full border border-blue-500/40 flex items-center justify-center absolute rotate-45"></div>
                <div className="w-[60%] aspect-square rounded-full border border-purple-500/20 absolute -rotate-45"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl shadow-cyan-500/30 flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
