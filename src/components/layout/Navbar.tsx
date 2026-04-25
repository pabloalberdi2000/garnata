import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import CartIcon from '../icons/CartIcon'

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-light text-slate-900 tracking-widest">GARNATA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/catalog"
              className="text-slate-700 font-light text-sm tracking-wide hover:text-slate-900 transition-colors duration-300"
            >
              CATÁLOGO
            </Link>
            <Link
              to="/about"
              className="text-slate-700 font-light text-sm tracking-wide hover:text-slate-900 transition-colors duration-300"
            >
              NOSOTROS
            </Link>
            <a
              href="#contact"
              className="text-slate-700 font-light text-sm tracking-wide hover:text-slate-900 transition-colors duration-300"
            >
              CONTACTO
            </a>
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative text-slate-700 hover:text-slate-900 transition-colors"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-light">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-700 hover:text-slate-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <Link
              to="/catalog"
              className="block py-3 text-slate-700 font-light text-sm tracking-wide hover:text-slate-900"
              onClick={() => setMenuOpen(false)}
            >
              CATÁLOGO
            </Link>
            <Link
              to="/about"
              className="block py-3 text-slate-700 font-light text-sm tracking-wide hover:text-slate-900"
              onClick={() => setMenuOpen(false)}
            >
              NOSOTROS
            </Link>
            <a href="#contact" className="block py-3 text-slate-700 font-light text-sm tracking-wide hover:text-slate-900">
              CONTACTO
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
