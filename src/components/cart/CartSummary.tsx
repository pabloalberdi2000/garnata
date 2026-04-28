import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import OrderForm from './OrderForm'
import OrderSuccess from './OrderSuccess'

type ModalState = 'none' | 'form' | 'success'

export const CartSummary: React.FC = () => {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [modalState, setModalState] = useState<ModalState>('none')

  const handleOrderSuccess = () => {
    setModalState('success')
  }

  const handleCloseSuccess = () => {
    setModalState('none')
    navigate('/')
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center space-y-4">
        <div className="text-5xl">🛍️</div>
        <h3 className="text-xl font-semibold text-slate-900">
          Tu carrito está vacío
        </h3>
        <p className="text-slate-600">
          Descubre nuestras joyas exclusivas y añade algo especial
        </p>
        <Link
          to="/catalog"
          className="inline-block px-6 py-3 bg-gold-500 text-slate-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
        >
          Explorar Catálogo
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Resumen de la Orden
          </h2>
          <div className="space-y-3 pb-4 border-b border-cream-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900 font-medium">€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Envío</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            <div className="bg-blue-50 px-3 py-2 rounded text-xs text-blue-700 text-center font-medium">
              ℹ️ IVA incluido en el precio (21%)
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-semibold text-slate-900">Total</span>
            <span className="text-3xl font-bold text-gold-600">
              €{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setModalState('form')}
            className="w-full py-3 bg-gold-500 text-slate-950 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 transform hover:scale-105"
          >
            Finalizar Pedido
          </button>
          <Link
            to="/catalog"
            className="block w-full py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-center"
          >
            Seguir Comprando
          </Link>
          <button
            onClick={() => clearCart()}
            className="w-full py-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            Vaciar Carrito
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-cream-200 space-y-2 text-center text-xs text-slate-500">
          <p>✓ Pedido seguro por correo electrónico</p>
          <p>✓ Entrega certificada en 2-3 días</p>
          <p>✓ Garantía de satisfacción 100%</p>
        </div>
      </div>

      {/* Modals */}
      {modalState === 'form' && (
        <OrderForm
          onSuccess={handleOrderSuccess}
          onCancel={() => setModalState('none')}
        />
      )}
      {modalState === 'success' && (
        <OrderSuccess onClose={handleCloseSuccess} />
      )}
    </>
  )
}

export default CartSummary
