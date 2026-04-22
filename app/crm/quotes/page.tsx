import { createClient } from '@/lib/supabase/server'
import { FileText, ExternalLink, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'

// We force dynamic because this is a dashboard page that hits the DB on request
export const dynamic = 'force-dynamic'

export default async function QuotesPage() {
  const supabase = await createClient()
  
  // Obtener todas las cotizaciones con la info del prospecto asociado
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select(`
      *,
      leads (
        id,
        name,
        company,
        status
      )
    `)
    .order('created_at', { ascending: false })

  // Mapear colores de estado para el prospecto
  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-amber-100 text-amber-800',
    proposal: 'bg-purple-100 text-purple-800',
    won: 'bg-emerald-100 text-emerald-800',
    lost: 'bg-red-100 text-red-800',
  }

  const statusLabels: Record<string, string> = {
    new: 'Nuevo',
    contacted: 'Contactado',
    proposal: 'En Propuesta',
    won: 'Ganado',
    lost: 'Perdido',
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1224] flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Cotizaciones Generadas
          </h1>
          <p className="text-gray-500 mt-1">Historial completo de cotizaciones emitidas a prospectos.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-500">Error al cargar las cotizaciones.</div>
        ) : !quotes || quotes.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-[#0a1224] mb-1">No hay cotizaciones</h3>
            <p className="text-gray-500">Aún no se ha generado ninguna cotización.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha / ID</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prospecto</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estatus del Prospecto</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Monto Total</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote) => {
                  const lead = quote.leads || {}
                  const status = lead.status || 'new'
                  const colorClass = statusColors[status] || statusColors.new
                  const label = statusLabels[status] || status
                  const isExpired = quote.valid_until && new Date(quote.valid_until) < new Date()

                  return (
                    <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#0a1224]">
                          {new Date(quote.created_at).toLocaleDateString('es-MX')}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 font-mono">
                          #{quote.id.split('-')[0].toUpperCase()}
                        </div>
                        {quote.valid_until && (
                          <div className={`text-xs mt-1 flex items-center ${isExpired ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                            <Calendar className="h-3 w-3 mr-1" />
                            Vence: {new Date(quote.valid_until).toLocaleDateString('es-MX')}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#0a1224]">{lead.name || 'Sin Asignar'}</div>
                        {lead.company && <div className="text-sm text-gray-500">{lead.company}</div>}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                          {label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="font-bold text-[#0a1224]">${Number(quote.total).toLocaleString('es-MX')}</div>
                        {Number(quote.tax) === 0 && <div className="text-xs text-amber-600 font-medium mt-0.5">Sin IVA</div>}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-3">
                          <a 
                            href={`/cotizacion/${quote.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver Cotización Web"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                          {lead.id && (
                            <Link 
                              href={`/crm/leads/${lead.id}`}
                              className="p-1.5 text-gray-500 hover:text-[#0a1224] hover:bg-gray-100 rounded-lg transition-colors"
                              title="Ir al Prospecto"
                            >
                              <ArrowRight className="h-5 w-5" />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
