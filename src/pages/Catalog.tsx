import React from 'react'
import DropsSection from '../components/catalog/DropsSection'
import type { Drop } from '../components/catalog/DropsSection'

// Mock data - Drops con 1-3 joyas cada uno
const mockDrops: Drop[] = [
  {
    id: 'drop-1',
    title: 'Serenidad',
    description: 'Una colección que evoca la tranquilidad absoluta. Cada pieza ha sido diseñada para transmitir paz y elegancia minimalista.',
    season: 'Primavera',
    year: 2026,
    isActive: true,
    products: [
      {
        id: '1',
        name: 'Anillo Minimalista',
        description: 'Anillo de oro 18K con diamante certificado de corte brillante. Una joya atemporal que refleja la esencia de la serenidad.',
        price: 2450.00,
        collection: 'Serenidad',
        image: undefined,
      },
      {
        id: '2',
        name: 'Collar Sutil',
        description: 'Collar con perlas de agua dulce cultivadas con cuidado, diseñado para complementar cualquier ocasión especial.',
        price: 1850.00,
        collection: 'Serenidad',
        image: undefined,
      },
      {
        id: '3',
        name: 'Pendientes Delicados',
        description: 'Pendientes con zafiros naturales en engaste de oro blanco 18K. Ligereza y sofisticación en cada detalle.',
        price: 1650.00,
        collection: 'Serenidad',
        image: undefined,
      },
    ],
  },
  {
    id: 'drop-2',
    title: 'Luminescence',
    description: 'La luz como protagonista. Una colección que captura la esencia del brillo y la luminosidad en cada pieza artesanal.',
    season: 'Verano',
    year: 2026,
    isActive: true,
    products: [
      {
        id: '4',
        name: 'Brazalete Aurora',
        description: 'Brazalete de oro blanco con diamantes de alta claridad que reflejan la luz del amanecer.',
        price: 3200.00,
        collection: 'Luminescence',
        image: undefined,
      },
      {
        id: '5',
        name: 'Anillo Destello',
        description: 'Una pieza singular que combina diamantes y rubíes en una composición equilibrada y radiante.',
        price: 2800.00,
        collection: 'Luminescence',
        image: undefined,
      },
    ],
  },
  {
    id: 'drop-3',
    title: 'Eternidad',
    description: 'Diseñada para los momentos que marcan la vida. Una sola joya, perfecta y única, creada para el instante eterno.',
    season: 'Otoño',
    year: 2026,
    isActive: true,
    products: [
      {
        id: '6',
        name: 'Anillo de Compromiso Solitario',
        description: 'El anillo perfecto para decir "sí". Diamante certificado de 2.5 quilates en engaste de platino 950.',
        price: 8500.00,
        collection: 'Eternidad',
        image: undefined,
      },
    ],
  },
]

export const Catalog: React.FC = () => {
  return <DropsSection drops={mockDrops} />
}

export default Catalog
