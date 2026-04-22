'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Settings, Building2, FileText, FolderKanban } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Dashboard', href: '/crm', icon: LayoutDashboard },
    { name: 'Prospectos', href: '/crm/leads', icon: Users },
    { name: 'Clientes', href: '/crm/clients', icon: Building2 },
    { name: 'Cotizaciones', href: '/crm/quotes', icon: FileText },
    { name: 'Proyectos', href: '/crm/projects', icon: FolderKanban },
    { name: 'Configuración', href: '/crm/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm relative">
      <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
        <Image src="/logo.png" alt="Nexoweb Logo" width={110} height={28} className="object-contain" priority />
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">CRM v1.0</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          // Excepción para la raíz del CRM para que no se marque si estamos en otra subruta
          const isReallyActive = item.href === '/crm' ? pathname === '/crm' : isActive

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isReallyActive 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0a1224]'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isReallyActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
