"use client";

import { motion } from "framer-motion";
import { Send, User, Phone, Building, MessageSquare, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", company: "", service: "", message: "" });
      } else {
        alert("Hubo un error al enviar tu solicitud. Por favor intenta por WhatsApp.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar tu solicitud. Por favor intenta por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] shadow-2xl"
      >
        {/* Decorative background blur */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 p-10 md:p-16 items-center">
          
          {/* Left Side: Value Proposition */}
          <div className="text-left space-y-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-white mb-4">
              <Sparkles className="h-7 w-7" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl leading-tight">
              Construyamos tu <br/> ecosistema digital.
            </h2>
            <p className="text-lg text-blue-100/90 leading-relaxed max-w-md">
              Déjanos tus datos y un especialista analizará tu modelo de negocio para ofrecerte la solución exacta que necesitas para escalar.
            </p>
            
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <p className="text-sm">Llena el formulario con los datos de tu empresa.</p>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <p className="text-sm">Agendamos una llamada de consultoría (Sin costo).</p>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <p className="text-sm">Recibes una propuesta técnica y comercial a la medida.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl relative">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud Enviada!</h3>
                <p className="text-slate-600 mb-8">
                  Hemos recibido tus datos correctamente. Un asesor revisará tu solicitud y <strong>te contactará por WhatsApp a la brevedad</strong>.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Enviar otra solicitud
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-[#0f274f] mb-6">Solicitar Propuesta</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Nombre completo</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Teléfono / WhatsApp</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ej. +52 55 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Empresa o Proyecto</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      required 
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="Nombre de tu empresa" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Servicio de interés</label>
                  <select 
                    id="service"
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Selecciona un servicio...</option>
                    <option value="web-waas">Web en Renta (Paquetes WaaS)</option>
                    <option value="web-corp">Diseño Web Corporativo / E-commerce</option>
                    <option value="crm">Desarrollo de Sistemas (CRM)</option>
                    <option value="branding">Branding y Diseño de Marca</option>
                    <option value="marketing">Marketing Digital y Captación</option>
                    <option value="otro">Otro / Proyecto a medida</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Cuéntanos sobre tu necesidad</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea 
                      id="message"
                      rows={3} 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                      placeholder="Cuéntanos brevemente sobre tu proyecto o necesidad..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#0f274f] hover:bg-[#1c4a8f] text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Enviar Solicitud</>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center mt-4">
                  Tus datos están protegidos. No enviamos spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
