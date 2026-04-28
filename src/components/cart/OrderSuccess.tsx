import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface OrderSuccessProps {
  onClose: () => void
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full text-center p-8 space-y-6 animate-fade-in">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-slate-900">
          ¡Pedido Realizado!
        </h2>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-lg text-slate-700 font-semibold">
            Gracias por elegir GARNATA
          </p>
          <p className="text-slate-600">
            Hemos recibido tu solicitud de pedido y nos pondremos en contacto
            contigo en breve para finalizar los detalles y realizar el pago.
          </p>
        </div>

        {/* Details */}
        <div className="bg-cream-50 p-4 rounded-lg space-y-2 text-sm">
          <p className="text-slate-600">
            <span className="font-semibold">📧 </span>
            Revisa tu correo electrónico para más información
          </p>
          <p className="text-slate-600">
            <span className="font-semibold">⏱️ </span>
            Nos pondremos en contacto en 24-48 horas
          </p>
          <p className="text-slate-600">
            <span className="font-semibold">✓ </span>
            Tu pedido está confirmado
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4 border-t border-cream-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gold-500 text-slate-950 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 transform hover:scale-105"
          >
            Volver al Inicio
          </button>
          <Link
            to="/catalog"
            className="block w-full py-2 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-center"
          >
            Seguir Comprando
          </Link>
        </div>

        {/* Trust Message */}
        <p className="text-xs text-slate-500">
          Se cerrará automáticamente en 5 segundos...
        </p>
      </div>
    </div>
  )
}

export default OrderSuccess
