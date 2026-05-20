import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import UpcomingDropBanner from './components/layout/UpcomingDropBanner'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import './styles/index.css'

if (typeof window !== 'undefined') {
  console.log('Environment Check:')
  console.log('VITE_CONTENTFUL_SPACE_ID:', import.meta.env.VITE_CONTENTFUL_SPACE_ID ? '✓ Set' : '✗ Missing')
  console.log('VITE_CONTENTFUL_ACCESS_TOKEN:', import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN ? '✓ Set' : '✗ Missing')
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <UpcomingDropBanner />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
