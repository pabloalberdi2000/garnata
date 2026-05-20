import React, { useState } from 'react'
import { useBrandInfo } from '../hooks/useDrops'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export const Contact: React.FC = () => {
  const { data: brandInfo, loading } = useBrandInfo()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formBody = new FormData()
      formBody.append('from_name', formData.name)
      formBody.append('from_email', formData.email)
      formBody.append('customer_phone', formData.phone)
      formBody.append('subject', formData.subject)
      formBody.append('message', formData.message)
      formBody.append('to_email', brandInfo?.email || 'palberdi2000@gmail.com')

      const response = await fetch('https://formspree.io/f/mgvwoqrk', {
        method: 'POST',
        body: formBody,
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      {/* Minimal Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-cream-50 to-white border-b border-gold-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-serif font-light text-slate-900 tracking-widest">
                CONTACTO
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-light tracking-wide">
                Nos encanta escucharte
              </p>
            </div>

            <div className="w-12 h-px bg-gold-300 mt-8"></div>

            <p className="max-w-2xl text-lg text-slate-600 font-light leading-relaxed">
              Cualquier pregunta sobre nuestras joyas o servicios. Responderemos en las próximas 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 md:py-32 bg-white border-b border-gold-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20">
            {/* Contact Info Cards */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-light text-slate-900 tracking-widest mb-8">
                  Información de Contacto
                </h2>
                <div className="w-12 h-px bg-gold-300"></div>
              </div>

              {/* Info Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <div className="p-8 bg-white border border-gold-100 hover:border-gold-300 transition-colors group">
                  <h4 className="text-xs font-light text-slate-600 tracking-widest uppercase mb-3">Email</h4>
                  <a
                    href={`mailto:${brandInfo?.email || 'info@garnata.com'}`}
                    className="text-xl font-light text-slate-900 hover:text-gold-400 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    {brandInfo?.email || 'info@garnata.com'}
                  </a>
                </div>

                {/* Phone Card */}
                {brandInfo?.number && (
                  <div className="p-8 bg-white border border-gold-100 hover:border-gold-300 transition-colors group">
                    <h4 className="text-xs font-light text-slate-600 tracking-widest uppercase mb-3">Teléfono</h4>
                    <a
                      href={`tel:${brandInfo.number}`}
                      className="text-xl font-light text-slate-900 hover:text-gold-400 transition-colors group-hover:translate-x-1 duration-300"
                    >
                      {brandInfo.number}
                    </a>
                  </div>
                )}

                {/* Location Card */}
                <div className="p-8 bg-white border border-gold-100 hover:border-gold-300 transition-colors">
                  <h4 className="text-xs font-light text-slate-600 tracking-widest uppercase mb-3">Ubicación</h4>
                  <p className="text-slate-700 font-light">Granada, España</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="space-y-8 h-full flex flex-col justify-center">
                  <div className="text-center space-y-6 p-12 bg-gradient-to-br from-gold-50 to-cream-50 border border-gold-200">
                    <div className="text-6xl font-light text-gold-400">✓</div>
                    <h3 className="text-3xl font-serif font-light text-slate-900">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed">
                      Gracias por escribirnos. Te responderemos en las próximas 24 horas.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-light text-slate-600 tracking-widest uppercase mb-3">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-b border-slate-300 font-light bg-transparent focus:outline-none focus:border-gold-400 transition-colors placeholder-slate-400"
                      placeholder="Tu nombre"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-light text-slate-600 tracking-widest uppercase mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-b border-slate-300 font-light bg-transparent focus:outline-none focus:border-gold-400 transition-colors placeholder-slate-400"
                      placeholder="tu@ejemplo.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-light text-slate-600 tracking-widest uppercase mb-3">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-b border-slate-300 font-light bg-transparent focus:outline-none focus:border-gold-400 transition-colors placeholder-slate-400"
                      placeholder="+34 666 666 666"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-light text-slate-600 tracking-widest uppercase mb-3">
                      Asunto *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-b border-slate-300 font-light bg-transparent focus:outline-none focus:border-gold-400 transition-colors text-slate-900"
                    >
                      <option value="">Selecciona un tema</option>
                      <option value="consulta-producto">Consulta sobre producto</option>
                      <option value="pedido">Consulta sobre pedido</option>
                      <option value="devolucion">Devolución o cambio</option>
                      <option value="colaboracion">Colaboración</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-light text-slate-600 tracking-widest uppercase mb-3">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-0 py-3 border-b border-slate-300 font-light bg-transparent focus:outline-none focus:border-gold-400 transition-colors resize-none placeholder-slate-400"
                      placeholder="Cuéntanos..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-10 py-4 bg-slate-900 text-white font-light rounded-none hover:bg-slate-800 transition-all duration-300 tracking-widest text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-gold-50 to-cream-50 border-b border-gold-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 tracking-widest mb-6">
              También Podemos Ayudarte Aquí
            </h2>
            <div className="w-12 h-px bg-gold-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 space-y-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gold-100/50">
              <div className="text-4xl font-light text-gold-400">📦</div>
              <h3 className="text-lg font-serif font-light text-slate-900">Seguimiento de Pedido</h3>
              <p className="text-sm text-slate-600 font-light">
                Monitorea el estado de tu compra en tiempo real
              </p>
            </div>

            <div className="text-center p-8 space-y-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gold-100/50">
              <div className="text-4xl font-light text-gold-400">↩️</div>
              <h3 className="text-lg font-serif font-light text-slate-900">Devoluciones</h3>
              <p className="text-sm text-slate-600 font-light">
                Proceso simple y sin complicaciones. 30 días garantía
              </p>
            </div>

            <div className="text-center p-8 space-y-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gold-100/50">
              <div className="text-4xl font-light text-gold-400">✨</div>
              <h3 className="text-lg font-serif font-light text-slate-900">Personalización</h3>
              <p className="text-sm text-slate-600 font-light">
                Solicita diseños a medida y personalizaciones
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
