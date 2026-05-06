import React, { useState } from 'react'
import { Product } from '../../services/contentfulService'
import CatalogLayout from './CatalogLayout'

export interface Drop {
  id: string
  title: string
  description: string
  season: string
  year: number
  products: Product[]
  isActive: boolean
}

interface DropsSectionProps {
  drops: Drop[]
  onDropSelect?: (drop: Drop) => void
}

export const DropsSection: React.FC<DropsSectionProps> = ({
  drops,
  onDropSelect,
}) => {
  const [selectedDrop, setSelectedDrop] = useState<Drop | null>(drops[0] || null)

  const handleSelectDrop = (drop: Drop) => {
    setSelectedDrop(drop)
    onDropSelect?.(drop)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Drops Navigation */}
      <div className="bg-white border-b border-cream-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex overflow-x-auto gap-8 py-8">
            {drops.map((drop) => (
              <button
                key={drop.id}
                onClick={() => handleSelectDrop(drop)}
                className={`
                  whitespace-nowrap pb-4 border-b-2 transition-all duration-300
                  text-sm font-light tracking-wide uppercase
                  ${
                    selectedDrop?.id === drop.id
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }
                `}
              >
                {drop.season} {drop.year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Drop Content */}
      {selectedDrop && (
        <CatalogLayout
          products={selectedDrop.products}
          title={selectedDrop.title}
          description={selectedDrop.description}
        />
      )}
    </div>
  )
}

export default DropsSection
