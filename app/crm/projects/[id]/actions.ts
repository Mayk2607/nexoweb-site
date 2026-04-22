'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProjectStatus(formData: FormData) {
  const id = formData.get('id') as string
  const status = formData.get('status') as string

  if (!id || !status) return

  const supabase = await createClient()
  await supabase.from('projects').update({ status }).eq('id', id)
  
  revalidatePath(`/crm/projects/${id}`)
  revalidatePath('/crm/projects')
}

export async function updateFinancialStatus(formData: FormData) {
  const id = formData.get('id') as string
  const payment_status = formData.get('payment_status') as string
  const invoice_number = formData.get('invoice_number') as string

  if (!id || !payment_status) return

  const supabase = await createClient()
  await supabase.from('projects').update({ 
    payment_status,
    invoice_number: invoice_number || null 
  }).eq('id', id)
  
  revalidatePath(`/crm/projects/${id}`)
  revalidatePath('/crm/projects')
}

export async function updateClientGoals(formData: FormData) {
  const id = formData.get('id') as string
  const client_goals = formData.get('client_goals') as string

  if (!id) return

  const supabase = await createClient()
  await supabase.from('projects').update({ client_goals }).eq('id', id)
  
  revalidatePath(`/crm/projects/${id}`)
}

export async function updateProjectActivities(projectId: string, quoteId: string, activities: any[]) {
  if (!quoteId || !projectId) return

  const supabase = await createClient()
  await supabase.from('quotes').update({ activities }).eq('id', quoteId)
  
  revalidatePath(`/crm/projects/${projectId}`)
}

export async function updateProjectScope(projectId: string, quoteId: string, scope: string) {
  if (!quoteId || !projectId) return

  const supabase = await createClient()
  await supabase.from('quotes').update({ scope }).eq('id', quoteId)
  
  revalidatePath(`/crm/projects/${projectId}`)
}
