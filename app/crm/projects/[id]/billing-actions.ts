'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function registerPayment(
  projectId: string, 
  quoteId: string, 
  amount: number, 
  concept: string, 
  method: string,
  totalQuoteAmount: number
) {
  if (!projectId || !amount) return { error: 'Faltan datos requeridos' }

  const supabase = await createClient()

  // 1. Insert the payment
  const { error: insertError } = await supabase.from('invoices').insert({
    project_id: projectId,
    quote_id: quoteId,
    amount,
    concept,
    payment_method: method,
    status: 'paid', // Default to paid as it's a registry
    payment_date: new Date().toISOString()
  })

  if (insertError) {
    console.error('Error inserting payment:', insertError)
    return { error: 'Error al registrar el pago' }
  }

  // 2. Recalculate total paid
  const { data: payments } = await supabase
    .from('invoices')
    .select('amount')
    .eq('project_id', projectId)

  const totalPaid = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

  // 3. Update Project status
  let newStatus = 'pending'
  if (totalPaid > 0 && totalPaid < totalQuoteAmount) {
    newStatus = 'partial'
  } else if (totalPaid >= totalQuoteAmount && totalQuoteAmount > 0) {
    newStatus = 'paid'
  }

  await supabase.from('projects').update({
    payment_status: newStatus
  }).eq('id', projectId)

  revalidatePath(`/crm/projects/${projectId}`)
  revalidatePath('/crm/projects')

  return { success: true }
}

export async function deletePayment(paymentId: string, projectId: string, totalQuoteAmount: number) {
  const supabase = await createClient()
  
  const { error: deleteError } = await supabase.from('invoices').delete().eq('id', paymentId)
  
  if (deleteError) {
    console.error('Error deleting payment:', deleteError)
    return { error: deleteError.message }
  }

  // Recalculate total paid
  const { data: payments } = await supabase
    .from('invoices')
    .select('amount')
    .eq('project_id', projectId)

  const totalPaid = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

  let newStatus = 'pending'
  if (totalPaid > 0 && totalPaid < totalQuoteAmount) {
    newStatus = 'partial'
  } else if (totalPaid >= totalQuoteAmount && totalQuoteAmount > 0) {
    newStatus = 'paid'
  }

  await supabase.from('projects').update({
    payment_status: newStatus
  }).eq('id', projectId)

  revalidatePath(`/crm/projects/${projectId}`)
  revalidatePath('/crm/projects')

  return { success: true }
}
