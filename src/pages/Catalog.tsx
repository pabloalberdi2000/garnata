import React, { useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import { useProducts, useCollections } from '../hooks/useContentful'
import { Product } from '../services/contentfulService'

type SortType = 'name' | 'price-low' | 'price-high'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Anillo Dorado Elegante',
    description: 'Anillo de oro 18K con diamante brillante',
    price: 1200.00,
    collection: 'Anillos',
    image: undefined,
  },
  {
    id: '2',
    name: 'Collar de Perlas Premium',
    description: 'Collar con perlas cultivadas de agua dulce',
    price: 850.00,
    collection: 'Collares',
    image: undefined,
  },
  {
    id: '3',
    name: 'Pendientes de Zafiro',
    description: 'Pendientes con zafiros naturales',
    price: 750.00,
    collection: 'Pendientes',
    image: undefined,
  },
  {
    id: '4',
    name: 'Brazalete de Oro Blanco',
    description: 'Brazalete con diseño minimalista en oro blanco',
    price: 950.00,
    collection: 'Brazaletes',
    image: undefined,
  },
  {
    id: '5',
    name: 'Anillo de Compromiso',
    description: 'Anillo solitario con diamante certificado',
    price: 3500.00,
    collection: 'Anillos',
    image: undefined,
  },
  {
    id: '6',
    name: 'Collar Infinito',
    description: 'Collar con símbolo de infinito en plata esterlina',
    price: 450.00,
    collection: 'Collares',
    image: undefined,
  },
]

export const Catalog: React.FC = () => {
  const { data: products, loading } = useProducts()
  const { data: collections } = useCollections()
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState<SortType>('name')

  useEffect(() => {
    const productsToFilter = products && products.length > 0 ? products : mockProducts

    let filtered = selectedCollection
      ? productsToFilter.filter(p => p.collection === selectedCollection)
      : productsToFilter

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCollection, sortBy])

  const displayCollections = collections && collections.length > 0
    ? collections.map(c => c.name)
    : ['Anillos', 'Collares', 'Pendientes', 'Brazaletes']

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Catálogo de Joyas
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Explora nuestra colección completa de joyas artesanales
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              {/* Collections Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Colecciones
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCollection(null)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCollection === null
                        ? 'bg-gold-100 text-gold-600 font-semibold'
                        : 'text-slate-600 hover:bg-cream-50'
                    }`}
                  >
                    Todas
                  </button>
                  {displayCollections.map((collection) => (
                    <button
                      key={collection}
                      onClick={() => setSelectedCollection(collection)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCollection === collection
                          ? 'bg-gold-100 text-gold-600 font-semibold'
                          : 'text-slate-600 hover:bg-cream-50'
                      }`}
                    >
                      {collection}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="border-t border-cream-200 pt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Ordenar por
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="name">Nombre (A-Z)</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="text-xl text-slate-600">Cargando...</div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div>
                <p className="text-slate-600 mb-6">
                  Mostrando {filteredProducts.length} productos
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-xl text-slate-600">
                  No hay productos en esta colección
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Catalog
