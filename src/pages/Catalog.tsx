import React from 'react'
import DropsSection from '../components/catalog/DropsSection'
import { useDrops } from '../hooks/useDrops'

// Mock data como fallback si Contentful no tiene datos
const mockDrops = [
  {
    id: 'drop-1',
    name: 'Serenidad',
    slug: 'serenidad',
    date: '2026-05-06',
    description: 'Una colección que evoca la tranquilidad absoluta.',
    pictures: [],
    products: [],
  },
]

export const Catalog: React.FC = () => {
  const { data: drops, loading, error } = useDrops()

  // Usar datos de Contentful si están disponibles, sino usar mock
  const displayDrops = drops.length > 0 ? drops : mockDrops

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 font-light">◆</div>
          <p className="text-slate-600 font-light">Cargando colecciones...</p>
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Error loading drops:', error)
  }

  return <DropsSection drops={displayDrops} />
}

export default Catalog
