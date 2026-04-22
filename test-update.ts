import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data, error } = await supabase.from('leads').update({ status: 'contacted' }).eq('id', '5ed55144-ef8b-4ee0-ac91-6e30ca59bd8b').select()
  console.log('Update result:', data, error)
}

test()
