"use client";

import {
  Send,
  User,
  Phone,
  Building,
  MessageSquare,
  Loader2,
  Sparkles,
  Mail,
  Check,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CONTACT_SECTION_ID } from "@/lib/contact-intent";
import { getFormContextHint, getFormSubmitLabel } from "@/lib/lead-tier";

const SERVICE_OPTIONS: { value: string; label: string; group?: string }[] = [
  { value: "nexoweb-start", label: "NEXOWEB START", group: "Paquetes" },
  { value: "nexoweb-express", label: "NEXOWEB EXPRESS", group: "Paquetes" },
  { value: "plan-business", label: "Plan BUSINESS", group: "Paquetes" },
  { value: "plan-growth", label: "Plan GROWTH", group: "Paquetes" },
  { value: "plan-corporate-360", label: "CORPORATE 360", group: "Paquetes" },
  { value: "diagnostico", label: "Diagnóstico / consultoría", group: "General" },
  { value: "proyecto-medida", label: "Proyecto a la medida", group: "General" },
  { value: "diseno-web-profesional", label: "Diseño web profesional", group: "Servicios" },
  { value: "branding-diseno-marca", label: "Branding y diseño de marca", group: "Servicios" },
  { value: "marketing-digital-captacion", label: "Marketing digital y captación", group: "Servicios" },
  { value: "desarrollo-sistemas-crm", label: "Desarrollo de sistemas (CRM)", group: "Servicios" },
  { value: "hosting-administrado", label: "Hosting administrado", group: "Servicios" },
  { value: "soporte-it", label: "Soporte IT", group: "Servicios" },
  { value: "digitalizacion-cobranza-pagos", label: "Digitalización de cobranza y pagos", group: "Servicios" },
  { value: "otro", label: "Otro / varios", group: "General" },
];

const PRIMARY_GOAL_OPTIONS = [
  { value: "presencia-online", label: "Tener presencia online" },
  { value: "mas-clientes", label: "Conseguir más clientes" },
  { value: "vender-internet", label: "Vender por internet" },
  { value: "automatizar", label: "Automatizar procesos" },
  { value: "imagen-marca", label: "Mejorar imagen de marca" },
  { value: "asesoria", label: "Necesito asesoría" },
] as const;

const TRUST_POINTS = [
  "Respuesta en menos de 24 hrs",
  "Atención personalizada",
  "Sin compromiso",
] as const;

