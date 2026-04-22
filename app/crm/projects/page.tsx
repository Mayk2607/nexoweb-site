import { createClient } from '@/lib/supabase/server'
import { FolderKanban, MoreVertical, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      leads (
        name,
        company,
        service
      ),
      quotes (
        total
      )
    `)
    .order('created_at', { ascending: false })

  // Status mapping
  const statusConfig: Record<string, { label: string, color: string, bg: string }> = {
    'active': { label: 'Activo', color: 'text-blue-700', bg: 'bg-blue-100' },
    'completed': { label: 'Completado', color: 'text-emerald-700', bg: 'bg-emerald-100' },
    'paused': { label: 'Pausado', color: 'text-amber-700', bg: 'bg-amber-100' },
    'cancelled': { label: 'Cancelado', color: 'text-red-700', bg: 'bg-red-100' }
  }

  const paymentConfig: Record<string, { label: string, color: string, icon: any }> = {
    'pending': { label: 'Pendiente', color: 'text-amber-500', icon: Clock },
    'partial': { label: 'Pago Parcial', color: 'text-blue-500', icon: CreditCard },
    'paid': { label: 'Pagado', color: 'text-emerald-500', icon: CheckCircle2 },
    'overdue': { label: 'Vencido', color: 'text-red-500', icon: AlertCircle }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1224] flex items-center">
            <FolderKanban className="h-6 w-6 mr-2 text-blue-600" />
            Dashboard de Proyectos
          </h1>
          <p className="text-sm text-gray-500 mt-1">Gestión 360º de proyectos activos, estatus y control financiero.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-500">
            Error al cargar proyectos: {error.message}
          </div>
        ) : projects?.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-[#0a1224] mb-1">No hay proyectos activos</h3>
            <p className="text-gray-500">Los proyectos se crean automáticamente cuando un prospecto cambia a estatus "Ganado".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Proyecto / Cliente</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Servicio</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estatus Operativo</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estatus Financiero</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects?.map((project) => {
                  const status = statusConfig[project.status] || statusConfig['active'];
                  const payment = paymentConfig[project.payment_status] || paymentConfig['pending'];
                  const PaymentIcon = payment.icon;

                  return (
                    <tr key={project.id} className="relative hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <Link href={`/crm/projects/${project.id}`} className="font-semibold text-[#0a1224] hover:text-blue-600 transition-colors before:absolute before:inset-0">
                            {project.leads?.name || 'Cliente Desconocido'}
                          </Link>
                          {project.leads?.company && (
                            <span className="text-xs text-gray-500">{project.leads.company}</span>
                          )}
                          {project.quote_id && (
                            <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                              CTZ-{project.quote_id.slice(0, 8).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600 font-medium relative z-10 pointer-events-none">
                          {project.leads?.service || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`relative z-10 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1 relative z-10 pointer-events-none">
                          <div className={`flex items-center text-sm font-medium ${payment.color}`}>
                            <PaymentIcon className="h-4 w-4 mr-1.5" />
                            {payment.label}
                          </div>
                          {project.quotes?.total && (
                            <span className="text-xs text-gray-500 font-medium">
                              ${project.quotes.total.toLocaleString('es-MX')} MXN
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="relative z-10 p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </button>
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
