'use client'

import { useState } from 'react'
import { Activity, Edit2, Plus, Trash2, X, Save } from 'lucide-react'
import { format } from 'date-fns'
import { updateProjectActivities } from '@/app/crm/projects/[id]/actions'

interface GanttActivity {
  item: number
  activity: string
  responsible: 'Cliente' | 'Nexoweb'
  startDate: string
  endDate: string
}

interface Props {
  projectId: string
  quoteId: string
  initialActivities: GanttActivity[]
}

export default function ProjectGanttEditor({ projectId, quoteId, initialActivities }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [activities, setActivities] = useState<GanttActivity[]>(initialActivities || [])
  const [isSaving, setIsSaving] = useState(false)

  const addActivity = () => {
    setActivities([
      ...activities,
      { item: activities.length + 1, activity: '', responsible: 'Nexoweb', startDate: '', endDate: '' }
    ])
  }

  const updateActivity = (index: number, field: keyof GanttActivity, value: string | number) => {
    const newActivities = [...activities]
    newActivities[index] = { ...newActivities[index], [field]: value }
    
    if (field === 'startDate' && newActivities[index].endDate && new Date(value) > new Date(newActivities[index].endDate)) {
      newActivities[index].endDate = value as string
    } else if (field === 'endDate' && newActivities[index].startDate && new Date(value) < new Date(newActivities[index].startDate)) {
      alert("La fecha final no puede ser menor a la fecha de inicio.")
      return
    }
    
    setActivities(newActivities)
  }

  const removeActivity = (index: number) => {
    const newActivities = activities.filter((_, i) => i !== index)
    newActivities.forEach((act, i) => act.item = i + 1)
    setActivities(newActivities)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await updateProjectActivities(projectId, quoteId, activities)
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setActivities(initialActivities || [])
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-200 p-8 w-full">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-[#0a1224] flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Editando Cronograma (Gantt)
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

        <div className="space-y-4 mb-4">
          {activities.map((act, index) => (
            <div key={index} className="flex flex-wrap items-end gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="w-full md:flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Actividad Programada</label>
                <input
                  type="text"
                  placeholder="Ej. Diseño UI/UX"
                  value={act.activity}
                  onChange={(e) => updateActivity(index, 'activity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div className="w-full md:w-40">
                <label className="block text-xs font-medium text-gray-500 mb-1">Responsable</label>
                <select
                  value={act.responsible}
                  onChange={(e) => updateActivity(index, 'responsible', e.target.value as 'Cliente' | 'Nexoweb')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="Nexoweb">Nexoweb</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </div>
              <div className="w-full md:w-36">
                <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Inicio</label>
                <input
                  type="date"
                  value={act.startDate}
                  onChange={(e) => updateActivity(index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div className="w-full md:w-36">
                <label className="block text-xs font-medium text-gray-500 mb-1">Fecha Final</label>
                <input
                  type="date"
                  value={act.endDate}
                  min={act.startDate}
                  onChange={(e) => updateActivity(index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <button 
                  onClick={() => removeActivity(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-[2px]"
                  title="Eliminar actividad"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={addActivity}
          className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar otra actividad
        </button>
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
        <Activity className="h-5 w-5 mr-2 text-blue-600" />
        Cronograma de Actividades (Gantt)
      </h3>
      
      {initialActivities && initialActivities.length > 0 ? (
        <div className="space-y-6">
          {(() => {
            const validActivities = initialActivities.filter((a) => a.startDate && a.endDate);
            if (validActivities.length === 0) return <p className="text-gray-500">No hay fechas válidas en las actividades.</p>;

            const minDate = new Date(Math.min(...validActivities.map((a) => new Date(a.startDate).getTime())));
            const maxDate = new Date(Math.max(...validActivities.map((a) => new Date(a.endDate).getTime())));
            const totalDuration = maxDate.getTime() - minDate.getTime() || 1;

            return validActivities.map((act, i) => {
              const start = new Date(act.startDate).getTime();
              const end = new Date(act.endDate).getTime();
              const leftPercent = Math.max(0, ((start - minDate.getTime()) / totalDuration) * 100);
              const widthPercent = Math.max(2, ((end - start) / totalDuration) * 100);
              
              return (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-[#0a1224]">{act.item}. {act.activity}</span>
                    <span className="text-gray-500 text-xs">
                      {format(new Date(act.startDate), "dd/MM/yy")} - {format(new Date(act.endDate), "dd/MM/yy")}
                    </span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-md relative w-full overflow-hidden">
                    <div 
                      className={`absolute top-0 bottom-0 rounded-md ${act.responsible === 'Nexoweb' ? 'bg-blue-500' : 'bg-emerald-500'}`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">{act.responsible}</span>
                </div>
              )
            })
          })()}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-2">No hay un cronograma definido.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            Crear cronograma
          </button>
        </div>
      )}
    </div>
  )
}
