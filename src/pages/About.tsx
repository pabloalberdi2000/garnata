import React from 'react'
import { useBrandInfo } from '../hooks/useDrops'

interface ProcessStep {
  step: number
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Diseño',
    description: 'Creamos diseños originales inspirados en la belleza y la naturaleza',
  },
  {
    step: 2,
    title: 'Selección de Materiales',
    description: 'Elegimos cuidadosamente oro, plata y piedras de la más alta calidad',
  },
  {
    step: 3,
    title: 'Creación Artesanal',
    description: 'Nuestros maestros joyeros crean cada pieza manualmente',
  },
  {
    step: 4,
    title: 'Control de Calidad',
    description: 'Verificamos minuciosamente cada detalle y acabado',
  },
  {
    step: 5,
    title: 'Entrega Certificada',
    description: 'Enviamos tu joya con certificados de autenticidad y garantía',
  },
]

export const About: React.FC = () => {
  const { data: brandInfo, loading } = useBrandInfo()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 font-light">◆</div>
          <p className="text-slate-600 font-light">Cargando información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden border-b border-gold-200">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/nosotros.jpg)',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Gradient Overlay - Light Gray */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/20 to-slate-900/30" />

        {/* Light overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-serif font-light text-white tracking-widest drop-shadow-lg">
                {brandInfo?.name || 'GARNATA'}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide drop-shadow-md">
                {brandInfo?.slogan || 'Tradición, artesanía y elegancia'}
              </p>
            </div>

            <div className="w-12 h-px bg-white/50 mt-8"></div>

            <p className="max-w-2xl text-lg text-white/85 font-light leading-relaxed drop-shadow-md">
              {brandInfo?.description || 'GARNATA nace de la pasión por crear joyas que trascienden el tiempo. Cada pieza es una obra maestra de artesanía y diseño exclusivo.'}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-white border-b border-gold-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 md:order-1">
              <div>
                <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 tracking-widest mb-6">
                  Nuestra Historia
                </h2>
                <div className="w-12 h-px bg-gold-300"></div>
              </div>

              {brandInfo?.description ? (
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  {brandInfo.description}
                </p>
              ) : (
                <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                  <p>
                    GARNATA nació hace más de 20 años con la visión de crear joyas que transciendan el tiempo. Cada pieza es diseñada con pasión y creada con las técnicas tradicionales de orfebrería.
                  </p>
                  <p>
                    Ubicados en el corazón de Granada, España, nos enorgullece crear joyas que reflejan la belleza y la rica cultura de nuestra región.
                  </p>
                  <p>
                    Utilizamos únicamente materiales de la más alta calidad: oro, plata y piedras preciosas certificadas, garantizando que cada joya durará toda una vida.
                  </p>
                </div>
              )}
            </div>

            <div className="order-1 md:order-2 overflow-hidden shadow-xl">
              {brandInfo?.pictures?.[0] ? (
                <img
                  src={brandInfo.pictures[0]}
                  alt={brandInfo.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="bg-gradient-to-br from-gold-100 to-cream-100 h-96 flex items-center justify-center text-6xl">
                  ✨
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-cream-50 to-white border-b border-gold-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 tracking-widest mb-6">
              Nuestros Valores
            </h2>
            <div className="w-12 h-px bg-gold-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 p-8 bg-white/60 backdrop-blur-sm rounded-lg border border-gold-100/50">
              <div className="text-5xl font-light text-gold-300">◆</div>
              <h3 className="text-2xl font-serif font-light text-slate-900">
                Diseño Exclusivo
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Cada diseño es único y pensado especialmente para reflejar tu personalidad. No repetimos colecciones.
              </p>
            </div>

            <div className="space-y-6 p-8 bg-white/60 backdrop-blur-sm rounded-lg border border-gold-100/50">
              <div className="text-5xl font-light text-gold-300">◆</div>
              <h3 className="text-2xl font-serif font-light text-slate-900">
                Artesanía Premium
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Nuestros maestros joyeros tienen décadas de experiencia creando piezas de museo.
              </p>
            </div>

            <div className="space-y-6 p-8 bg-white/60 backdrop-blur-sm rounded-lg border border-gold-100/50">
              <div className="text-5xl font-light text-gold-300">◆</div>
              <h3 className="text-2xl font-serif font-light text-slate-900">
                Sostenibilidad
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Comprometidos con prácticas responsables y éticas en la obtención de nuestros materiales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-gold-50 to-cream-50 border-b border-gold-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 tracking-widest mb-6">
              Nuestro Proceso
            </h2>
            <div className="w-12 h-px bg-gold-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {processSteps.map((item) => (
              <div key={item.step} className="space-y-4 p-8 bg-white/70 backdrop-blur-sm rounded-lg border border-gold-100/50">
                <div className="flex items-baseline gap-6">
                  <span className="text-5xl font-serif font-light text-gold-300 tracking-widest">
                    {String(item.step).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-serif font-light text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-600 font-light leading-relaxed ml-20">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-cream-50 border-t border-gold-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 tracking-widest mb-6">
            ¿Tienes Dudas?
          </h2>
          <div className="w-12 h-px bg-gold-300 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 font-light mb-10">
            Contáctanos directamente. Nuestro equipo está aquí para ayudarte.
          </p>
          {brandInfo?.email ? (
            <a
              href={`mailto:${brandInfo.email}`}
              className="inline-block px-10 py-4 bg-slate-900 text-white font-light rounded-none hover:bg-slate-800 transition-all duration-300 tracking-widest text-sm uppercase"
            >
              Envíanos un Correo
            </a>
          ) : (
            <a
              href="mailto:info@garnata.com"
              className="inline-block px-10 py-4 bg-slate-900 text-white font-light rounded-none hover:bg-slate-800 transition-all duration-300 tracking-widest text-sm uppercase"
            >
              Envíanos un Correo
            </a>
          )}
        </div>
      </section>
    </div>
  )
}

export default About
