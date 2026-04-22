'use client'

import { useEffect, useState } from 'react'
import { Printer } from 'lucide-react'

export default function PrintButton() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button 
      onClick={() => window.print()} 
      className="flex items-center space-x-2 bg-white text-[#0a1224] border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors"
    >
      <Printer className="h-4 w-4" />
      <span>Descargar PDF</span>
    </button>
  )
}
