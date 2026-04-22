import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Building2, Search, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  const supabase = await createClient()
  
  // Ignore error to avoid crash if table not exist yet
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a1224]">Directorio de Clientes</h1>
          <p className="text-gray-500 mt-1">Gestiona las cuentas activas y operaciones en curso.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-[#0a1224]"
            />
          </div>
        </div>

        {/* Table / List */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-sm">
                <th className="font-semibold text-gray-500 px-6 py-4">Cliente / Empresa</th>
                <th className="font-semibold text-gray-500 px-6 py-4">Teléfono</th>
                <th className="font-semibold text-gray-500 px-6 py-4">Dirección</th>
                <th className="font-semibold text-gray-500 px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients && clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[#0a1224]">{client.name}</p>
                            {client.client_code && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                                {client.client_code}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{client.company || 'Sin empresa registrada'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                      {client.address || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/crm/clients/${client.id}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        Ver cuenta <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Building2 className="h-12 w-12 text-gray-200 mb-3" />
                      <p className="text-lg font-medium text-gray-400">No hay clientes registrados aún.</p>
                      <p className="text-sm text-gray-400 mt-1">Los prospectos marcados como "Ganado" aparecerán aquí.</p>
                    </div>
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
