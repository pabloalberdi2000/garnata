import React, { useMemo, useState } from 'react'
import { Product } from '../../services/contentfulService'
import { StatusBadge } from './StatusBadge'

interface CatalogLayoutProps {
  products: Product[]
  title?: string
  description?: string
}

type LayoutType = 'hero' | 'asymmetric' | 'magazine'

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  products,
  title = 'Drops',
  description = 'Colecciones exclusivas de temporada',
}) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

  const layoutType = useMemo<LayoutType>(() => {
    if (products.length === 1) return 'hero'
    if (products.length === 2) return 'asymmetric'
    return 'magazine'
  }, [products.length])

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
            </div>
          </div>
        </div>
      </section>

      {/* Products Layout */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {layoutType === 'hero' && (
          <HeroLayout product={products[0]} hoveredId={hoveredProductId} setHoveredId={setHoveredProductId} />
        )}
        {layoutType === 'asymmetric' && (
          <AsymmetricLayout products={products} hoveredId={hoveredProductId} setHoveredId={setHoveredProductId} />
        )}
        {layoutType === 'magazine' && (
          <MagazineLayout products={products} hoveredId={hoveredProductId} setHoveredId={setHoveredProductId} />
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

const HeroLayout: React.FC<{ product: Product; hoveredId: string | null; setHoveredId: (id: string | null) => void }> = ({
  product,
  hoveredId,
  setHoveredId
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-center">
      {/* Image - Hero Left */}
      <div className="lg:col-span-2">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square"
          onMouseEnter={() => setHoveredId(product.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {product.image ? (
            <img
              src={product.image}
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
            {product.collection}
          </p>
        </div>

        {/* Product Name */}
        <div>
          <h2 className="text-5xl lg:text-6xl font-serif font-light leading-tight text-slate-900 mb-6">
            {product.name}
          </h2>
          <p className="text-base font-light text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-cream-200"></div>

        {/* Price & Details */}
        <div className="space-y-4">
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

        {/* CTA Button */}
        <div className="pt-4">
          <button className="w-full px-8 py-4 bg-slate-900 text-white text-xs font-light tracking-widest uppercase hover:bg-slate-800 transition-all duration-500 hover:shadow-lg">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  )
}

const AsymmetricLayout: React.FC<{ products: Product[]; hoveredId: string | null; setHoveredId: (id: string | null) => void }> = ({
  products,
  hoveredId,
  setHoveredId
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
      {/* First Product - Large (Left, 2 cols) */}
      <div className="lg:col-span-2">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square lg:aspect-auto lg:h-96"
          onMouseEnter={() => setHoveredId(products[0].id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {products[0].image ? (
            <img
              src={products[0].image}
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
          <div className="w-6 h-px bg-slate-900"></div>
          <h3 className="text-4xl font-serif font-light text-slate-900">
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
              {products[0].collection}
            </p>
          </div>
        </div>
      </div>

      {/* Second Product - Smaller (Right, 1 col) */}
      <div className="lg:col-span-1 flex flex-col">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square mb-8"
          onMouseEnter={() => setHoveredId(products[1].id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {products[1].image ? (
            <img
              src={products[1].image}
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
          <div className="w-4 h-px bg-slate-900"></div>
          <h3 className="text-2xl font-serif font-light text-slate-900">
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
              {products[1].collection}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const MagazineLayout: React.FC<{ products: Product[]; hoveredId: string | null; setHoveredId: (id: string | null) => void }> = ({
  products,
  hoveredId,
  setHoveredId
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
      {/* Main Featured Product - Left (2 cols) */}
      <div className="lg:col-span-2">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square lg:aspect-auto lg:h-96"
          onMouseEnter={() => setHoveredId(products[0].id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {products[0].image ? (
            <img
              src={products[0].image}
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

        <div className="mt-16 space-y-6 max-w-2xl">
          <div className="space-y-3">
            <div className="w-8 h-px bg-slate-900"></div>
            <p className="text-xs font-light tracking-[0.2em] uppercase text-slate-600">
              {products[0].collection}
            </p>
          </div>

          <h2 className="text-5xl lg:text-6xl font-serif font-light leading-tight text-slate-900">
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
              className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cream-100 aspect-square mb-8"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {product.image ? (
                <img
                  src={product.image}
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

            <div className="space-y-3">
              <div className="w-4 h-px bg-slate-900"></div>
              <h3 className="text-2xl font-serif font-light text-slate-900">
                {product.name}
              </h3>
              <p className="text-xs font-light text-slate-600 leading-relaxed">
                {product.description}
              </p>
              <div className="border-t border-cream-200 pt-3">
                <p className="text-2xl font-light text-slate-900">
                  €{product.price.toFixed(0)}
                </p>
                <p className="text-xs font-light tracking-wider text-slate-500 uppercase mt-1">
                  {product.collection}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogLayout
