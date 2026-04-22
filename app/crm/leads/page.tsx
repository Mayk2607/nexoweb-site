import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const statusMap: Record<string, { label: string, color: string }> = {
  new: { label: 'Nuevo', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  contacted: { label: 'Contactado', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  proposal_sent: { label: 'En Propuesta', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  won: { label: 'Ganado', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  lost: { label: 'Perdido', color: 'bg-red-100 text-red-700 border-red-200' }
}

export default async function LeadsPage() {
  const supabase = await createClient()
  
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#0a1224]">Prospectos</h1>
        <Link 
          href="/crm/leads/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Nuevo Prospecto
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nombre / Empresa</th>
                <th className="px-6 py-4 font-medium">Servicio</th>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads && leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#0a1224]">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.company || 'Sin empresa'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lead.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(lead.created_at), "d 'de' MMM, yyyy", { locale: es })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusMap[lead.status]?.color || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {statusMap[lead.status]?.label || lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/crm/leads/${lead.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Ver detalle →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay prospectos registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
