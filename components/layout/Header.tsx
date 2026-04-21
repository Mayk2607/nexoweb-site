"use client";

import { motion, AnimatePresence } from "framer-motion";
import { menuItems, services } from "../../config/data";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="outline-none">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tight text-[#0f274f]"
          >
            Nexoweb
          </motion.p>
        </Link>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden items-center gap-6 md:flex"
        >
          {menuItems.map((item) => {
            if (item.label === "Servicios") {
              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-[#1c4a8f] py-2">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full w-72 rounded-2xl bg-white p-3 shadow-2xl border border-slate-100"
                      >
                        <div className="grid gap-1">
                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/servicios/${service.slug}`}
                              className="block rounded-lg px-4 py-3 hover:bg-slate-50 transition"
                            >
                              <span className="block text-sm font-bold text-slate-900">
                                {service.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-[#1c4a8f] py-2"
              >
                {item.label}
              </a>
            );
          })}
        </motion.nav>
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="/#contacto"
          className="rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:scale-105"
        >
          Agendar diagnóstico
        </motion.a>
      </div>
    </header>
  );
}
