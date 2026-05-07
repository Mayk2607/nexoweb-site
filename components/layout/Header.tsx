"use client";

import { menuItems, services } from "../../config/data";
import { useCallback, useLayoutEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { leadCaptureHref } from "@/lib/contact-intent";
import { getLeadCaptureCtaLabel } from "@/lib/lead-tier";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [transitionsOn, setTransitionsOn] = useState(false);

  const syncScrolled = useCallback(() => {
    const y = window.scrollY;
    setScrolled((prev) => {
      if (y > 28) return true;
      if (y < 12) return false;
      return prev;
    });
  }, []);

  useLayoutEffect(() => {
    syncScrolled();
    const onScroll = () => syncScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", onScroll);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      syncScrolled();
      raf2 = requestAnimationFrame(() => {
        syncScrolled();
        setTransitionsOn(true);
      });
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", onScroll);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [syncScrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full",
        transitionsOn &&
          "transition-[background-color,backdrop-filter,padding,box-shadow,border-color] duration-300 ease-out",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="outline-none" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex items-center">
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
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {menuItems.map((item) => {
            if (item.label === "Servicios") {
              return (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-[#1c4a8f] py-2"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl transition duration-150",
                      "invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100",
                      "pointer-events-none group-hover:pointer-events-auto"
                    )}
                  >
                    <div className="grid gap-1">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          className="block rounded-lg px-4 py-3 hover:bg-slate-50 transition"
                        >
                          <span className="block text-sm font-bold text-slate-900">{service.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={leadCaptureHref({ servicio: "diagnostico" })}
            className="hidden sm:inline-flex rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:scale-105"
          >
            {getLeadCaptureCtaLabel("diagnostico")}
          </Link>

          <button
            type="button"
            className="md:hidden p-2 text-slate-600 hover:text-[#0f274f] transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden bg-white transition-[max-height,opacity] duration-200 ease-out",
          mobileMenuOpen
            ? "max-h-[min(85vh,920px)] border-b border-slate-200 opacity-100"
            : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {menuItems.map((item) => {
            if (item.label === "Servicios") {
              return (
                <div key={item.label} className="flex flex-col space-y-2">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between text-base font-semibold text-slate-900 py-2 border-b border-slate-100"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("w-4 h-4 transition-transform", mobileServicesOpen && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cn(
                      "flex flex-col space-y-2 pl-4 overflow-hidden transition-[max-height,opacity] duration-200",
                      mobileServicesOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                    )}
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
                  </div>
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
            <Link
              href={leadCaptureHref({ servicio: "diagnostico" })}
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-center w-full rounded-lg bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] px-5 py-3 text-sm font-semibold text-white shadow-md"
            >
              {getLeadCaptureCtaLabel("diagnostico")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
