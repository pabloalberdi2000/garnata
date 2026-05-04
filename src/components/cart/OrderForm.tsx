import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { sendOrderEmail } from '../../services/emailService'

interface OrderFormData {
  nombre: string
  apellidos: string
  email: string
  telefono: string
}

interface OrderFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSuccess, onCancel }) => {
  const { items, total, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<OrderFormData>({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
  })
  const [errors, setErrors] = useState<Partial<OrderFormData>>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+34|0034|34)?[689]\d{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido'
    }
    if (!validatePhone(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe ser un número español válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof OrderFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const prepareOrderData = () => {
    const orderItems = items
      .map(
        (item) =>
          `${item.name} (${item.collection}): ${item.quantity}x €${item.price.toFixed(2)} = €${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n')

    return {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      orden_items: orderItems,
      subtotal: total.toFixed(2),
      iva: '(incluido en el precio)',
      total: total.toFixed(2),
      cantidad_articulos: items.length,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔵 Formulario enviado')

    if (!validateForm()) {
      console.log('❌ Validación fallida')
      return
    }

    setIsLoading(true)
    console.log('⏳ Iniciando carga...')

    try {
      const orderData = prepareOrderData()
      console.log('📦 Datos del pedido preparados:', orderData)

      console.log('🚀 Enviando emails...')
      await sendOrderEmail({
        to_email: 'glorialara72@gmail.com',
        name: `${orderData.nombre} ${orderData.apellidos}`,
        email: orderData.email,
        phone: orderData.telefono,
        order_details: orderData.orden_items,
        cost_total: orderData.total,
      })

      console.log('✓ Emails enviados exitosamente')
      clearCart()
      console.log('✓ Carrito limpiado')
      console.log('🎉 Llamando onSuccess()...')
      onSuccess()
      console.log('✓ onSuccess() ejecutado')
    } catch (error) {
      console.error('❌ Error al enviar el pedido:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      alert(`❌ Error al procesar tu pedido: ${errorMessage}\n\nPor favor, intenta de nuevo o contacta con nosotros.`)
    } finally {
      setIsLoading(false)
      console.log('✓ Carga finalizada')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Completar Pedido
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition ${
                  errors.nombre
                    ? 'border-red-500 bg-red-50'
                    : 'border-cream-300'
                }`}
                placeholder="Tu nombre"
                disabled={isLoading}
              />
              {errors.nombre && (
                <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition ${
                  errors.apellidos
                    ? 'border-red-500 bg-red-50'
                    : 'border-cream-300'
                }`}
                placeholder="Tus apellidos"
                disabled={isLoading}
              />
              {errors.apellidos && (
                <p className="text-red-600 text-xs mt-1">{errors.apellidos}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-cream-300'
                }`}
                placeholder="tu@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Teléfono Móvil *
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition ${
                  errors.telefono
                    ? 'border-red-500 bg-red-50'
                    : 'border-cream-300'
                }`}
                placeholder="+34 6XX XXX XXX"
                disabled={isLoading}
              />
              {errors.telefono && (
                <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>
              )}
            </div>

            {/* Resumen del Pedido */}
            <div className="bg-cream-50 p-4 rounded-lg my-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                Resumen del Pedido
              </h3>
              <div className="space-y-1 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Artículos:</span>
                  <span className="font-medium text-slate-900">{items.length}</span>
                </div>
                <div className="border-t border-cream-300 pt-2 mt-2 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-gold-600">
                    €{total.toFixed(2)}
                  </span>
                </div>
                <div className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700 text-center font-medium mt-2">
                  ℹ️ IVA incluido en el precio
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3 pt-4 border-t border-cream-200">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gold-500 text-slate-950 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Enviando...' : 'Proceder al Pedido'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="w-full py-2 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            Tus datos serán utilizados solo para procesar tu pedido
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderForm
