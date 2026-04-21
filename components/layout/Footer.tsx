"use client";

import { menuItems } from "../../config/data";
import { Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "5218447502607";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, me interesa conocer más sobre los servicios de Nexoweb.")}`;

  return (
    <footer className="bg-[#0a1224] text-white pt-20 pb-10 mt-20 border-t border-[#1c4a8f]/30 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent opacity-50" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#1c4a8f] opacity-20 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Info */}
          <div className="space-y-6">
            <div className="mb-2">
              <Image
                src="/logo.png"
                alt="Nexoweb"
                width={100}
                height={100}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Agencia de transformación digital corporativa. Especialistas en automatización, diseño de software y crecimiento exponencial.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1c4a8f] hover:text-white hover:border-[#1c4a8f] transition-all" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1c4a8f] hover:text-white hover:border-[#1c4a8f] transition-all" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1c4a8f] hover:text-white hover:border-[#1c4a8f] transition-all" aria-label="TikTok">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.39-3.16-3.8-5.46-.4-2.08-.04-4.26 1.03-6.06 1.13-1.89 3.11-3.16 5.25-3.38.38-.05.77-.07 1.15-.08v4.06c-.84.05-1.68.32-2.34.84-.96.7-1.41 1.93-1.13 3.09.28 1.11 1.14 2 2.2 2.37 1.16.38 2.45.2 3.42-.48.72-.51 1.19-1.31 1.3-2.2.04-.32.04-.65.04-.97V.02h-3.9z"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1c4a8f] hover:text-white hover:border-[#1c4a8f] transition-all" aria-label="X (Twitter)">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#1c4a8f] hover:text-white hover:border-[#1c4a8f] transition-all" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Menú de Navegación */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navegación</h4>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="text-slate-400 text-sm hover:text-[#00b4d8] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Directo */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contacto Directo</h4>
            <ul className="space-y-4">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span>(844) 750-2607</span>
                </a>
              </li>
              <li>
                <a href="mailto:consultoria@nexoweb.mx" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00b4d8]/20 text-[#00b4d8] group-hover:bg-[#00b4d8] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>consultoria@nexoweb.mx</span>
                </a>
              </li>
            </ul>
            
            {/* Direct CTA */}
            <div className="mt-8">
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-transform"
              >
                Chatear por WhatsApp
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terminos" className="text-slate-400 text-sm hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-slate-400 text-sm hover:text-white transition-colors">
                  Aviso de Privacidad
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500">
            © {currentYear} Nexoweb Digital Agency. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            Made with <span className="text-[#00b4d8]">♥</span> in Mexico.
          </p>
        </div>
      </div>
    </footer>
  );
}
