import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Target, Receipt, DollarSign, Activity, FileText, Edit2 } from 'lucide-react'
import { updateProjectStatus, updateFinancialStatus, updateClientGoals } from './actions'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ProjectGanttEditor from '@/components/crm/ProjectGanttEditor'
import ProjectScopeEditor from '@/components/crm/ProjectScopeEditor'
import BillingManager from '@/components/crm/BillingManager'

export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      leads (
        id,
        name,
        company,
        phone,
        service
      ),
      quotes (
        id,
        total,
        subtotal,
        tax,
        activities,
        scope
      )
    `)
    .eq('id', id)
    .single()

  // Fetch payments separately just in case the FK relation is not fully configured in postgREST yet
  const { data: payments } = await supabase
    .from('invoices')
    .select('*')
    .eq('project_id', id)
    .order('created_at', { ascending: false })

  if (error || !project) {
    return notFound()
  }

  const statusColors: Record<string, string> = {
    'active': 'text-blue-700 bg-blue-100',
    'completed': 'text-emerald-700 bg-emerald-100',
    'paused': 'text-amber-700 bg-amber-100',
    'cancelled': 'text-red-700 bg-red-100'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Link href="/crm/projects" className="hover:text-blue-600 transition-colors flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Proyectos
        </Link>
      </div>

      {/* Header del Proyecto */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl font-bold text-[#0a1224]">{project.leads?.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status] || 'bg-gray-100'}`}>
                {project.status.toUpperCase()}
              </span>
              {project.quote_id && (
                <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  Cotización: CTZ-{project.quote_id.slice(0, 8).toUpperCase()}
                </span>
              )}
            </div>
            <p className="text-lg text-gray-600 font-medium mb-1">{project.leads?.company || 'Sin Empresa'}</p>
            <p className="text-gray-500 text-sm">{project.leads?.service}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <form action={updateProjectStatus} className="flex gap-2">
              <input type="hidden" name="id" value={project.id} />
              <select 
                name="status" 
                defaultValue={project.status}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              >
                <option value="active">Activo</option>
                <option value="completed">Completado</option>
                <option value="paused">Pausado</option>
                <option value="cancelled">Cancelado</option>
              </select>
              <button type="submit" className="px-4 py-2 bg-[#0a1224] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Módulo de Facturación y Pagos */}
        <BillingManager 
          projectId={project.id}
          quoteId={project.quote_id}
          totalQuoteAmount={project.quotes?.total || 0}
          payments={payments || []}
          clientData={project.leads}
          quoteData={{ project_name: project.leads?.name, quote_number: project.quote_id?.slice(0, 8).toUpperCase() }}
        />

        {/* Cronograma Gantt */}
        <ProjectGanttEditor 
          projectId={project.id} 
          quoteId={project.quote_id} 
          initialActivities={project.quotes?.activities || []} 
        />

        {/* Alcance del Proyecto */}
        <ProjectScopeEditor 
          projectId={project.id} 
          quoteId={project.quote_id} 
          initialScope={project.quotes?.scope || ''} 
        />

        {/* Objetivos del Cliente / KPIs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#0a1224] flex items-center mb-4">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Objetivos Clave y KPIs
          </h3>
          <form action={updateClientGoals} className="space-y-4">
            <input type="hidden" name="id" value={project.id} />
            <textarea 
              name="client_goals" 
              rows={5}
              defaultValue={project.client_goals || ''}
              placeholder="Anota aquí las expectativas, métricas de éxito, o KPIs importantes para este proyecto..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none resize-none"
            ></textarea>
            <button type="submit" className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              Guardar Notas y Objetivos
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
