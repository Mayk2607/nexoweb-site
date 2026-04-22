import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, Building2, MapPin, CheckCircle2, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function ClientDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = await createClient()
  
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()
    
  if (!client) return notFound()

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col min-h-full">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/crm/clients" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a clientes
        </Link>
        <div className="flex items-center space-x-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 className="h-4 w-4" />
          <span>Cuenta Activa</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Principal: Información General */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 blur-3xl pointer-events-none"></div>
            
            <div className="relative">
              <div className="flex items-center space-x-5 mb-8">
                <div className="h-20 w-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-600/20">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-[#0a1224]">{client.name}</h1>
                    {client.client_code && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg border border-gray-200">
                        {client.client_code}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mt-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" /> 
                    Cliente desde {format(new Date(client.created_at), "MMMM yyyy", { locale: es })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono / Contacto</p>
                    <a href={`https://wa.me/${client.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#0a1224] font-medium hover:text-blue-600 transition-colors">
                      {client.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Empresa</p>
                    <p className="text-[#0a1224] font-medium">{client.company || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dirección Operativa</p>
                    <p className="text-[#0a1224] font-medium">{client.address || 'Sin dirección registrada'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requerimientos */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#0a1224] mb-4">Requerimientos del Proyecto</h2>
            {client.requirements ? (
              <div className="prose prose-sm max-w-none text-gray-600">
                <p className="whitespace-pre-wrap">{client.requirements}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No se especificaron requerimientos detallados al cerrar la venta.</p>
            )}
          </div>
        </div>

        {/* Columna Derecha: Panel de Operación */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-[#0a1224] mb-4">Estado del Proyecto</h3>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-semibold text-amber-800">Fase Actual</p>
                <p className="text-sm text-amber-700 mt-1">Onboarding / Levantamiento</p>
              </div>
              <div className="text-sm text-gray-500">
                El módulo de gestión de proyectos y facturación estará disponible próximamente en esta sección.
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-gray-100">
              <span className="text-gray-400 font-bold">+</span>
            </div>
            <p className="text-sm font-medium text-[#0a1224]">Añadir Archivo</p>
            <p className="text-xs text-gray-500 mt-1">Sube contratos, credenciales o manuales</p>
          </div>
        </div>
      </div>
    </div>
  )
}
