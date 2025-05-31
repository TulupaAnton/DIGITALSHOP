import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHome,
  FaBoxes,
  FaInfoCircle,
  FaPhone
} from 'react-icons/fa'
import { useCart } from '../../pages/CartContext/CartContext'

export function Header () {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount } = useCart()

  const navLinks = [
    { name: 'Головна', path: '/', icon: <FaHome className='mr-2' /> },
    { name: 'Каталог', path: '/All', icon: <FaBoxes className='mr-2' /> },
    {
      name: 'Про нас',
      path: '/about',
      icon: <FaInfoCircle className='mr-2' />
    },
    { name: 'Контакти', path: '/contact', icon: <FaPhone className='mr-2' /> }
  ]

  return (
    <header className='bg-gradient-to-b from-amber-800 to-amber-900 shadow-lg sticky top-0 z-50'>
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
              <motion.span
                whileHover={{ scale: 1.05 }}
                className='text-2xl font-bold text-white flex items-center'
              >
                <span className='bg-amber-600 p-2 rounded-lg mr-3'>
                  <FaShoppingCart className='text-amber-100' />
                </span>
                <span className='bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent'>
                  DeliMarket
                </span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-1'>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to={link.path}
                    className='relative group px-4 py-2 rounded-lg flex items-center text-amber-100 hover:bg-amber-700/50 transition-all duration-300'
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    <span className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-3/4'></span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Cart and Mobile menu */}
          <div className='flex items-center space-x-4'>
            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='relative'
            >
              <Link
                to='/cart'
                className='p-2 rounded-full bg-amber-700/30 hover:bg-amber-700/50 transition-colors flex items-center justify-center'
              >
                <FaShoppingCart className='text-xl text-amber-100' />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='absolute -top-1 -right-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md'
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className='md:hidden text-xl z-50 p-2 rounded-full bg-amber-700/30 hover:bg-amber-700/50 text-amber-100 transition-colors'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='md:hidden fixed inset-0 bg-amber-900/90 backdrop-blur-sm z-40 pt-24 px-4'
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className='bg-gradient-to-b from-amber-800 to-amber-900 rounded-xl shadow-2xl overflow-hidden max-w-sm mx-auto border border-amber-700/50'
                  onClick={e => e.stopPropagation()}
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={link.path}
                        className='flex items-center px-6 py-4 text-lg text-amber-100 hover:bg-amber-700/30 transition-colors border-b border-amber-700/30 last:border-b-0'
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navLinks.length }}
                    className='px-6 py-4 border-t border-amber-700/30 bg-amber-700/20'
                  >
                    <Link
                      to='/cart'
                      className='flex items-center justify-between text-lg font-medium text-amber-50'
                      onClick={() => setIsOpen(false)}
                    >
                      <div className='flex items-center'>
                        <FaShoppingCart className='mr-3 text-amber-200' />
                        <span>Кошик</span>
                      </div>
                      {cartCount > 0 && (
                        <span className='bg-amber-400 text-amber-900 text-sm font-bold rounded-full px-2.5 py-1 shadow-sm'>
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
