import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    collection: string
    image?: string
  }
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white border border-slate-200 overflow-hidden hover:border-slate-400 transition-all duration-300">
        {/* Image Container */}
        <div className="relative bg-slate-100 h-72 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
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
              {product.collection}
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
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
