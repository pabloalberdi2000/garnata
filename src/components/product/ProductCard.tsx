import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description?: string
    price: number
    slug?: string
    pictures?: string[]
    status?: ('Disponible' | 'Ultimas unidades' | 'Agotado')[]
  }
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addItem, updateQuantity, removeItem } = useCart()

  const cartItem = items.find(item => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addItem(product)
  }

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1)
    }
  }

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1)
      } else {
        removeItem(product.id)
      }
    }
  }

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white border border-slate-200 overflow-hidden hover:border-slate-400 transition-all duration-300">
        {/* Image Container */}
        <div className="relative bg-slate-100 h-72 overflow-hidden">
          {product.pictures?.[0] ? (
            <img
              src={product.pictures[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-slate-50">
              ✨
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-light tracking-widest uppercase">
              Joya Exclusiva
            </p>
            <h3 className="text-xl font-serif font-light text-slate-900 group-hover:text-slate-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-slate-600 font-light line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price and Action */}
          <div className="flex justify-between items-end pt-4 border-t border-slate-200">
            <div className="space-y-1">
              <p className="text-2xl font-light text-slate-900">
                €{product.price.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 font-light">IVA incluido</p>
            </div>

            {/* Add to Cart or Quantity Controls */}
            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                className="bg-white border border-slate-900 text-slate-900 p-3 hover:bg-slate-900 hover:text-white transition-all duration-200"
                title="Añadir al carrito"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-gold-50 rounded-lg p-1">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-2 text-slate-900 hover:bg-white rounded transition-colors font-semibold"
                  title="Disminuir cantidad"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-slate-900 min-w-[2.5rem] text-center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-2 text-slate-900 hover:bg-white rounded transition-colors font-semibold"
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
