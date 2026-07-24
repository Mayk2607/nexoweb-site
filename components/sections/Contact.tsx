"use client";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, User, Phone, Building, Mail, MessageSquare, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { contactServiceOptions, contactGoalOptions } from "@/config/data";
import { trackFormStart, trackFormSubmit, trackLead } from "@/lib/events";

export function Contact() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(() => ({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: searchParams.get("servicio") ?? "",
    primaryGoal: "",
    message: searchParams.get("nota") ?? "",
  }));
  const formStarted = useRef(false);

  const grouped = contactServiceOptions.reduce<Record<string, typeof contactServiceOptions>>((acc, o) => {
    const g = o.group ?? "General";
    (acc[g] ??= []).push(o);
    return acc;
  }, {});

  function handleFirstInteraction(service?: string) {
    if (formStarted.current) return;
    formStarted.current = true;
    trackFormStart({ formId: "contact-main", service });
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          primary_goal: contactGoalOptions.find((o) => o.value === formData.primaryGoal)?.label ?? formData.primaryGoal,
          _honeypot: "",
        }),
      });
      if (res.ok) {
        await trackFormSubmit({ formId: "contact-main", service: formData.service });
        await trackLead({
          formId: "contact-main",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          goal: formData.primaryGoal,
        });
        setSuccess(true);
        formStarted.current = false;
        setFormData({ name: "", phone: "", email: "", company: "", service: "", primaryGoal: "", message: "" });
      } else {
        alert("No pudimos enviar tu solicitud. Usa el botón de WhatsApp para contactarnos.");
      }
    } catch {
      alert("No pudimos enviar tu solicitud. Usa el botón de WhatsApp para contactarnos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#1251a3] focus:ring-2 focus:ring-[#1251a3]/20";

  return (
    <section id="contacto" className="bg-white py-24 border-t border-gray-200 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Info */}
          <div className="lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Contáctanos</p>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-5">
              ¿Listo para dar<br />el siguiente paso?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              Completa el formulario y te respondemos en menos de 24 horas con una propuesta alineada a tus objetivos.
            </p>

            <div className="space-y-5">
              {[
                { icon: CheckCircle2, text: "Diagnóstico sin costo ni compromiso" },
                { icon: CheckCircle2, text: "Propuesta personalizada a tu medida" },
                { icon: CheckCircle2, text: "Atención directa con el equipo técnico" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[#1251a3] shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-[#f0f4fa] border border-[#dce8f7]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-1">¿Urgente?</p>
              <a href="https://wa.me/5218447993983" target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold text-[#0d1f35] hover:text-indigo-900 transition-colors">
                Escríbenos directo por WhatsApp →
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/60 p-8 md:p-10">
            {success ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#dce8f7] text-[#1251a3]">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">¡Solicitud recibida!</h3>
                <p className="text-gray-500 mb-8 max-w-xs">
                  Te contactaremos por correo o teléfono en horario hábil.
                </p>
                <button onClick={() => setSuccess(false)} className="text-sm font-semibold text-[#1251a3] hover:underline">
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <h3 className="text-xl font-black text-gray-900">Solicitar propuesta</h3>
                  <p className="text-sm text-gray-500 mt-1">Sin compromiso · Respuesta en 24 hrs</p>
                  <p className="text-xs text-gray-400 mt-1"><span className="text-red-500">*</span> Campos obligatorios</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Nombre", icon: User, type: "text", ac: "name", ph: "Tu nombre completo", field: "name" as const, required: true },
                    { id: "company", label: "Empresa", icon: Building, type: "text", ac: "organization", ph: "Nombre del negocio", field: "company" as const, required: true },
                    { id: "phone", label: "WhatsApp", icon: Phone, type: "tel", ac: "tel", ph: "844 123 4567", field: "phone" as const, required: true },
                    { id: "email", label: "Correo", icon: Mail, type: "email", ac: "email", ph: "tu@empresa.com", field: "email" as const, required: true },
                  ].map((f) => (
                    <div key={f.id} className="space-y-1.5">
                      <label htmlFor={f.id} className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {f.label}{f.required && <span className="text-red-500 ml-0.5">*</span>}
                      </label>
                      <div className="relative">
                        <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type={f.type} id={f.id} required={f.required} autoComplete={f.ac}
                          placeholder={f.ph}
                          className={`${inputClass} pl-10`}
                          value={formData[f.field]}
                          onChange={(e) => {
                            handleFirstInteraction(formData.service);
                            setFormData({ ...formData, [f.field]: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="goal" className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Objetivo principal<span className="text-red-500 ml-0.5">*</span></label>
                  <select id="goal" required className={inputClass} value={formData.primaryGoal}
                    onChange={(e) => {
                      handleFirstInteraction(formData.service);
                      setFormData({ ...formData, primaryGoal: e.target.value });
                    }}>
                    <option value="">Selecciona…</option>
                    {contactGoalOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Servicio de interés<span className="text-red-500 ml-0.5">*</span></label>
                  <select id="service" required className={inputClass} value={formData.service}
                    onChange={(e) => {
                      handleFirstInteraction(e.target.value);
                      setFormData({ ...formData, service: e.target.value });
                    }}>
                    <option value="">Selecciona…</option>
                    {Object.entries(grouped).map(([grp, opts]) => (
                      <optgroup key={grp} label={grp}>
                        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Mensaje (opcional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea id="message" rows={3} placeholder="Contexto, plazo o dudas"
                      className={`${inputClass} pl-10 resize-none`}
                      value={formData.message}
                      onChange={(e) => {
                        handleFirstInteraction(formData.service);
                        setFormData({ ...formData, message: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1251a3] py-3.5 text-sm font-bold text-white hover:bg-[#0d1f35] disabled:opacity-70 transition-colors shadow-md shadow-[#1251a3]/20">
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</>
                    : <>Enviar solicitud <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
