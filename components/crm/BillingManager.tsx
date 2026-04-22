'use client'

import { useState } from 'react'
import { Plus, Receipt, Trash2, Printer } from 'lucide-react'
import { registerPayment, deletePayment } from '@/app/crm/projects/[id]/billing-actions'
import { formatCurrency } from '@/lib/utils'

interface Payment {
  id: string
  amount: number
  concept: string
  payment_method: string
  payment_date: string
  created_at: string
}

interface BillingManagerProps {
  projectId: string
  quoteId: string
  totalQuoteAmount: number
  clientData: any // For the receipt
  quoteData: any
  payments: Payment[]
}

export default function BillingManager({ 
  projectId, 
  quoteId, 
  totalQuoteAmount, 
  clientData,
  quoteData,
  payments = [] 
}: BillingManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    concept: 'Anticipo 50%',
    method: 'transferencia'
  })

  const [receiptPayment, setReceiptPayment] = useState<Payment | null>(null)

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0)
  const balance = totalQuoteAmount - totalPaid

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount) return

    setIsSaving(true)
    const result = await registerPayment(
      projectId, 
      quoteId, 
      Number(formData.amount), 
      formData.concept, 
      formData.method,
      totalQuoteAmount
    )
    
    if (result.success) {
      setIsModalOpen(false)
      setFormData({ amount: '', concept: '', method: 'transferencia' })
    }
    setIsSaving(false)
  }

  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null)

  const confirmDelete = async () => {
    if (!paymentToDelete) return
    
    setIsDeleting(paymentToDelete)
    try {
      const result = await deletePayment(paymentToDelete, projectId, totalQuoteAmount)
      if (result.error) {
        alert(`Error al eliminar: ${result.error}\n\nEs posible que falten permisos (RLS) en la base de datos para borrar.`)
      }
    } catch (error) {
      alert('Error inesperado al intentar eliminar el pago.')
    } finally {
      setIsDeleting(null)
      setPaymentToDelete(null)
    }
  }

  const handleDeleteClick = (paymentId: string) => {
    setPaymentToDelete(paymentId)
  }

  const printReceipt = (payment: Payment) => {
    setReceiptPayment(payment)
    setTimeout(() => {
      window.print()
      setReceiptPayment(null) // Hide after printing
    }, 100)
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-gray-500" />
            Historial de Pagos
          </h2>
          <p className="text-sm text-gray-500 mt-1">Control de abonos y facturación del proyecto.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Registrar Pago
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total Cotizado</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalQuoteAmount)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <p className="text-sm text-green-700 mb-1">Total Pagado</p>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(totalPaid)}</p>
        </div>
        <div className={`p-4 rounded-xl border ${balance <= 0 ? 'bg-gray-50 border-gray-100' : 'bg-orange-50 border-orange-100'}`}>
          <p className={`text-sm mb-1 ${balance <= 0 ? 'text-gray-500' : 'text-orange-700'}`}>Saldo Pendiente</p>
          <p className={`text-2xl font-bold ${balance <= 0 ? 'text-gray-900' : 'text-orange-700'}`}>{formatCurrency(balance)}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Concepto</th>
              <th className="px-4 py-3">Método</th>
              <th className="px-4 py-3">Monto</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No hay pagos registrados aún.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(payment.payment_date).toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{payment.concept}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{payment.payment_method}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => printReceipt(payment)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Generar Recibo"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(payment.id)}
                      disabled={isDeleting === payment.id}
                      className={`p-1.5 transition-colors ${isDeleting === payment.id ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:bg-red-50 rounded-lg'}`}
                      title="Eliminar Pago"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {paymentToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center print:hidden">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">¿Eliminar Pago?</h3>
            <p className="text-gray-600 mb-6">Esta acción no se puede deshacer. El saldo del proyecto se recalculará automáticamente.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPaymentToDelete(null)}
                disabled={isDeleting === paymentToDelete}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting === paymentToDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isDeleting === paymentToDelete ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  'Sí, Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Registrar Pago */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Registrar Pago</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Pagado</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                <input
                  type="text"
                  required
                  value={formData.concept}
                  onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej. Anticipo 50%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta de Crédito / Débito</option>
                  <option value="deposito">Depósito</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar Pago'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recibo para imprimir (Oculto en UI normal, visible en @media print) */}
      {receiptPayment && (
        <div className="hidden print:block absolute top-0 left-0 w-full min-h-screen bg-white z-[9999] py-8">
          <div className="w-full max-w-4xl mx-auto px-12 relative">
            
            {/* Watermark Logo / Stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none flex flex-col items-center justify-center">
              <div className="text-[200px] font-black tracking-tighter leading-none transform -rotate-12">NEXO</div>
            </div>

            {/* Paid Stamp */}
            <div className="absolute top-24 right-12 border-4 border-emerald-500 text-emerald-500 font-bold text-3xl px-6 py-2 rounded-xl transform rotate-12 opacity-80 pointer-events-none">
              PAGADO
            </div>

            {/* Header Section */}
            <div className="flex justify-between items-start border-b-2 border-[#0a1224] pb-6 mb-8">
              <div className="flex items-center">
                <div>
                  <h1 className="text-5xl font-black text-[#0a1224] tracking-tighter uppercase">Nexoweb</h1>
                  <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mt-1">Digital Agency & Software</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-300 mb-2 uppercase tracking-widest">Recibo</h2>
                <div className="bg-gray-50 inline-block px-4 py-2 rounded-lg border border-gray-100">
                  <p className="text-sm font-bold text-gray-900"># {receiptPayment.id.substring(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{new Date(receiptPayment.payment_date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Client & Project Info */}
            <div className="grid grid-cols-2 gap-8 mb-8 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Recibí de:</h3>
                </div>
                {/* Person's Name */}
                <p className="font-bold text-gray-900 text-xl mb-1">{clientData?.name || 'Cliente Sin Nombre'}</p>
                {/* Company Name (only if it exists and is different from name) */}
                {clientData?.company && clientData?.company !== clientData?.name && (
                  <p className="text-gray-700 font-medium mb-1">{clientData.company}</p>
                )}
                <p className="text-gray-600 mt-2 mb-0.5 text-sm"><strong>Teléfono:</strong> {clientData?.phone || 'No proporcionado'}</p>
                <p className="text-gray-600 mb-0.5 text-sm"><strong>Dirección:</strong> {clientData?.address || 'No proporcionada'}</p>
                <p className="text-gray-600 text-sm"><strong>RFC:</strong> {clientData?.rfc || 'No proporcionado'}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden h-fit">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Referencia de Proyecto</h3>
                <p className="font-bold text-[#0a1224] text-lg mb-1">
                  {clientData?.service === 'web-waas' ? 'Suscripción Web (WaaS)' : 
                   clientData?.service === 'marketing' ? 'Campaña de Marketing' : 
                   clientData?.service === 'branding' ? 'Diseño de Marca' : 'Servicios Digitales'}
                </p>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                  Pago correspondiente a los servicios estipulados en la propuesta formal.
                </p>
                
                <div className="bg-purple-50/50 rounded-xl p-2.5 border border-purple-100/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">ID Cotización</span>
                  <span className="font-mono text-sm font-bold text-[#0a1224]">CTZ-{quoteData?.quote_number}</span>
                </div>
              </div>
            </div>

            {/* Concepts Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-2 text-left text-sm font-bold text-gray-400 uppercase tracking-wider w-2/4">Descripción del Pago</th>
                    <th className="py-3 px-2 text-center text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4">Método</th>
                    <th className="py-3 px-2 text-right text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4">Importe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4 px-2">
                      <p className="font-bold text-gray-900 text-lg">{receiptPayment.concept}</p>
                      <p className="text-sm text-gray-500 mt-1">Abono a proyecto de desarrollo/marketing.</p>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold capitalize">
                        {receiptPayment.payment_method}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right font-black text-gray-900 text-xl">
                      {formatCurrency(receiptPayment.amount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals Box */}
            <div className="flex justify-end mb-8">
              <div className="w-80 bg-[#0a1224] text-white p-5 rounded-3xl shadow-xl">
                <div className="flex justify-between items-center mb-3 text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(receiptPayment.amount)}</span>
                </div>
                <div className="flex justify-between items-center mb-3 text-gray-400 text-sm">
                  <span>Impuestos</span>
                  <span>Incluidos</span>
                </div>
                <div className="w-full h-px bg-white/20 mb-3"></div>
                <div className="flex justify-between items-center text-xl font-black">
                  <span>TOTAL PAGADO</span>
                  <span className="text-emerald-400">{formatCurrency(receiptPayment.amount)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-8 text-center">
              <p className="font-bold text-gray-900 mb-2">¡Gracias por confiar en Nexoweb!</p>
              <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
                Este documento es un comprobante de pago con carácter informativo y administrativo interno. 
                No constituye un Comprobante Fiscal Digital por Internet (CFDI). Para solicitar su factura fiscal, 
                por favor contacte a su asesor dentro del mes correspondiente al pago.
              </p>
              <div className="flex justify-center gap-6 mt-4 text-sm font-medium text-gray-400">
                <span>ventas@nexoweb.mx</span>
                <span>•</span>
                <span>www.nexoweb.mx</span>
                <span>•</span>
                <span>8445072670</span>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  )
}
