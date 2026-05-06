import React from 'react'

type Status = 'available' | 'archived' | 'limited'

interface StatusBadgeProps {
  status: Status
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const statusConfig = {
    available: {
      label: 'Disponible',
      styles: 'bg-slate-900 text-white',
      icon: '◆',
    },
    archived: {
      label: 'Archivado',
      styles: 'bg-slate-200 text-slate-600 italic',
      icon: '◇',
    },
    limited: {
      label: 'Edición Limitada',
      styles: 'bg-gold-100 text-gold-700 font-semibold',
      icon: '★',
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={`
        px-3 py-2 rounded-sm backdrop-blur-sm
        text-xs font-light tracking-widest uppercase
        ${config.styles}
        ${className}
      `}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </div>
  )
}

export default StatusBadge
