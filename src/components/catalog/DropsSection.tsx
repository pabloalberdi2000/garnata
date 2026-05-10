import React, { useState } from 'react'
import { Drop } from '../../services/contentfulService'
import { useDrops } from '../../hooks/useDrops'
import CatalogLayout from './CatalogLayout'

interface DropsSectionProps {
  drops: Drop[]
  onDropSelect?: (drop: Drop) => void
}

export const DropsSection: React.FC<DropsSectionProps> = ({
  drops,
  onDropSelect,
}) => {
  const [selectedDrop, setSelectedDrop] = useState<Drop | null>(() => {
    // Seleccionar el primer drop disponible (fecha pasada o presente)
    const availableDrop = drops.find(drop => {
      if (!drop.date) return true
      return new Date(drop.date) <= new Date()
    })
    return availableDrop || null
  })
  const handleSelectDrop = (drop: Drop) => {
    if (drop.date && new Date(drop.date) > new Date()) {
      return // No permitir seleccionar drops futuros
    }
    setSelectedDrop(drop)
    onDropSelect?.(drop)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Sin fecha'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
  }

  const isDropAvailable = (drop: Drop) => {
    if (!drop.date) return true
    return new Date(drop.date) <= new Date()
  }

  const { data: allDrops } = useDrops()
  const hasFutureDrop = allDrops.some(drop => drop.date && new Date(drop.date) > new Date())

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Drops Navigation - Minimal */}
      <div className={`bg-white border-b border-cream-200 sticky z-40 ${hasFutureDrop ? 'top-20' : 'top-14'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex gap-6 py-3 overflow-hidden">
            {drops.map((drop) => {
              const available = isDropAvailable(drop)
              const isSelected = selectedDrop?.id === drop.id

              return (
                <div key={drop.id} className="relative group">
                  <button
                    onClick={() => handleSelectDrop(drop)}
                    disabled={!available}
                    className={`
                      pb-2 border-b-2 transition-all duration-300 whitespace-nowrap flex-shrink-0
                      text-xs font-light tracking-wide uppercase flex items-center gap-1.5 px-2
                      ${
                        !available
                          ? 'text-slate-300 border-transparent cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'border-slate-900 text-slate-900'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }
                    `}
                  >
                    {drop.name}
                    {/* Upcoming Badge inside Tab */}
                    {!available && (
                      <span className="inline-block bg-slate-900 text-white text-[9px] px-1 py-0.5 rounded">
                        Próximo
                      </span>
                    )}
                  </button>

                  {/* Tooltip on Hover - Below */}
                  {!available && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      Disponible: {drop.date ? new Date(drop.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : 'Pronto'}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active Drop Content */}
      {selectedDrop && (
        <CatalogLayout
          products={selectedDrop.products}
          title={selectedDrop.name}
          description={selectedDrop.description}
          dropDate={selectedDrop.date}
          dropImage={selectedDrop.pictures?.[0]}
        />
      )}
    </div>
  )
}

export default DropsSection
