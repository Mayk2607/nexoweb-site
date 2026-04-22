import { logout } from '@/app/login/actions'
import { LogOut, User } from 'lucide-react'

export function Topbar({ userEmail }: { userEmail?: string }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 shadow-sm z-10 relative">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <User className="h-4 w-4 text-gray-400" />
          <span>{userEmail}</span>
        </div>
        
        <form action={logout}>
          <button 
            type="submit"
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span>Salir</span>
          </button>
        </form>
      </div>
    </header>
  )
}
