import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import PrintButton from './PrintButton'

// We force dynamic because this is public but hits the DB on request
export const dynamic = 'force-dynamic'

export default async function QuotePublicPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = await createClient()
  
  // Need to fetch quote and joined lead data
  const { data: quote, error } = await supabase
    .from('quotes')
    .select(`
      *,
      leads (
        name,
        company,
        address,
        phone,
        service
      )
    `)
    .eq('id', id)
    .single()

  if (error || !quote) {
    return notFound()
  }

  const lead = quote.leads

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans print:bg-white print:p-0">
      
      {/* Floating Toolbar (Hidden when printing) */}
      <div className="fixed top-6 right-6 flex items-center space-x-3 print:hidden z-50">
        <PrintButton />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Header Cotización */}
        <div className="bg-[#0a1224] text-white p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              {/* Logo o Nombre Agencia */}
              <div className="mb-6 flex items-center h-16 w-auto overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Nexoweb Logo" 
                  width={200} 
                  height={50} 
                  className="h-full w-auto object-contain scale-[2.2] origin-left filter brightness-0 invert" 
                  priority 
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Propuesta de Servicios</h1>
              <p className="text-gray-400">Cotización #{quote.id.split('-')[0].toUpperCase()}</p>
            </div>
            
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-400 mb-1">Fecha de Emisión</p>
              <p className="font-medium text-white mb-4">{format(new Date(quote.created_at), "d 'de' MMMM, yyyy", { locale: es })}</p>
              
              {quote.valid_until && (
                <>
                  <p className="text-sm text-gray-400 mb-1">Válida hasta</p>
                  <p className="font-medium text-emerald-400 flex items-center sm:justify-end">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {format(new Date(quote.valid_until), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Info Cliente */}
        <div className="p-8 sm:p-12 border-b border-gray-100">
          <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wider">Preparado para</p>
          <h2 className="text-2xl font-bold text-[#0a1224] mb-2">{lead.name}</h2>
          {lead.company && <p className="text-gray-600 font-medium mb-1">{lead.company}</p>}
          <p className="text-gray-500 text-sm max-w-sm">{lead.address || 'Sin dirección registrada'}</p>
          <p className="text-gray-500 text-sm mt-1">{lead.phone}</p>
        </div>

        {/* Desglose de Conceptos */}
        <div className="p-8 sm:p-12">
          <h3 className="text-lg font-bold text-[#0a1224] mb-6">Detalle de Inversión</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-3 text-sm font-semibold text-gray-500 w-1/2">Descripción</th>
                  <th className="py-3 text-sm font-semibold text-gray-500 text-center">Cant.</th>
                  <th className="py-3 text-sm font-semibold text-gray-500 text-right">Precio Unit.</th>
                  <th className="py-3 text-sm font-semibold text-gray-500 text-right">Importe</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item: any, i: number) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-4 text-[#0a1224] font-medium">{item.description}</td>
                    <td className="py-4 text-gray-600 text-center">{item.quantity}</td>
                    <td className="py-4 text-gray-600 text-right">${item.price.toLocaleString('es-MX')}</td>
                    <td className="py-4 text-[#0a1224] font-semibold text-right">${(item.price * item.quantity).toLocaleString('es-MX')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totales */}
          <div className="mt-8 flex flex-col items-end">
            <div className="w-full sm:w-1/2 md:w-1/3 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${Number(quote.subtotal).toLocaleString('es-MX')} MXN</span>
              </div>
              {Number(quote.tax) > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>IVA (16%)</span>
                  <span>${Number(quote.tax).toLocaleString('es-MX')} MXN</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-[#0a1224] pt-4 border-t-2 border-gray-100">
                <span>Total</span>
                <span className="text-blue-600">${Number(quote.total).toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Condiciones */}
        <div className="bg-gray-50 p-8 sm:p-12 text-sm text-gray-500">
          <p className="font-semibold text-gray-700 mb-2">Términos y Condiciones</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Los precios están expresados en Moneda Nacional (MXN).</li>
            <li>Para iniciar el proyecto se requiere el pago de un anticipo del 50%.</li>
            <li>El tiempo de entrega corre a partir de la recepción del anticipo y la información requerida.</li>
            <li>Cualquier requerimiento adicional no especificado en esta cotización será presupuestado por separado.</li>
          </ul>
        </div>

        {/* ANEXO A: Diagrama de Gantt */}
        {quote.activities && quote.activities.length > 0 && (() => {
          // Filtrar actividades válidas
          const validActivities = quote.activities.filter((a: any) => a.startDate && a.endDate);
          if (validActivities.length === 0) return null;

          const minDate = new Date(Math.min(...validActivities.map((a: any) => new Date(a.startDate).getTime())));
          const maxDate = new Date(Math.max(...validActivities.map((a: any) => new Date(a.endDate).getTime())));
          const totalDuration = maxDate.getTime() - minDate.getTime() || 1;

          return (
            <div className="print:break-before-page p-8 sm:p-12 border-t border-gray-100 bg-white">
              <h3 className="text-2xl font-bold text-[#0a1224] mb-2">Anexo A: Cronograma Tentativo</h3>
              <p className="text-gray-500 mb-8">Planeación de actividades del proyecto.</p>

              <div className="space-y-6">
                {validActivities.map((act: any, i: number) => {
                  const start = new Date(act.startDate).getTime();
                  const end = new Date(act.endDate).getTime();
                  const leftPercent = Math.max(0, ((start - minDate.getTime()) / totalDuration) * 100);
                  const widthPercent = Math.max(2, ((end - start) / totalDuration) * 100);
                  
                  return (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-full sm:w-[40%]">
                        <p className="text-sm font-medium text-[#0a1224] leading-tight">{act.item}. {act.activity}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold mr-2 ${act.responsible === 'Nexoweb' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {act.responsible}
                          </span>
                          {format(new Date(act.startDate), "dd/MMM", { locale: es })} - {format(new Date(act.endDate), "dd/MMM", { locale: es })}
                        </p>
                      </div>
                      <div className="w-full sm:w-[60%] h-6 bg-gray-100 rounded-md relative mt-2 sm:mt-0">
                        <div 
                          className={`absolute top-0 bottom-0 rounded-md transition-all duration-500 ${act.responsible === 'Nexoweb' ? 'bg-blue-500' : 'bg-emerald-500'}`}
                          style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* ANEXO B: Alcance del Proyecto */}
        {quote.scope && quote.scope.trim() !== '' && (
          <div className="print:break-before-page p-8 sm:p-12 border-t border-gray-100 bg-white">
            <h3 className="text-2xl font-bold text-[#0a1224] mb-2">Anexo B: Alcance del Proyecto</h3>
            <p className="text-gray-500 mb-8">Pormenores y especificaciones técnicas detalladas.</p>
            
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-gray-700 prose-headings:text-[#0a1224] prose-a:text-blue-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: quote.scope }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
