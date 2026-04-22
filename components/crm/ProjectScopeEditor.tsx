'use client'

import { useState } from 'react'
import { FileText, Edit2, Save } from 'lucide-react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { updateProjectScope } from '@/app/crm/projects/[id]/actions'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface Props {
  projectId: string
  quoteId: string
  initialScope: string
}

export default function ProjectScopeEditor({ projectId, quoteId, initialScope }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [scope, setScope] = useState(initialScope || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await updateProjectScope(projectId, quoteId, scope)
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setScope(initialScope || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-200 p-8 w-full">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-[#0a1224] flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Editando Alcance
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>

        <div className="bg-white mb-4">
          <ReactQuill 
            theme="snow" 
            value={scope} 
            onChange={setScope} 
            className="h-64 mb-12 rounded-lg"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
              ]
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full group relative">
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
        >
          <Edit2 className="h-4 w-4 mr-1.5" /> Editar
        </button>
      </div>

      <h3 className="text-xl font-bold text-[#0a1224] flex items-center mb-6 border-b border-gray-100 pb-4 pr-24">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        Alcance
      </h3>
      
      {initialScope ? (
        <div 
          className="prose max-w-none text-sm text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100"
          dangerouslySetInnerHTML={{ __html: initialScope }}
        />
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-2">No hay alcance redactado para este proyecto.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            Redactar alcance
          </button>
        </div>
      )}
    </div>
  )
}
