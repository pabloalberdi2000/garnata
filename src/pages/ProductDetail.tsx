import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductBySlug } from '../hooks/useContentful'
import { useCart } from '../hooks/useCart'
import ImageLightbox from '../components/product/ImageLightbox'

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: product, loading, error } = useProductBySlug(slug || '')
  const { items: cartItems, addItem, updateQuantity, removeItem } = useCart()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const cartItem = cartItems.find(item => item.id === product?.id)

  const handleAddToCart = () => {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.pictures?.[0],
    })
  }

  const handleIncrement = () => {
    if (cartItem && product) {
      updateQuantity(product.id, cartItem.quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (cartItem && product) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1)
      } else {
        removeItem(product.id)
      }
    }
  }

  if (!slug) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-light mb-4">Producto no encontrado</p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-8 py-3 bg-slate-900 text-white font-light text-sm tracking-widest uppercase hover:bg-slate-800 transition-all"
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 font-light">◆</div>
          <p className="text-slate-600 font-light">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-light mb-4">Error al cargar el producto</p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-8 py-3 bg-slate-900 text-white font-light text-sm tracking-widest uppercase hover:bg-slate-800 transition-all"
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-cream-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <button
            onClick={() => navigate('/catalog')}
            className="text-sm font-light tracking-widest uppercase text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Volver al Catálogo
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Images Section */}
          <div className="space-y-6">
            {product.pictures && product.pictures.length > 0 ? (
              <ImageLightbox images={product.pictures} productName={product.name} />
            ) : (
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square flex items-center justify-center text-8xl opacity-20 font-light">
                ◆
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="space-y-4">
              <div className="w-8 h-px bg-slate-900"></div>
              <p className="text-xs font-light tracking-[0.2em] uppercase text-slate-600">
                Joya Exclusiva
              </p>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-6xl md:text-7xl font-serif font-light leading-tight text-slate-900 mb-6">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-light text-slate-900">
                  €{product.price.toFixed(2)}
                </span>
                <span className="text-xs font-light tracking-widest text-slate-500 uppercase">
                  (IVA incluido)
                </span>
              </div>

              {/* Status */}
              {product.status && product.status.length > 0 && (
                <div className="mb-8">
                  <span className={`px-4 py-2 text-xs font-light tracking-widest uppercase ${
                    product.status[0] === 'Disponible'
                      ? 'bg-slate-900 text-white'
                      : product.status[0] === 'Ultimas unidades'
                      ? 'bg-gold-100 text-gold-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {product.status[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-cream-200"></div>

            {/* Description */}
            {product.description && (
              <div className="space-y-4">
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-cream-200"></div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-light tracking-widest uppercase text-slate-500 mb-2">
                  Información del Producto
                </p>
                <p className="text-sm font-light text-slate-600 leading-relaxed">
                  Joya artesanal de alta calidad, creada con técnicas tradicionales de orfebrería.
                  Todos nuestros productos incluyen certificado de autenticidad y garantía de 5 años.
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-cream-200"></div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-4">
              {!cartItem ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full px-8 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg"
                >
                  Añadir al Carrito
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-gold-50 rounded-lg p-3">
                  <button
                    onClick={handleDecrement}
                    className="flex-1 px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold text-lg"
                    title="Disminuir cantidad"
                  >
                    −
                  </button>
                  <span className="flex-1 py-3 font-semibold text-slate-900 text-center text-lg">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="flex-1 px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold text-lg"
                    title="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              )}
              <button
                onClick={() => navigate('/catalog')}
                className="w-full px-8 py-4 border border-slate-900 text-slate-900 text-xs font-light tracking-widest uppercase hover:bg-cream-50 transition-colors duration-300"
              >
                Seguir Comprando
              </button>
            </div>

            {/* Contact */}
            <div className="space-y-4 pt-8 border-t border-cream-200">
              <p className="text-xs font-light tracking-widest uppercase text-slate-500">
                ¿Necesitas Ayuda?
              </p>
              <p className="text-sm font-light text-slate-600">
                Contáctanos para más información sobre este producto o para hacer un pedido personalizado.
              </p>
              <a
                href="mailto:info@garnata.com"
                className="inline-block text-sm font-light text-slate-900 hover:text-slate-600 transition-colors border-b border-slate-900 hover:border-slate-600"
              >
                Envíanos un correo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products or CTA */}
      <section className="py-24 md:py-32 bg-white border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-6 tracking-widest">
            Descubre Más Joyas
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Explora nuestra colección completa de joyas exclusivas
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-10 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg"
          >
            Ver Todas las Colecciones
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
