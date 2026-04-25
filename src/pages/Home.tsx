import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import ProductCard from '../components/product/ProductCard'
import { useProducts, useCollections } from '../hooks/useContentful'
import { Product } from '../services/contentfulService'

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

export const Home: React.FC = () => {
  const { data: products, loading: productsLoading } = useProducts()
  const { data: collections } = useCollections()
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    if (products && products.length > 0) {
      if (selectedCollection) {
        setFilteredProducts(
          products.filter(p => p.collection === selectedCollection)
        )
      } else {
        setFilteredProducts(products.slice(0, 6))
      }
    } else {
      setFilteredProducts(mockProducts.slice(0, 6))
    }
  }, [products, selectedCollection])

  const displayCollections = collections && collections.length > 0
    ? collections.map(c => c.name)
    : ['Anillos', 'Collares', 'Pendientes', 'Brazaletes']

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Collections Section */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-6 tracking-widest">
              Nuestras Colecciones
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              Descubre nuestras exclusivas colecciones de joyas artesanales
            </p>
          </div>

          {/* Collection Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`px-6 py-2 font-light text-sm tracking-wide transition-all ${
                selectedCollection === null
                  ? 'bg-slate-900 text-white border border-slate-900'
                  : 'border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900'
              }`}
            >
              TODAS
            </button>
            {displayCollections.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-6 py-2 font-light text-sm tracking-wide transition-all ${
                  selectedCollection === collection
                    ? 'bg-slate-900 text-white border border-slate-900'
                    : 'border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900'
                }`}
              >
                {collection.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-slate-600">Cargando productos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-6 tracking-widest">
            Suscríbete
          </h3>
          <p className="text-slate-600 font-light mb-10 text-lg leading-relaxed">
            Recibe ofertas exclusivas y novedades sobre nuestras colecciones
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-6 py-3 border border-slate-300 font-light bg-white focus:outline-none focus:border-slate-900 transition-colors"
            />
            <button className="px-10 py-3 bg-slate-900 text-white font-light hover:bg-slate-800 transition-all tracking-widest text-sm uppercase">
              Enviar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
