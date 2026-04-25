# 💎 GARNATA - Joyas Artesanales de Lujo

Plataforma eCommerce de joyas artesanales hecha con React, Vite, Tailwind CSS y Contentful.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS (tema dorado, crema y negro elegante)
- **Estado**: Zustand + localStorage
- **CMS**: Contentful API
- **Pagos**: Stripe (integración preparada)
- **Routing**: React Router v6

## 📁 Estructura del Proyecto

```
garnata/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── Footer.jsx
│   │   ├── product/
│   │   │   └── ProductCard.jsx
│   │   ├── cart/
│   │   │   ├── CartItems.jsx
│   │   │   └── CartSummary.jsx
│   │   └── icons/
│   │       └── CartIcon.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── Cart.jsx
│   │   └── About.jsx
│   ├── hooks/
│   │   ├── useContentful.js
│   │   └── useCart.js
│   ├── services/
│   │   ├── contentfulService.js
│   │   └── stripeService.js
│   ├── store/
│   │   └── cartStore.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## 🎨 Paleta de Colores

- **Dorados**: #D4A017 (principal), #BFA080, #F9B639
- **Crema**: #F5EFE7, #FFF9E6, #E8E0D5
- **Negro Elegante**: #1a1a1a (slate-950)

## 📦 Instalación

### 1. Clonar el repositorio
```bash
cd ~/Desktop
git clone <tu-repo> garnata
cd garnata
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Edita `.env` y añade:
```
VITE_CONTENTFUL_SPACE_ID=tu_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=tu_token
VITE_STRIPE_PUBLIC_KEY=tu_stripe_key
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

La app se abrirá en `http://localhost:3000`

## 🏗️ Construcción para Producción

```bash
npm run build
npm run preview
```

## 📚 Características Principales

### 🏠 Home Page
- Hero section con llamada a la acción
- Catálogo de productos destacados
- Filtrado por colecciones (Anillos, Collares, Pendientes)
- Newsletter subscription
- Productos mock (datos de demostración)

### 📖 Catálogo
- Grid responsive de productos
- Filtrado por colecciones
- Ordenamiento (nombre, precio menor/mayor)
- Tarjetas de producto con imagen, descripción y precio
- Botón "Añadir al carrito" intuitivo

### 🛒 Carrito de Compras
- Gestión reactiva del estado con Zustand
- Persistencia en localStorage
- Actualización de cantidades
- Cálculo automático de totales
- Resumen de orden con IVA incluido
- Botón de checkout preparado para Stripe

### ℹ️ Página Nosotros
- Historia de la marca
- Valores corporativos
- Proceso de creación
- Información de contacto

## 🔗 Integración Contentful

### Content Types necesarios:
1. **Product**
   - name (Short text)
   - description (Long text)
   - price (Number)
   - collection (Short text)
   - image (Asset)
   - sku (Short text)
   - materials (Array)
   - details (Long text)

2. **Collection**
   - name (Short text)
   - description (Long text)
   - image (Asset)

3. **StoreInfo**
   - storeName (Short text)
   - description (Long text)
   - email (Short text)
   - phone (Short text)
   - address (Long text)

## 💳 Integración Stripe

El servicio de Stripe está preparado con:
- `createCheckoutSession()`: Crea sesión de pago
- `redirectToCheckout()`: Redirige a Stripe Checkout
- `mockCheckout()`: Función mock para desarrollo

```javascript
import { stripeService } from './services/stripeService'

// Usar en el checkout
await stripeService.mockCheckout(cartItems)
```

## 🎯 Hooks Personalizados

### `useCart()`
```javascript
const { items, addItem, removeItem, updateQuantity, total, totalItems } = useCart()
```

### `useProducts()`
```javascript
const { data: products, loading, error } = useProducts(collection)
```

### `useCollections()`
```javascript
const { data: collections, loading, error } = useCollections()
```

## 🎨 Componentes Reutilizables

- **ProductCard**: Tarjeta de producto con acciones
- **CartItems**: Lista de artículos en el carrito
- **CartSummary**: Resumen y checkout
- **Navbar**: Navegación con carrito
- **Footer**: Pie de página con redes sociales
- **Hero**: Sección heroica

## 🚀 Próximos Pasos

1. ✅ Conectar Contentful (reemplazar datos mock)
2. ✅ Integrar Stripe Checkout completamente
3. ✅ Añadir autenticación de usuarios
4. ✅ Implementar página de detalles de producto
5. ✅ Añadir búsqueda de productos
6. ✅ Sistema de reseñas y ratings
7. ✅ Admin dashboard para gestionar productos

## 📝 Notas de Desarrollo

- Los datos mock están preparados para funcionamiento inmediato
- El carrito persiste en localStorage automáticamente
- Responsive design para mobile, tablet y desktop
- Animaciones suaves con Tailwind
- Accesibilidad mejorada

## 📞 Soporte

Para dudas o cambios:
- Email: info@garnata.com
- Teléfono: +34 666 666 666

---

**Versión**: 1.0.0  
**Última actualización**: 2024  
**Autor**: Desarrollo Senior Frontend
