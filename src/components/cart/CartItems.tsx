import React from 'react'
import { useCart } from '../../hooks/useCart'

export const CartItems: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-cream-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Artículos en el Carrito ({items.length})
        </h2>
      </div>

      <div className="divide-y divide-cream-200">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-6 hover:bg-cream-50 transition-colors"
          >
            <div className="flex gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-cream-50 to-cream-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">✨</span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {item.collection}
                </p>
                <p className="text-gold-600 font-bold mt-2">
                  €{item.price.toFixed(2)} c/u
                </p>
              </div>

              {/* Quantity and Actions */}
              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center gap-2 bg-cream-100 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-white rounded transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 font-semibold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-white rounded transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right space-y-2">
                  <p className="text-lg font-bold text-slate-900">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartItems
