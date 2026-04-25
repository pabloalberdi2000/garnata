#!/bin/bash

# Crear estructura de directorios para GARNATA
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🎨 Creando estructura de proyecto GARNATA..."

# Estructura de carpetas
mkdir -p src/{components,hooks,services,context,pages,assets/{images,icons},styles,utils}
mkdir -p public

# Subdirectorios de componentes
mkdir -p src/components/{common,layout,product,cart}

# Crear estructura básica de archivos
echo "📁 Carpetas creadas:"
echo "✓ src/components (Navbar, Hero, ProductCard, Cart, Footer)"
echo "✓ src/hooks (Lógica del carrito y Contentful)"
echo "✓ src/services (Contentful y Stripe)"
echo "✓ src/context (Gestión de estado)"
echo "✓ src/pages (Home, Catalog, ProductDetail, About)"
echo "✓ src/assets (Imágenes e iconos)"

echo ""
echo "✅ Estructura completada. Ahora instala las dependencias:"
echo "npm install"
