import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Building2, Clock, Send } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { updateLeadStatus, addLeadNote, updateLeadDetails } from './actions'
import StatusChanger from './StatusChanger'
import QuoteBuilder from './QuoteBuilder'

const statusOptions = [
  { value: 'new', label: 'Nuevo', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { value: 'contacted', label: 'Contactado', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { value: 'proposal_sent', label: 'En Propuesta', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  { value: 'won', label: 'Ganado', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { value: 'lost', label: 'Perdido', color: 'text-red-700 bg-red-50 border-red-200' }
]

export default async function LeadDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = await createClient()
  
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()
    
  if (!lead) return notFound()

  // Fetch notas
  const { data: notes } = await supabase
    .from('lead_notes')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false })

  // Fetch cotizaciones
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false })

  const currentStatus = statusOptions.find(s => s.value === lead.status) || statusOptions[0]

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col min-h-full">
      <div className="mb-6">
        <Link href="/crm/leads" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a prospectos
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Columna Izquierda: Detalles del Lead */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Quote Builder - Solo visible en fase de propuesta o si ya hay cotizaciones */}
          {(lead.status === 'proposal_sent' || (quotes && quotes.length > 0)) && (
            <QuoteBuilder leadId={lead.id} existingQuotes={quotes || []} />
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#0a1224]">{lead.name}</h1>
                <p className="text-gray-500 mt-1 flex items-center">
                  <Clock className="h-4 w-4 mr-1.5" /> 
                  Recibido el {format(new Date(lead.created_at), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                </p>
              </div>

              {/* Status Changer */}
              <StatusChanger 
                leadId={lead.id} 
                currentStatusValue={lead.status} 
                statusOptions={statusOptions} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Teléfono / WhatsApp</p>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#0a1224] font-medium hover:text-blue-600 transition-colors">
                    {lead.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Empresa</p>
                  <p className="text-[#0a1224] font-medium">{lead.company || 'No especificada'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:col-span-2">
                <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Servicio de Interés</p>
                  <p className="text-[#0a1224] font-medium">{lead.service}</p>
                </div>
              </div>
            </div>

            {lead.message && (
              <div className="bg-[#f4f7fb] rounded-xl p-6 border border-gray-100 mb-8">
                <p className="text-sm font-medium text-gray-500 mb-2">Mensaje del cliente</p>
                <p className="text-[#0a1224] whitespace-pre-wrap leading-relaxed">{lead.message}</p>
              </div>
            )}

            {/* Editable Details Form */}
            <form action={updateLeadDetails} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-[#0a1224]">Detalles Adicionales</h3>
                <div className="flex gap-2">
                  <Link href="/crm/leads" className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-md transition-colors">
                    Cerrar
                  </Link>
                  <button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors">
                    Guardar Detalles
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <input type="hidden" name="id" value={lead.id} />
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección (Local, Empresa o Contacto)
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={lead.address || ''}
                    placeholder="Ej. Av. Reforma 222, CDMX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-[#0a1224]"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Necesidades / Requerimientos Específicos
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    defaultValue={lead.requirements || ''}
                    placeholder="Describe a detalle lo que necesita el cliente..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-[#0a1224] resize-y"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Columna Derecha: Notas Internas */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[#0a1224]">Bitácora Interna</h2>
            <p className="text-sm text-gray-500 mt-1">Anota los avances y acuerdos.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-[#0a1224] whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {format(new Date(note.created_at), "MMM d, HH:mm", { locale: es })}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">No hay notas registradas.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
            <form action={addLeadNote} className="flex gap-2">
              <input type="hidden" name="lead_id" value={lead.id} />
              <input 
                type="text" 
                name="content"
                placeholder="Escribe una nota..." 
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm text-[#0a1224]"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
