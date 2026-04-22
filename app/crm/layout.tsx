import { Sidebar } from '@/components/crm/Sidebar'
import { Topbar } from '@/components/crm/Topbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CRMLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-[#f4f7fb] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar userEmail={user.email} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
