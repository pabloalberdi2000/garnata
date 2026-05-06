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

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 font-light">◆</div>
          <p className="text-slate-600 font-light">Cargando información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 to-slate-900 text-cream-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gold-400 mb-6">
            {brandInfo?.name || 'Sobre GARNATA'}
          </h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            {brandInfo?.slogan || 'Tradición, artesanía y elegancia en cada joya que creamos'}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-slate-900">
                Nuestra Historia
              </h2>
              {brandInfo?.description ? (
                <div className="text-lg text-slate-600 leading-relaxed prose-editorial">
                  {brandInfo.description}
                </div>
              ) : (
                <>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    GARNATA nació hace más de 20 años con la visión de crear joyas
                    que transciendan el tiempo. Cada pieza es diseñada con pasión y
                    creada con las técnicas tradicionales de orfebrería.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Ubicados en el corazón de Granada, España, nos enorgullece crear
                    joyas que reflejan la belleza y la rica cultural de nuestra región.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Utilizamos únicamente materiales de la más alta calidad: oro,
                    plata, y piedras preciosas certificadas, garantizando que cada
                    joya durará toda una vida.
                  </p>
                </>
              )}
            </div>
            <div className="bg-gradient-to-br from-gold-100 to-cream-100 rounded-lg h-96 flex items-center justify-center text-6xl overflow-hidden">
              {brandInfo?.pictures?.[0] ? (
                <img
                  src={brandInfo.pictures[0]}
                  alt={brandInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>✨</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-slate-900 text-center mb-12">
            Nuestros Valores
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Diseño Exclusivo
              </h3>
              <p className="text-slate-600">
                Cada diseño es único y pensado especialmente para reflejar tu
                personalidad. No repetimos colecciones.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✋</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Artesanía Premium
              </h3>
              <p className="text-slate-600">
                Nuestros maestros joyeros tienen décadas de experiencia creando
                piezas de museo.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Sostenibilidad
              </h3>
              <p className="text-slate-600">
                Comprometidos con prácticas responsables y éticas en la obtención
                de nuestros materiales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-slate-900 text-center mb-12">
            Nuestro Proceso
          </h2>

          <div className="space-y-8">
            {processSteps.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-slate-950 font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-slate-950 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gold-400 mb-6">
            ¿Tienes Dudas?
          </h2>
          <p className="text-lg text-cream-200 mb-8">
            Contáctanos directamente. Nuestro equipo está aquí para ayudarte.
          </p>
          {brandInfo?.email ? (
            <a
              href={`mailto:${brandInfo.email}`}
              className="inline-block px-8 py-4 bg-gold-500 text-slate-950 font-bold rounded-lg hover:bg-gold-400 transition-all transform hover:scale-105"
            >
              Envíanos un Correo
            </a>
          ) : (
            <a
              href="mailto:info@garnata.com"
              className="inline-block px-8 py-4 bg-gold-500 text-slate-950 font-bold rounded-lg hover:bg-gold-400 transition-all transform hover:scale-105"
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
