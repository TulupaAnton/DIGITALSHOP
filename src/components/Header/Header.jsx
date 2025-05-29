import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../pages/CartContext/CartContext'

export function Header () {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount } = useCart()

  const navLinks = [
    { name: 'Головна', path: '/' },
    { name: 'Каталог', path: '/catalog/pickles' },
    { name: 'Про нас', path: '/about' },
    { name: 'Контакти', path: '/contact' }
  ]

  return (
    <header className='bg-gray-900 text-white shadow-lg sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center space-x-8'
          >
            <Link to='/' className='flex items-center'>
              <span className='text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent'>
                DeliMarket
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-6'>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.path}
                    className='relative group text-md font-medium hover:text-amber-400 transition-colors duration-300'
                  >
                    {link.name}
                    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full'></span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Cart and Mobile menu */}
          <div className='flex items-center space-x-6'>
            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to='/cart'
                className='relative p-2 text-gray-300 hover:text-amber-400 transition-colors'
              >
                <FaShoppingCart className='text-xl' />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className='md:hidden text-xl z-50 p-1 text-gray-300 hover:text-amber-400 transition-colors'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes className='opacity-80' />
              ) : (
                <FaBars className='opacity-80' />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='md:hidden fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-40 pt-20 px-4'
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  className='bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-w-md mx-auto border border-gray-700'
                  onClick={e => e.stopPropagation()}
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={link.path}
                        className='block px-6 py-4 text-lg text-gray-300 hover:text-amber-400 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0'
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * navLinks.length }}
                    className='px-6 py-4 border-t border-gray-700'
                  >
                    <Link
                      to='/cart'
                      className='flex items-center justify-between text-lg font-medium text-amber-400'
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Кошик</span>
                      {cartCount > 0 && (
                        <span className='bg-amber-500 text-white text-sm font-bold rounded-full px-2 py-1'>
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
