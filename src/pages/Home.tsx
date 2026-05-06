import React from 'react'
import Hero from '../components/layout/Hero'
import ProductCard from '../components/product/ProductCard'
import { useProducts } from '../hooks/useContentful'
import type { Product } from '../services/contentfulService'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Anillo Dorado Elegante',
    description: 'Anillo de oro 18K con diamante brillante',
    price: 1200.00,
    slug: 'anillo-dorado-elegante',
  },
  {
    id: '2',
    name: 'Collar de Perlas Premium',
    description: 'Collar con perlas cultivadas de agua dulce',
    price: 850.00,
    slug: 'collar-perlas-premium',
  },
  {
    id: '3',
    name: 'Pendientes de Zafiro',
    description: 'Pendientes con zafiros naturales',
    price: 750.00,
    slug: 'pendientes-zafiro',
  },
  {
    id: '4',
    name: 'Brazalete de Oro Blanco',
    description: 'Brazalete con diseño minimalista en oro blanco',
    price: 950.00,
    slug: 'brazalete-oro-blanco',
  },
  {
    id: '5',
    name: 'Anillo de Compromiso',
    description: 'Anillo solitario con diamante certificado',
    price: 3500.00,
    slug: 'anillo-compromiso',
  },
  {
    id: '6',
    name: 'Collar Infinito',
    description: 'Collar con símbolo de infinito en plata esterlina',
    price: 450.00,
    slug: 'collar-infinito',
  },
]

export const Home: React.FC = () => {
  const { data: products, loading: productsLoading } = useProducts()
  const displayProducts = (products && products.length > 0) ? products.slice(0, 6) : mockProducts

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-6 tracking-widest">
              Colecciones Destacadas
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              Descubre nuestras exclusivas joyas artesanales
            </p>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-slate-600">Cargando productos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
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
