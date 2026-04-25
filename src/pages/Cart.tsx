import React from 'react'
import CartItems from '../components/cart/CartItems'
import CartSummary from '../components/cart/CartSummary'

export const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-12">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
