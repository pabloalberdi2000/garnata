import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/layout/Hero'
import { useDrops } from '../hooks/useDrops'
import type { Drop } from '../services/contentfulService'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { data: drops, loading: dropsLoading } = useDrops()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Drops Section */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-6 tracking-widest">
              Colecciones Destacadas
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              Descubre nuestras exclusivas colecciones de temporada
            </p>
          </div>

          {/* Drops Grid */}
          {dropsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-slate-600">Cargando colecciones...</div>
            </div>
          ) : drops && drops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {drops
                .filter(drop => !drop.date || new Date(drop.date) <= new Date())
                .slice(0, 6)
                .map((drop) => (
                <div
                  key={drop.id}
                  onClick={() => navigate('/catalog')}
                  className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Drop Card with Background Image */}
                  <div
                    className="relative h-96 overflow-hidden flex flex-col justify-end"
                    style={{
                      backgroundImage: drop.pictures && drop.pictures.length > 0
                        ? `url(${drop.pictures[0]})`
                        : drop.products && drop.products.length > 0 && drop.products[0].pictures?.[0]
                        ? `url(${drop.products[0].pictures[0]})`
                        : 'linear-gradient(to bottom right, #f1f5f9, #fef3c7)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Gradient Overlay - Dark from bottom, transparent from top */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />

                    {/* Side gradient for additional contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                    {/* Hover Scale Effect */}
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 origin-center" />

                    {/* Drop Info - Positioned at bottom */}
                    <div className="relative z-10 p-8 space-y-4">
                      <div className="space-y-3">
                        <p className="text-xs text-white/80 font-light tracking-widest uppercase drop-shadow-md">
                          Colección Exclusiva
                        </p>
                        <h3 className="text-2xl font-serif font-light text-white drop-shadow-lg leading-tight">
                          {drop.name}
                        </h3>
                        <p className="text-sm text-white/85 font-light line-clamp-2 leading-relaxed drop-shadow-md">
                          {drop.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-white/30">
                        <div className="space-y-1">
                          <p className="text-xs text-white/70 font-light drop-shadow-md">Piezas</p>
                          <p className="text-xl font-light text-white drop-shadow-lg">
                            {drop.products?.length || 0}
                          </p>
                        </div>
                        <button className="px-6 py-2 bg-white text-slate-900 text-xs font-light tracking-widest uppercase hover:bg-slate-100 transition-all duration-200 shadow-lg">
                          Explorar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-slate-600">No hay colecciones disponibles</div>
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
