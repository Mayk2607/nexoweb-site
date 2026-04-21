"use client";

import { motion, AnimatePresence } from "framer-motion";
import { menuItems, services } from "../../config/data";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
        <Link href="/" className="outline-none" onClick={() => setMobileMenuOpen(false)}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <div className="flex items-center justify-center h-20 w-auto">
              <Image
                src="/logo.png"
                alt="Nexoweb"
                width={300}
                height={300}
                className="h-full w-auto object-contain scale-[2.2] origin-left"
                priority
              />
            </div>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
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

        <div className="flex items-center gap-4">
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href="/#contacto"
            className="hidden sm:inline-flex rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:scale-105"
          >
            Agendar diagnóstico
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-[#0f274f] transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {menuItems.map((item) => {
                if (item.label === "Servicios") {
                  return (
                    <div key={item.label} className="flex flex-col space-y-2">
                      <button 
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between text-base font-semibold text-slate-900 py-2 border-b border-slate-100"
                      >
                        {item.label}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col space-y-2 pl-4 overflow-hidden"
                          >
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/servicios/${service.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-sm font-medium text-slate-600 py-2 hover:text-[#1c4a8f]"
                              >
                                {service.title}
                              </Link>
                            ))}
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
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-slate-900 py-2 border-b border-slate-100"
                  >
                    {item.label}
                  </a>
                );
              })}
              
              <div className="pt-4 sm:hidden">
                <a
                  href="/#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center w-full rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-5 py-3 text-sm font-semibold text-white shadow-md"
                >
                  Agendar diagnóstico
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
