'use client'

import { updateLeadStatus } from './actions'

type StatusOption = {
  value: string;
  label: string;
  color: string;
}

export default function StatusChanger({ 
  leadId, 
  currentStatusValue, 
  statusOptions 
}: { 
  leadId: string, 
  currentStatusValue: string, 
  statusOptions: StatusOption[] 
}) {
  const currentStatus = statusOptions.find(s => s.value === currentStatusValue) || statusOptions[0]

  return (
    <div className="flex items-center">
      <select 
        name="status" 
        value={currentStatusValue}
        onChange={async (e) => {
          const formData = new FormData();
          formData.append('id', leadId);
          formData.append('status', e.target.value);
          await updateLeadStatus(formData);
        }}
        className={`pl-4 pr-10 py-2.5 appearance-none rounded-xl border text-sm font-medium cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${currentStatus.color}`}
      >
        {statusOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
