import React from 'react'
import { Link } from 'react-router-dom'

export const Hero: React.FC = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/portada.png)',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Gradient Overlay - Dark from bottom, transparent from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />

      {/* Light overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-12">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-serif font-light text-white tracking-widest drop-shadow-lg">
              GARNATA
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide drop-shadow-md">
              Joyas Artesanales de Lujo
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-lg text-white/85 font-light leading-relaxed drop-shadow-md">
            Cada pieza es una obra maestra. Diseños exclusivos que reflejan tu personalidad y elegancia. Hecho a mano con los mejores materiales.
          </p>

          {/* CTA Button */}
          <Link
            to="/catalog"
            className="px-10 py-4 bg-slate-900 text-white font-light rounded-none hover:bg-slate-800 transition-all duration-300 tracking-widest text-sm uppercase"
          >
            Explorar Colección
          </Link>

          {/* Divider */}
          <div className="w-12 h-px bg-white/50 mt-8"></div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 w-full">
            <div className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-serif text-lg font-light text-white tracking-wide">MATERIALES PREMIUM</h3>
              <p className="text-white/80 font-light text-sm leading-relaxed">
                Oro, plata y piedras preciosas de primera calidad seleccionadas cuidadosamente.
              </p>
            </div>
            <div className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-serif text-lg font-light text-white tracking-wide">ARTESANÍA ÚNICA</h3>
              <p className="text-white/80 font-light text-sm leading-relaxed">
                Cada joya es diseñada y creada manualmente por maestros joyeros.
              </p>
            </div>
            <div className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-serif text-lg font-light text-white tracking-wide">ENVÍO SEGURO</h3>
              <p className="text-white/80 font-light text-sm leading-relaxed">
                Empaque premium y entrega certificada con garantía completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
