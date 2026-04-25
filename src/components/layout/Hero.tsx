import React from 'react'
import { Link } from 'react-router-dom'

export const Hero: React.FC = () => {
  return (
    <section className="bg-white py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-12">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-serif font-light text-slate-900 tracking-widest">
              GARNATA
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light tracking-wide">
              Joyas Artesanales de Lujo
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-lg text-slate-600 font-light leading-relaxed">
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
          <div className="w-12 h-px bg-slate-300 mt-8"></div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 w-full">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-light text-slate-900 tracking-wide">MATERIALES PREMIUM</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Oro, plata y piedras preciosas de primera calidad seleccionadas cuidadosamente.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-light text-slate-900 tracking-wide">ARTESANÍA ÚNICA</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Cada joya es diseñada y creada manualmente por maestros joyeros.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-light text-slate-900 tracking-wide">ENVÍO SEGURO</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
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
