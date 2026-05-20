import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useDrops } from '../../hooks/useDrops'
import CartIcon from '../icons/CartIcon'

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()
  const { data: drops } = useDrops()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const hasFutureDrop = drops.some(drop => drop.date && new Date(drop.date) > new Date())

  return (
    <nav className={`bg-white border-b border-slate-200 sticky z-40 ${hasFutureDrop ? 'top-7' : 'top-0'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-serif font-light text-slate-900 tracking-widest">GARNATA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/catalog"
              className={`text-sm tracking-wide transition-colors duration-300 ${
                isActive('/catalog')
                  ? 'font-semibold text-slate-900 border-b-2 border-slate-900 pb-1'
                  : 'font-light text-slate-700 hover:text-slate-900'
              }`}
            >
              CATÁLOGO
            </Link>
            <Link
              to="/about"
              className={`text-sm tracking-wide transition-colors duration-300 ${
                isActive('/about')
                  ? 'font-semibold text-slate-900 border-b-2 border-slate-900 pb-1'
                  : 'font-light text-slate-700 hover:text-slate-900'
              }`}
            >
              NOSOTROS
            </Link>
            <Link
              to="/contact"
              className={`text-sm tracking-wide transition-colors duration-300 ${
                isActive('/contact')
                  ? 'font-semibold text-slate-900 border-b-2 border-slate-900 pb-1'
                  : 'font-light text-slate-700 hover:text-slate-900'
              }`}
            >
              CONTACTO
            </Link>
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
              className={`block py-3 text-sm tracking-wide transition-colors ${
                isActive('/catalog')
                  ? 'font-semibold text-slate-900'
                  : 'font-light text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              CATÁLOGO
            </Link>
            <Link
              to="/about"
              className={`block py-3 text-sm tracking-wide transition-colors ${
                isActive('/about')
                  ? 'font-semibold text-slate-900'
                  : 'font-light text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              NOSOTROS
            </Link>
            <Link
              to="/contact"
              className={`block py-3 text-sm tracking-wide transition-colors ${
                isActive('/contact')
                  ? 'font-semibold text-slate-900'
                  : 'font-light text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              CONTACTO
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
