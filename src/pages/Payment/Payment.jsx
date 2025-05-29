import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../CartContext/CartContext'
import { motion } from 'framer-motion'

export function Payment () {
  const { cartItems, totalPrice, cartCount, clearCart } = useCart()

  const handlePaymentSubmit = e => {
    e.preventDefault()
    // Здесь можно добавить логику обработки платежа
    alert('Оплата прошла успешно! Спасибо за покупку!')
    clearCart()
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <Link
            to='/cart'
            className='inline-flex items-center text-amber-600 hover:underline mb-8'
          >
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
            Вернуться в корзину
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              Оформление заказа
            </h1>
            <div className='w-20 h-1 bg-amber-500 rounded-full'></div>
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Информация о заказе */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden'
            >
              <div className='p-6 bg-amber-50 border-b border-amber-100'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Ваш заказ ({cartCount})
                </h2>
              </div>

              <div className='divide-y divide-gray-200 max-h-96 overflow-y-auto'>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.category}-${item.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className='p-4'
                  >
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 mr-4'>
                        <img
                          src={`/images/${item.category}/${item.id}.jpg`}
                          alt={item.name}
                          className='w-16 h-16 object-cover rounded-lg'
                          onError={e => {
                            e.target.src = '/images/placeholder.jpg'
                          }}
                        />
                      </div>
                      <div className='flex-grow'>
                        <h3 className='font-medium text-gray-800'>
                          {item.name}
                        </h3>
                        <p className='text-sm text-gray-600'>
                          {item.price} × {item.quantity}
                        </p>
                      </div>
                      <div className='font-medium text-amber-600'>
                        {(
                          parseFloat(
                            item.price.replace(' грн', '').replace(',', '.')
                          ) * item.quantity
                        ).toFixed(2)}{' '}
                        грн
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className='p-6 bg-gray-50 border-t border-gray-200'>
                <div className='space-y-3 mb-4'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Промежуточный итог:</span>
                    <span className='font-medium'>
                      {totalPrice.toFixed(2)} грн
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Доставка:</span>
                    <span className='font-medium'>Бесплатно</span>
                  </div>
                </div>
                <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                  <span className='text-lg font-semibold'>Итого:</span>
                  <span className='text-xl font-bold text-amber-600'>
                    {totalPrice.toFixed(2)} грн
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Форма оплаты */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden'
            >
              <div className='p-6 bg-amber-50 border-b border-amber-100'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Данные для оплаты
                </h2>
              </div>

              <form onSubmit={handlePaymentSubmit} className='p-6'>
                <div className='space-y-5'>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className='block text-gray-700 mb-2'>
                      Имя и фамилия
                    </label>
                    <input
                      type='text'
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all'
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className='block text-gray-700 mb-2'>
                      Номер телефона
                    </label>
                    <input
                      type='tel'
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all'
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className='block text-gray-700 mb-2'>Email</label>
                    <input
                      type='email'
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all'
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className='block text-gray-700 mb-2'>
                      Адрес доставки
                    </label>
                    <textarea
                      rows='3'
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all'
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className='border-t border-gray-200 pt-4'
                  >
                    <h3 className='text-lg font-medium text-gray-800 mb-4'>
                      Способ оплаты
                    </h3>
                    <div className='space-y-3'>
                      <label className='flex items-center space-x-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='payment'
                          defaultChecked
                          className='h-5 w-5 text-amber-500 focus:ring-amber-300 border-gray-300'
                        />
                        <span>Оплата при получении</span>
                      </label>
                      <label className='flex items-center space-x-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='payment'
                          className='h-5 w-5 text-amber-500 focus:ring-amber-300 border-gray-300'
                        />
                        <span>Онлайн оплата картой</span>
                      </label>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className='pt-4'
                  >
                    <button
                      type='submit'
                      className='w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>Подтвердить заказ</span>
                    </button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className='mt-8 bg-amber-50 border border-amber-100 rounded-lg p-4'
          >
            <p className='text-gray-700 text-center'>
              Нажимая "Подтвердить заказ", вы соглашаетесь с нашими{' '}
              <Link to='/terms' className='text-amber-600 hover:underline'>
                условиями использования
              </Link>{' '}
              и{' '}
              <Link to='/privacy' className='text-amber-600 hover:underline'>
                политикой конфиденциальности
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