export function Contact() {
  const searchParams = useSearchParams();
  const formCardRef = useRef<HTMLDivElement>(null);
  const [formGlow, setFormGlow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    primaryGoal: "",
    message: "",
  });

  useEffect(() => {
    const servicio = searchParams.get("servicio");
    const nota = searchParams.get("nota");
    setFormData((prev) => ({
      ...prev,
      ...(servicio ? { service: servicio } : {}),
      ...(nota ? { message: nota } : {}),
    }));
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== `#${CONTACT_SECTION_ID}`) return;

    const el = document.getElementById(CONTACT_SECTION_ID);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });

    setFormGlow(true);
    const t = window.setTimeout(() => setFormGlow(false), 2600);
    return () => window.clearTimeout(t);
  }, [searchParams]);

  const effectiveServicio = useMemo(
    () => formData.service || searchParams.get("servicio") || "",
    [formData.service, searchParams]
  );

  const contextHint = useMemo(() => getFormContextHint(effectiveServicio || null), [effectiveServicio]);
  const submitLabel = useMemo(() => getFormSubmitLabel(effectiveServicio || null), [effectiveServicio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          primary_goal: PRIMARY_GOAL_OPTIONS.find((o) => o.value === formData.primaryGoal)?.label ?? formData.primaryGoal,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          company: "",
          service: "",
          primaryGoal: "",
          message: "",
        });
      } else {
        alert(
          "No pudimos enviar tu solicitud. Intenta de nuevo o usa el botón de WhatsApp flotante para un contacto rápido."
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "No pudimos enviar tu solicitud. Intenta de nuevo o usa el botón de WhatsApp flotante para un contacto rápido."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const grouped = SERVICE_OPTIONS.reduce<Record<string, typeof SERVICE_OPTIONS>>((acc, opt) => {
    const g = opt.group || "General";
    if (!acc[g]) acc[g] = [];
    acc[g].push(opt);
    return acc;
  }, {});

  return (
    <section
      id={CONTACT_SECTION_ID}
      className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 md:scroll-mt-32 md:py-28"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] shadow-2xl">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50" />

        <div className="relative z-10 grid items-center gap-12 p-10 md:grid-cols-2 md:p-16">
          <div className="space-y-6 text-left">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <Sparkles className="h-7 w-7" />
            </div>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Empezamos con <br />
              claridad y proceso
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-blue-100/90">
              Cada solicitud entra a nuestro flujo comercial: revisión, contacto y propuesta alineada a tu objetivo — sin
              depender solo de mensajes sueltos.
            </p>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-6 text-sm text-blue-100/85">
              {TRUST_POINTS.map((line) => (
                <li key={line} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                  1
                </div>
                <p className="text-sm">Cuéntanos qué buscas (1 minuto).</p>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                  2
                </div>
                <p className="text-sm">Te respondemos por correo o teléfono.</p>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                  3
                </div>
                <p className="text-sm">Recibes siguiente paso y propuesta cuando aplique.</p>
              </div>
            </div>
          </div>

          <div
            ref={formCardRef}
            className={cn(
              "relative rounded-3xl border border-slate-100/80 bg-white p-8 shadow-xl transition-[box-shadow,ring] duration-500 md:p-10",
              formGlow && "shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/80"
            )}
          >
            {isSuccess ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Send className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">Solicitud recibida</h3>
                <p className="mb-8 text-slate-600">
                  Revisaremos tu información y <strong>te contactaremos por correo o teléfono</strong> en horario hábil.
                  Si necesitas algo urgente, puedes usar el WhatsApp flotante como canal complementario.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <header className="space-y-2 border-b border-slate-100 pb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c4a8f]/90">
                    Solicitud comercial
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-[1.65rem]">
                    Cuéntanos qué necesita tu negocio
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Te ayudamos a encontrar la mejor solución para crecer online, captar más clientes o automatizar
                    procesos.
                  </p>
                </header>

                <div className="flex flex-wrap gap-x-4 gap-y-2 rounded-xl bg-slate-50/90 px-3 py-2.5 text-[11px] font-medium text-slate-600 md:text-xs">
                  {TRUST_POINTS.map((line) => (
                    <span key={line} className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 text-[#1c4a8f]" aria-hidden />
                      {line}
                    </span>
                  ))}
                </div>

                {contextHint && (
                  <p className="rounded-lg border border-[#1c4a8f]/15 bg-[#1c4a8f]/[0.06] px-3 py-2 text-xs leading-snug text-[#0f274f]">
                    {contextHint}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-sm font-semibold text-slate-700">
                      Empresa o negocio
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Building className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        required
                        autoComplete="organization"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                        placeholder="Nombre del negocio"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                      WhatsApp
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        required
                        autoComplete="tel"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                        placeholder="Ej. 844 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Correo
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                        placeholder="correo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="primaryGoal" className="text-sm font-semibold text-slate-700">
                    ¿Cuál es tu objetivo principal?
                  </label>
                  <select
                    id="primaryGoal"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  >
                    <option value="">Selecciona una opción…</option>
                    {PRIMARY_GOAL_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-sm font-semibold text-slate-700">
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">Selecciona una opción…</option>
                    {Object.entries(grouped).map(([group, opts]) => (
                      <optgroup key={group} label={group}>
                        {opts.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                    Cuéntanos brevemente qué necesitas
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-3">
                      <MessageSquare className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1c4a8f] focus:ring-2 focus:ring-[#1c4a8f]/20"
                      placeholder="Contexto, plazo o dudas (opcional pero nos ayuda a prepararnos)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f274f] to-[#1c4a8f] py-4 text-sm font-bold text-white shadow-md transition-all hover:opacity-[0.97] disabled:opacity-70 md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Procesando…
                    </>
                  ) : (
                    <>
                      {submitLabel}
                      <ArrowRight className="h-5 w-5 opacity-90" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  WhatsApp disponible abajo a la derecha solo si necesitas contacto inmediato.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
