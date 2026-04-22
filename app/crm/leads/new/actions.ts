'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createLead(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const company = formData.get('company') as string
  const service = formData.get('service') as string
  const message = formData.get('message') as string

  if (!name || !email || !service) {
    throw new Error('Name, email and service are required')
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name,
        email,
        phone,
        company,
        service,
        message,
        status: 'new'
      }
    ])
    .select()

  if (error) {
    console.error('Error creating lead:', error)
    throw new Error('Failed to create lead')
  }

  if (data && data[0]) {
    redirect(`/crm/leads/${data[0].id}`)
  } else {
    redirect('/crm/leads')
  }
}
