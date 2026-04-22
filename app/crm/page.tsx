import { createClient } from '@/lib/supabase/server'
import { Users, TrendingUp, FileText, ArrowRight, DollarSign, Clock, Target } from 'lucide-react'
import Link from 'next/link'

// We force dynamic because this is a dashboard page that hits the DB on request
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // 1. Obtener estadísticas de prospectos
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    
  const { count: wonLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'won')

  const conversionRate = totalLeads && totalLeads > 0 && wonLeads ? Math.round((wonLeads / totalLeads) * 100) : 0

  // 2. Obtener cotizaciones activas (asociadas a prospectos en estatus "En Propuesta")
  const { data: activeQuotesData } = await supabase
    .from('quotes')
    .select('total, leads!inner(status)')
    .eq('leads.status', 'proposal_sent')

  const totalPipelineValue = activeQuotesData?.reduce((sum, q) => sum + Number(q.total), 0) || 0

  // 3. Obtener facturación (pagos registrados)
  const { data: invoicesData } = await supabase
    .from('invoices')
    .select('amount')
    
  const totalFacturado = invoicesData?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0

  // 4. Cumplimiento de Proyectos Activos
  const { data: activeProjects } = await supabase
    .from('projects')
    .select('id, quotes(activities)')
    .eq('status', 'active')

  let onTimeCount = 0;
  let totalWithDatesCount = 0;

  activeProjects?.forEach(proj => {
    const activities = (proj.quotes as any)?.activities || [];
    if (activities.length > 0) {
      const endDates = activities
        .map((a: any) => new Date(a.endDate).getTime())
        .filter((d: number) => !isNaN(d));
      
      if (endDates.length > 0) {
        totalWithDatesCount++;
        const maxDate = Math.max(...endDates);
        // Consider on time if the last deadline is in the future or today
        if (maxDate >= new Date().setHours(0,0,0,0)) {
          onTimeCount++;
        }
      }
    }
  });

  const activeProjectsCount = activeProjects?.length || 0;
  const complianceRate = totalWithDatesCount > 0 ? Math.round((onTimeCount / totalWithDatesCount) * 100) : 100;

  // 5. Obtener últimas 5 cotizaciones para la tabla de actividad reciente
  const { data: recentQuotes } = await supabase
    .from('quotes')
    .select(`
      id,
      total,
      created_at,
      leads (
        id,
        name,
        company
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0a1224] mb-6">Panel General</h1>
      
      {/* 6-Card KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* KPI: Total Prospectos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4 transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Prospectos</p>
            <h3 className="text-2xl font-bold text-[#0a1224]">{totalLeads || 0}</h3>
          </div>
        </div>

        {/* KPI: Tasa de Conversión */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4 transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasa de Conversión</p>
            <h3 className="text-2xl font-bold text-[#0a1224]">{conversionRate}%</h3>
          </div>
        </div>

        {/* KPI: Pipeline (Propuestas) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4 transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Valor en Propuestas</p>
            <h3 className="text-xl font-bold text-[#0a1224]">${totalPipelineValue.toLocaleString('es-MX')}</h3>
          </div>
        </div>

        {/* KPI: Ingresos Facturados */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4 transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-[#0a1224] text-white rounded-xl flex items-center justify-center shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ingresos Cobrados</p>
            <h3 className="text-xl font-bold text-[#0a1224]">${totalFacturado.toLocaleString('es-MX')}</h3>
          </div>
        </div>

        {/* KPI: Proyectos Activos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4 transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Proyectos Activos</p>
            <h3 className="text-2xl font-bold text-[#0a1224]">{activeProjectsCount}</h3>
          </div>
        </div>

        {/* KPI: Cumplimiento de SLA */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4 transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cumplimiento en Tiempos</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-[#0a1224]">{complianceRate}%</h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${complianceRate >= 90 ? 'bg-emerald-100 text-emerald-700' : complianceRate >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                {complianceRate >= 90 ? 'Excelente' : complianceRate >= 75 ? 'Regular' : 'Atrasado'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0a1224] flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Cotizaciones Recientes
            </h2>
            <Link href="/crm/quotes" className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
              Ver todas <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {!recentQuotes || recentQuotes.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No hay cotizaciones recientes.
              </div>
            ) : (
              recentQuotes.map((quote) => {
                const lead: any = quote.leads || {}
                return (
                  <div key={quote.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-[#0a1224]">{lead.name || 'Sin Asignar'}</p>
                      <p className="text-xs text-gray-500">{lead.company} • {new Date(quote.created_at).toLocaleDateString('es-MX')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0a1224]">${Number(quote.total).toLocaleString('es-MX')}</p>
                      <Link href={`/crm/leads/${lead.id}`} className="text-xs text-blue-600 hover:underline">
                        Ver prospecto
                      </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
