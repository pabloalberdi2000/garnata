import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../services/contentfulService'
import { useCart } from '../../hooks/useCart'
import { StatusBadge } from './StatusBadge'

interface CatalogLayoutProps {
  products: Product[]
  title?: string
  description?: string
  dropDate?: string
}

type LayoutType = 'hero' | 'asymmetric' | 'magazine'

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  products,
  title = 'Drops',
  description = 'Colecciones exclusivas de temporada',
  dropDate,
}) => {
  const navigate = useNavigate()
  const { addItem, items: cartItems, updateQuantity, removeItem } = useCart()
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const layoutType = useMemo<LayoutType>(() => {
    if (products.length === 1) return 'hero'
    if (products.length === 2) return 'asymmetric'
    return 'magazine'
  }, [products.length])

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`)
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.pictures?.[0],
    })
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Editorial Header - Hero Style */}
      <section className="relative bg-gradient-to-br from-white via-cream-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gold-50 rounded-full blur-3xl -mb-48"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
          <div className="space-y-6 max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-slate-900"></div>
              <p className="text-xs font-light tracking-[0.2em] uppercase text-slate-600">
                Colección Exclusiva
              </p>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-none text-slate-900 tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl font-light text-slate-600 leading-relaxed max-w-2xl pt-4">
              {description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-8 pt-6 border-t border-cream-200">
              <div>
                <p className="text-xs font-light tracking-wider uppercase text-slate-500 mb-1">
                  Piezas Disponibles
                </p>
                <p className="text-2xl font-light text-slate-900">{products.length}</p>
              </div>
              {products.length > 0 && (
                <div>
                  <p className="text-xs font-light tracking-wider uppercase text-slate-500 mb-1">
                    Precio desde
                  </p>
                  <p className="text-2xl font-light text-slate-900">
                    €{Math.min(...products.map(p => p.price)).toFixed(0)}
                  </p>
                </div>
              )}
              {dropDate && (
                <div>
                  <p className="text-xs font-light tracking-wider uppercase text-slate-500 mb-1">
                    Fecha del Drop
                  </p>
                  <p className="text-2xl font-light text-slate-900">
                    {formatDate(dropDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Layout */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {layoutType === 'hero' && (
          <HeroLayout
            product={products[0]}
            hoveredId={hoveredProductId}
            setHoveredId={setHoveredProductId}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        )}
        {layoutType === 'asymmetric' && (
          <AsymmetricLayout
            products={products}
            hoveredId={hoveredProductId}
            setHoveredId={setHoveredProductId}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        )}
        {layoutType === 'magazine' && (
          <MagazineLayout
            products={products}
            hoveredId={hoveredProductId}
            setHoveredId={setHoveredProductId}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        )}

        {/* Call to Action Section */}
        <div className="mt-32 pt-24 border-t border-cream-200">
          <div className="max-w-2xl">
            <p className="text-xs font-light tracking-[0.2em] uppercase text-slate-600 mb-4">
              ¿Te interesa esta colección?
            </p>
            <h3 className="text-4xl font-serif font-light text-slate-900 mb-6">
              Contacta con nuestros especialistas
            </h3>
            <p className="text-base font-light text-slate-600 mb-8 leading-relaxed">
              Nuestro equipo de expertos está disponible para ayudarte a encontrar la pieza perfecta para ti.
            </p>
            <button className="px-10 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg">
              Solicitar Consulta
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ============ LAYOUT COMPONENTS ============

const HeroLayout: React.FC<{
  product: Product
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  onProductClick: (id: string) => void
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void
  cartItems: any[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}> = ({
  product,
  hoveredId,
  setHoveredId,
  onProductClick,
  onAddToCart,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-center">
      {/* Image - Hero Left */}
      <div className="lg:col-span-2">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square cursor-pointer"
          onMouseEnter={() => setHoveredId(product.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onProductClick(product.id)}
        >
          {product.pictures?.[0] ? (
            <img
              src={product.pictures?.[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-9xl opacity-20 font-light">
              ◆
            </div>
          )}

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

          <StatusBadge status="available" className="absolute top-8 right-8 z-10" />
        </div>
      </div>

      {/* Content - Right Side */}
      <div className="lg:col-span-1 flex flex-col justify-center space-y-10">
        {/* Collection Tag */}
        <div className="space-y-2">
          <div className="w-8 h-px bg-slate-900"></div>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-slate-600">
            Joya Exclusiva
          </p>
        </div>

        {/* Product Name */}
        <div className="cursor-pointer" onClick={() => onProductClick(product.id)}>
          <h2 className="text-5xl lg:text-6xl font-serif font-light leading-tight text-slate-900 mb-6 hover:text-slate-700 transition-colors">
            {product.name}
          </h2>
          <p className="text-base font-light text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-cream-200"></div>

        {/* Price & Details */}
        <div className="space-y-4 cursor-pointer" onClick={() => onProductClick(product.id)}>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-light text-slate-900">
              €{product.price.toFixed(0)}
            </span>
            <span className="text-xs font-light tracking-widest text-slate-500 uppercase">
              (IVA incluido)
            </span>
          </div>

          <p className="text-xs font-light tracking-[0.15em] text-slate-500 uppercase leading-relaxed">
            Oro 18K • Diamante Certificado<br/>
            Envío Gratuito • Garantía 5 Años
          </p>
        </div>

        {/* CTA Button or Quantity Controls */}
        <div className="pt-4">
          {(() => {
            const cartItem = cartItems.find(item => item.id === product.id)
            return !cartItem ? (
              <button
                onClick={(e) => onAddToCart(e, product)}
                className="w-full px-8 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg"
              >
                Añadir al Carrito
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-gold-50 rounded-lg p-2">
                <button
                  onClick={() => {
                    if (cartItem.quantity > 1) {
                      onUpdateQuantity(product.id, cartItem.quantity - 1)
                    } else {
                      onRemoveItem(product.id)
                    }
                  }}
                  className="px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold flex-1 text-lg"
                  title="Disminuir cantidad"
                >
                  −
                </button>
                <span className="px-4 py-3 font-semibold text-slate-900 text-center flex-1 text-lg">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product.id, cartItem.quantity + 1)}
                  className="px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold flex-1 text-lg"
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

const AsymmetricLayout: React.FC<{
  products: Product[]
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  onProductClick: (id: string) => void
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void
  cartItems: any[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}> = ({
  products,
  hoveredId,
  setHoveredId,
  onProductClick,
  onAddToCart,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
      {/* First Product - Large (Left, 2 cols) */}
      <div className="lg:col-span-2">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square lg:aspect-auto lg:h-96 cursor-pointer"
          onMouseEnter={() => setHoveredId(products[0].id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onProductClick(products[0].id)}
        >
          {products[0].pictures?.[0] ? (
            <img
              src={products[0].pictures?.[0]}
              alt={products[0].name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-8xl opacity-20 font-light">
              ◆
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <StatusBadge status="available" className="absolute top-6 right-6 z-10" />
        </div>

        <div className="mt-12 space-y-4">
          <div className="cursor-pointer" onClick={() => onProductClick(products[0].id)}>
            <div className="w-6 h-px bg-slate-900"></div>
            <h3 className="text-4xl font-serif font-light text-slate-900 hover:text-slate-700 transition-colors">
              {products[0].name}
            </h3>
            <p className="text-sm font-light text-slate-600 leading-relaxed max-w-xl">
              {products[0].description}
            </p>
            <div className="flex items-baseline gap-4 pt-4 border-t border-cream-200">
              <span className="text-3xl font-light text-slate-900">
                €{products[0].price.toFixed(0)}
              </span>
              <p className="text-xs font-light tracking-widest text-slate-500 uppercase">
                Joya Exclusiva
              </p>
            </div>
          </div>

          {/* Add to Cart Button or Quantity Controls */}
          <div className="pt-4">
            {(() => {
              const cartItem = cartItems.find(item => item.id === products[0].id)
              return !cartItem ? (
                <button
                  onClick={(e) => onAddToCart(e, products[0])}
                  className="w-full px-8 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg"
                >
                  Añadir al Carrito
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-gold-50 rounded-lg p-2">
                  <button
                    onClick={() => {
                      if (cartItem.quantity > 1) {
                        onUpdateQuantity(products[0].id, cartItem.quantity - 1)
                      } else {
                        onRemoveItem(products[0].id)
                      }
                    }}
                    className="px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold flex-1 text-lg"
                    title="Disminuir cantidad"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 font-semibold text-slate-900 text-center flex-1 text-lg">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(products[0].id, cartItem.quantity + 1)}
                    className="px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold flex-1 text-lg"
                    title="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              )
            })()}
          </div>
        </div>
      </div>

      {/* Second Product - Smaller (Right, 1 col) */}
      <div className="lg:col-span-1 flex flex-col">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square mb-8 cursor-pointer"
          onMouseEnter={() => setHoveredId(products[1].id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onProductClick(products[1].id)}
        >
          {products[1].pictures?.[0] ? (
            <img
              src={products[1].pictures?.[0]}
              alt={products[1].name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl opacity-20 font-light">
              ◆
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <StatusBadge status="available" className="absolute top-4 right-4 z-10" />
        </div>

        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="cursor-pointer" onClick={() => onProductClick(products[1].id)}>
            <div className="w-4 h-px bg-slate-900"></div>
            <h3 className="text-2xl font-serif font-light text-slate-900 hover:text-slate-700 transition-colors">
              {products[1].name}
            </h3>
            <p className="text-xs font-light text-slate-600 leading-relaxed">
              {products[1].description}
            </p>
            <div className="border-t border-cream-200 pt-4">
              <p className="text-2xl font-light text-slate-900 mb-1">
                €{products[1].price.toFixed(0)}
              </p>
              <p className="text-xs font-light tracking-wider text-slate-500 uppercase">
                Joya Exclusiva
              </p>
            </div>
          </div>

          {/* Add to Cart Button or Quantity Controls */}
          <div className="pt-4">
            {(() => {
              const cartItem = cartItems.find(item => item.id === products[1].id)
              return !cartItem ? (
                <button
                  onClick={(e) => onAddToCart(e, products[1])}
                  className="w-full px-8 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg"
                >
                  Añadir al Carrito
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-gold-50 rounded-lg p-2">
                  <button
                    onClick={() => {
                      if (cartItem.quantity > 1) {
                        onUpdateQuantity(products[1].id, cartItem.quantity - 1)
                      } else {
                        onRemoveItem(products[1].id)
                      }
                    }}
                    className="px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold flex-1 text-lg"
                    title="Disminuir cantidad"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 font-semibold text-slate-900 text-center flex-1 text-lg">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(products[1].id, cartItem.quantity + 1)}
                    className="px-4 py-3 text-slate-900 hover:bg-white rounded transition-colors font-semibold flex-1 text-lg"
                    title="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

const MagazineLayout: React.FC<{
  products: Product[]
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  onProductClick: (id: string) => void
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void
  cartItems: any[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}> = ({
  products,
  hoveredId,
  setHoveredId,
  onProductClick,
  onAddToCart,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  const getCartItem = (productId: string) => cartItems.find(item => item.id === productId)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
      {/* Main Featured Product - Left (2 cols) */}
      <div className="lg:col-span-2">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square lg:aspect-auto lg:h-96 cursor-pointer"
          onMouseEnter={() => setHoveredId(products[0].id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onProductClick(products[0].id)}
        >
          {products[0].pictures?.[0] ? (
            <img
              src={products[0].pictures?.[0]}
              alt={products[0].name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-9xl opacity-20 font-light">
              ◆
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <StatusBadge status="available" className="absolute top-8 right-8 z-10" />
        </div>

        <div className="mt-16 space-y-6 max-w-2xl cursor-pointer" onClick={() => onProductClick(products[0].id)}>
          <div className="space-y-3">
            <div className="w-8 h-px bg-slate-900"></div>
            <p className="text-xs font-light tracking-[0.2em] uppercase text-slate-600">
              Joya Exclusiva
            </p>
          </div>

          <h2 className="text-5xl lg:text-6xl font-serif font-light leading-tight text-slate-900 hover:text-slate-700 transition-colors">
            {products[0].name}
          </h2>

          <p className="text-base font-light text-slate-600 leading-relaxed">
            {products[0].description}
          </p>

          <div className="flex items-baseline gap-4 pt-6 border-t border-cream-200">
            <span className="text-4xl font-light text-slate-900">
              €{products[0].price.toFixed(0)}
            </span>
            <span className="text-xs font-light tracking-widest text-slate-500 uppercase">
              (IVA incluido)
            </span>
          </div>
        </div>
      </div>

      {/* Side Products - Right (1 col, stacked) */}
      <div className="lg:col-span-1 flex flex-col gap-16">
        {products.slice(1, 3).map((product) => (
          <div key={product.id} className="flex flex-col">
            <div
              className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square mb-8 cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onProductClick(product.id)}
            >
              {product.pictures?.[0] ? (
                <img
                  src={product.pictures?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-6xl opacity-20 font-light">
                  ◆
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
              <StatusBadge status="available" className="absolute top-4 right-4 z-10" />
            </div>

            <div className="space-y-3 relative">
              <div className="w-4 h-px bg-slate-900"></div>
              <h3 className="text-2xl font-serif font-light text-slate-900 cursor-pointer hover:text-slate-700 transition-colors" onClick={() => onProductClick(product.id)}>
                {product.name}
              </h3>
              <p className="text-xs font-light text-slate-600 leading-relaxed cursor-pointer" onClick={() => onProductClick(product.id)}>
                {product.description}
              </p>
              <div className="border-t border-cream-200 pt-3">
                <p className="text-2xl font-light text-slate-900 cursor-pointer" onClick={() => onProductClick(product.id)}>
                  €{product.price.toFixed(0)}
                </p>
                <p className="text-xs font-light tracking-wider text-slate-500 uppercase mt-1">
                  Joya Exclusiva
                </p>
              </div>

              {/* Add to Cart Button or Quantity Controls */}
              <div className="relative mt-4">
                {(() => {
                  const cartItem = getCartItem(product.id)
                  return !cartItem ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === product.id ? null : product.id)}
                      className="w-full px-6 py-3 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-300 flex items-center justify-between"
                    >
                      <span>Opciones</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${openDropdown === product.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-gold-50 rounded-lg p-2">
                      <button
                        onClick={() => {
                          if (cartItem.quantity > 1) {
                            onUpdateQuantity(product.id, cartItem.quantity - 1)
                          } else {
                            onRemoveItem(product.id)
                          }
                        }}
                        className="px-3 py-2 text-slate-900 hover:bg-white rounded transition-colors font-semibold"
                        title="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-semibold text-slate-900 min-w-[2.5rem] text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, cartItem.quantity + 1)}
                        className="px-3 py-2 text-slate-900 hover:bg-white rounded transition-colors font-semibold"
                        title="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  )
                })()}

                {openDropdown === product.id && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-lg z-50">
                    <button
                      onClick={(e) => {
                        onAddToCart(e, product)
                        setOpenDropdown(null)
                      }}
                      className="w-full px-6 py-3 text-slate-900 text-xs font-light tracking-widest uppercase hover:bg-cream-50 transition-colors text-left"
                    >
                      Añadir al Carrito
                    </button>
                    <button
                      onClick={() => {
                        onProductClick(product.id)
                        setOpenDropdown(null)
                      }}
                      className="w-full px-6 py-3 text-slate-900 text-xs font-light tracking-widest uppercase hover:bg-cream-50 transition-colors text-left border-t border-slate-200"
                    >
                      Ver Detalle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogLayout
