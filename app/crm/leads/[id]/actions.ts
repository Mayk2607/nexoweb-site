'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateLeadStatus(formData: FormData) {
  const id = formData.get('id') as string
  const status = formData.get('status') as string

  if (!id || !status) return

  const supabase = await createClient()
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)
  if (error) {
    console.error('Error updating status:', error.message)
    return
  }
  
  // If the status is won, we auto-create the client and the project if they don't exist
  if (status === 'won') {
    const { data: lead } = await supabase.from('leads').select('*').eq('id', id).single()
    if (lead) {
      // Check if client already exists for this lead
      const { data: existingClient } = await supabase.from('clients').select('id').eq('lead_id', id).maybeSingle()
      
      if (!existingClient) {
        // Generar Client Code (ej. CLI-001)
        const { count } = await supabase.from('clients').select('*', { count: 'exact', head: true })
        const nextId = (count || 0) + 1
        const clientCode = `CLI-${nextId.toString().padStart(3, '0')}`

        await supabase.from('clients').insert({
          lead_id: lead.id,
          client_code: clientCode,
          name: lead.name,
          phone: lead.phone,
          company: lead.company,
          address: lead.address,
          requirements: lead.requirements
        })
      }

      // Check if project already exists for this lead
      const { data: existingProject } = await supabase.from('projects').select('id').eq('lead_id', id).maybeSingle()

      if (!existingProject) {
        // Find the latest quote to link (if any)
        const { data: latestQuote } = await supabase.from('quotes')
          .select('id')
          .eq('lead_id', id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        await supabase.from('projects').insert({
          lead_id: lead.id,
          quote_id: latestQuote?.id || null,
          status: 'active',
          payment_status: 'pending'
        })
      }
    }
  }
  
  revalidatePath(`/crm/leads/${id}`)
  revalidatePath('/crm/leads')
}

export async function updateLeadDetails(formData: FormData) {
  const id = formData.get('id') as string
  const address = formData.get('address') as string
  const requirements = formData.get('requirements') as string

  if (!id) return

  const supabase = await createClient()
  const { error } = await supabase.from('leads').update({ address, requirements }).eq('id', id)
  if (error) {
    console.error('Error updating lead details:', error.message)
  }
  
  revalidatePath(`/crm/leads/${id}`)
}

export async function addLeadNote(formData: FormData) {
  const lead_id = formData.get('lead_id') as string
  const content = formData.get('content') as string

  if (!lead_id || !content.trim()) return

  const supabase = await createClient()
  await supabase.from('lead_notes').insert({ lead_id, content })
  
  revalidatePath(`/crm/leads/${lead_id}`)
}

export async function saveQuote(
  leadId: string, 
  items: any[], 
  validUntil: string, 
  quoteId?: string, 
  includeTax: boolean = true,
  activities: any[] = [],
  scope: string = ''
) {
  if (!leadId || !items || items.length === 0) return { error: 'Datos inválidos' }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = includeTax ? subtotal * 0.16 : 0 // IVA 16% México
  const total = subtotal + tax

  const supabase = await createClient()
  
  const payload = {
    lead_id: leadId,
    items,
    subtotal,
    tax,
    total,
    valid_until: validUntil || null,
    activities,
    scope
  }

  let result
  if (quoteId) {
    result = await supabase.from('quotes').update(payload).eq('id', quoteId).select().single()
  } else {
    result = await supabase.from('quotes').insert(payload).select().single()
  }

  if (result.error) {
    console.error('Error saving quote:', result.error.message)
    return { error: result.error.message }
  }

  revalidatePath(`/crm/leads/${leadId}`)
  return { success: true, quoteId: result.data.id }
}

export async function deleteQuote(quoteId: string, leadId: string) {
  const supabase = await createClient()
  await supabase.from('quotes').delete().eq('id', quoteId)
  revalidatePath(`/crm/leads/${leadId}`)
}
