'use client'

import { useState } from 'react'
import { Plus, Trash2, FileText, ExternalLink, Copy, CheckCircle2, Edit2, X } from 'lucide-react'
import { saveQuote, deleteQuote } from './actions'

type QuoteItem = {
  description: string
  quantity: number
  price: number
}

type QuoteActivity = {
  item: number
  activity: string
  responsible: 'Cliente' | 'Nexoweb'
  startDate: string
  endDate: string
}

type Quote = {
  id: string
  created_at: string
  subtotal: number
  tax: number
  total: number
  items: QuoteItem[]
  activities?: QuoteActivity[]
  scope?: string
  valid_until?: string | null
}

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'

export default function QuoteBuilder({ leadId, existingQuotes }: { leadId: string, existingQuotes: Quote[] }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [activities, setActivities] = useState<QuoteActivity[]>([])
  const [scope, setScope] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null)
  const [includeTax, setIncludeTax] = useState(true)
  const [isBuilderOpen, setIsBuilderOpen] = useState(existingQuotes.length === 0)

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  // --- Activities logic ---
  const addActivity = () => {
    setActivities([...activities, { 
      item: activities.length + 1, 
      activity: '', 
      responsible: 'Nexoweb', 
      startDate: '', 
      endDate: '' 
    }])
  }

  const removeActivity = (index: number) => {
    const newActivities = activities.filter((_, i) => i !== index).map((act, i) => ({ ...act, item: i + 1 }))
    setActivities(newActivities)
  }

  const updateActivity = (index: number, field: keyof QuoteActivity, value: string) => {
    const newActivities = [...activities]
    newActivities[index] = { ...newActivities[index], [field]: value }
    
    // Auto-fix end date if it's before start date
    if (field === 'startDate' && newActivities[index].endDate && new Date(value) > new Date(newActivities[index].endDate)) {
      newActivities[index].endDate = value;
    } else if (field === 'endDate' && newActivities[index].startDate && new Date(value) < new Date(newActivities[index].startDate)) {
      alert("La fecha final no puede ser menor a la fecha de inicio.");
      return;
    }
    
    setActivities(newActivities)
  }
  // -------------------------

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = includeTax ? subtotal * 0.16 : 0
  const total = subtotal + tax

  const handleSave = async () => {
    if (items.length === 0) return
    setIsSaving(true)
    await saveQuote(leadId, items, validUntil, editingQuoteId || undefined, includeTax, activities, scope)
    setItems([])
    setActivities([])
    setScope('')
    setValidUntil('')
    setEditingQuoteId(null)
    setIncludeTax(true)
    setIsSaving(false)
    setIsBuilderOpen(false)
  }

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/cotizacion/${id}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const loadQuoteForEdit = (quote: Quote) => {
    setItems(quote.items || [])
    setActivities(quote.activities || [])
    setScope(quote.scope || '')
    setValidUntil(quote.valid_until ? quote.valid_until.split('T')[0] : '')
    setIncludeTax(Number(quote.tax) > 0)
    setEditingQuoteId(quote.id)
    setIsBuilderOpen(true)
  }

  const cancelEdit = () => {
    setItems([])
    setActivities([])
    setScope('')
    setValidUntil('')
    setIncludeTax(true)
    setEditingQuoteId(null)
    setIsBuilderOpen(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0a1224] flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Cotizaciones Web
          </h2>
          <p className="text-sm text-gray-500 mt-1">Genera ligas de cotización corporativas para enviarlas por WhatsApp o Email.</p>
        </div>
      </div>

      {/* Historial de Cotizaciones */}
      {existingQuotes && existingQuotes.length > 0 && (
        <div className="mb-8 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Cotizaciones Generadas</h3>
          {existingQuotes.map(quote => (
            <div key={quote.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl gap-4">
              <div>
                <p className="font-medium text-[#0a1224]">${Number(quote.total).toLocaleString('es-MX')} MXN</p>
                <p className="text-xs text-gray-500">Fecha: {new Date(quote.created_at).toLocaleDateString('es-MX')} {Number(quote.tax) === 0 && <span className="ml-1 text-amber-600 font-medium">(Sin IVA)</span>}</p>
              </div>
              <div className="flex items-center space-x-2">
                <a 
                  href={`/cotizacion/${quote.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-1.5" /> Ver web
                </a>
                <button 
                  onClick={() => handleCopyLink(quote.id)}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Copiar enlace"
                >
                  {copiedId === quote.id ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <button 
                  onClick={() => loadQuoteForEdit(quote)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar cotización"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteQuote(quote.id, leadId)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar cotización"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Constructor Area Header */}
      {!isBuilderOpen ? (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5 mr-2" /> Crear Nueva Cotización
          </button>
        </div>
      ) : (
          <div className="mt-10 pt-8 border-t border-dashed border-gray-300">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-[#0a1224] flex items-center">
                  {editingQuoteId ? <Edit2 className="h-5 w-5 mr-2 text-amber-500" /> : <Plus className="h-5 w-5 mr-2 text-blue-600" />}
                  {editingQuoteId ? 'Editar Cotización' : 'Crear Nueva Cotización'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Sigue los 3 pasos para construir el documento corporativo.</p>
              </div>
              <button 
                onClick={cancelEdit} 
                className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center"
              >
                <X className="h-4 w-4 mr-1" /> {editingQuoteId ? 'Cancelar Edición' : 'Cerrar Constructor'}
              </button>
            </div>

            {/* Paso 1: Conceptos */}
            <div className={`border ${editingQuoteId ? 'border-amber-400 shadow-sm ring-1 ring-amber-100' : 'border-gray-200'} rounded-xl overflow-hidden transition-all duration-300`}>
          <div className={`p-4 ${editingQuoteId ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'} border-b font-medium text-sm text-gray-700`}>
            Paso 1: Conceptos y Precios
          </div>
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Descripción del concepto (ej. Sitio Web Corporativo)"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    placeholder="Cant."
                    value={item.quantity || ''}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    min="0"
                    placeholder="Precio Unit."
                    value={item.price || ''}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <button 
                  onClick={() => removeItem(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={addItem}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" /> Añadir Concepto
          </button>
        </div>
      </div>

      {/* Sección de Planeación de Actividades */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mt-6">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-700">
          Paso 2: Planeación de Actividades (Anexo A)
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">Define el cronograma tentativo del proyecto para generar el Anexo A (Gantt).</p>
            
            <div className="space-y-4 mb-4">
              {activities.map((act, index) => (
                <div key={index} className="flex flex-wrap items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="w-full md:flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Actividad Programada</label>
                    <input
                      type="text"
                      placeholder="Ej. Diseño UI/UX"
                      value={act.activity}
                      onChange={(e) => updateActivity(index, 'activity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div className="w-full md:w-40">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Responsable</label>
                    <select
                      value={act.responsible}
                      onChange={(e) => updateActivity(index, 'responsible', e.target.value as 'Cliente' | 'Nexoweb')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="Nexoweb">Nexoweb</option>
                      <option value="Cliente">Cliente</option>
                    </select>
                  </div>
                  <div className="w-full md:w-36">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Inicio</label>
                    <input
                      type="date"
                      value={act.startDate}
                      onChange={(e) => updateActivity(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div className="w-full md:w-36">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Final</label>
                    <input
                      type="date"
                      value={act.endDate}
                      min={act.startDate} // Ensure UI validation
                      onChange={(e) => updateActivity(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={() => removeActivity(index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar actividad"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={addActivity}
              className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" /> Añadir Actividad
            </button>
        </div>
      </div>

      {/* Sección de Alcance del Proyecto */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mt-6">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-700">
          Paso 3: Pormenores del Proyecto (Anexo B)
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">Redacta el alcance detallado para generar el Anexo B. Puedes usar negritas y listas.</p>
            <div className="bg-white">
              <ReactQuill 
                theme="snow" 
                value={scope} 
                onChange={setScope} 
                className="h-48 mb-12"
                placeholder="Escribe el alcance detallado del proyecto aquí..."
              />
            </div>
        </div>
      </div>

      {/* Totals and Save */}
      {items.length > 0 && (
        <div className="border border-gray-200 rounded-xl overflow-hidden mt-6 p-6 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="w-full md:w-1/2 flex flex-col gap-4 mb-4 md:mb-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Válido hasta (Opcional)</label>
                  <input 
                    type="date" 
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none w-full max-w-xs"
                  />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includeTax" 
                    checked={includeTax}
                    onChange={(e) => setIncludeTax(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
                  />
                  <label htmlFor="includeTax" className="ml-2 text-sm text-gray-700">
                    Incluir IVA (16%)
                  </label>
                </div>
              </div>

              <div className="w-full md:w-64 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-MX')}</span>
                </div>
                {includeTax && (
                  <div className="flex justify-between text-gray-500">
                    <span>IVA (16%)</span>
                    <span>${tax.toLocaleString('es-MX')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-[#0a1224] pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toLocaleString('es-MX')}</span>
                </div>
                
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full mt-4 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${editingQuoteId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSaving ? 'Guardando...' : (editingQuoteId ? 'Actualizar Cotización' : 'Generar Enlace')}
                </button>
              </div>
            </div>
        </div>
      )}
      </div>
    )}
    </div>
  )
}
