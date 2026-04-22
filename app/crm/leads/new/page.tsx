import Link from 'next/link'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { createLead } from './actions'

export default function NewLeadPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/crm/leads" className="hover:text-blue-600 transition-colors flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Prospectos
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-[#0a1224] flex items-center mb-6">
            <UserPlus className="h-6 w-6 mr-2 text-blue-600" />
            Nuevo Prospecto Manual
          </h1>

          <form action={createLead} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Información del Contacto</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Ej. Mario Murillo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Ej. 55 1234 5678"
                  />
                </div>
              </div>

              {/* Información Comercial */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Detalles del Negocio</h3>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Servicio de Interés *</label>
                  <select 
                    id="service" 
                    name="service" 
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="Diseño Web Profesional">Diseño Web Profesional</option>
                    <option value="Desarrollo de Software">Desarrollo de Software / CRM</option>
                    <option value="Branding & Diseño de Marca">Branding & Diseño de Marca</option>
                    <option value="Marketing Digital & SEO">Marketing Digital & SEO</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Notas Internas / Mensaje</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Contexto sobre cómo llegó el cliente, requerimientos principales, etc..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
              <Link href="/crm/leads" className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Cancelar
              </Link>
              <button type="submit" className="px-6 py-2 bg-[#0a1224] text-white rounded-lg hover:bg-gray-800 font-medium transition-colors flex items-center">
                Crear Prospecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
