"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { serviceCategories } from "@/config/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  const navLink = (href: string) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      pathname === href
        ? "text-[#1251a3] bg-[#f0f4fa] font-semibold"
        : "text-gray-600 hover:text-[#1251a3] hover:bg-[#f0f4fa]"
    }`;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled || pathname !== "/"
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nexoweb-logo.svg" alt="Nexoweb" className="h-14 w-auto" />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={navLink("/")}>
              Inicio
            </Link>
            <Link href="/nosotros" className={navLink("/nosotros")}>
              Nosotros
            </Link>

            {/* Servicios dropdown */}
            <div className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname.startsWith("/servicios") ? "text-[#1251a3] bg-[#f0f4fa] font-semibold" : "text-gray-600 hover:text-[#1251a3] hover:bg-[#f0f4fa]"}`}>
                Servicios <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdown ? "rotate-180" : ""}`} />
              </button>
              {dropdown && (
                <div className="absolute left-0 top-full pt-2 w-64">
                  <div className="rounded-2xl bg-white border border-gray-200 shadow-xl p-2">
                    {serviceCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/servicios#${cat.id}`}
                        className="flex items-start gap-3 rounded-xl p-3 hover:bg-[#f0f4fa] transition-colors group"
                        onClick={() => setDropdown(false)}
                      >
                        <div className="mt-0.5 w-2 h-2 rounded-full bg-[#1251a3] shrink-0 group-hover:scale-125 transition-transform" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{cat.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{cat.tagline}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/servicios"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1251a3] hover:text-[#0a1525] transition-colors"
                        onClick={() => setDropdown(false)}
                      >
                        Ver todos los servicios <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/portafolio" className={navLink("/portafolio")}>
              Portafolio
            </Link>
            <Link href="/contacto" className={navLink("/contacto")}>
              Contacto
            </Link>
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1251a3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d1f35] transition-colors shadow-sm shadow-[#1251a3]/25"
            >
              Hablar con un experto
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-1">
            {[
              { label: "Inicio", href: "/" },
              { label: "Nosotros", href: "/nosotros" },
              { label: "Servicios", href: "/servicios" },
              { label: "Portafolio", href: "/portafolio" },
              { label: "Contacto", href: "/contacto" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? "text-[#1251a3] bg-[#f0f4fa] font-semibold"
                    : "text-gray-700 hover:text-[#1251a3] hover:bg-[#f0f4fa]"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#1251a3] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0d1f35] transition-colors"
                onClick={() => setOpen(false)}
              >
                Hablar con un experto
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
