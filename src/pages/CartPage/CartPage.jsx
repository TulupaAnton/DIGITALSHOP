import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../CartContext/CartContext'

export function CartPage () {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    cartCount,
    clearCart
  } = useCart()

  const handleCheckout = () => {
    // Здесь можно добавить логику оформления заказа
    alert('Заказ оформлен! Спасибо за покупку!')
    clearCart()
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* <Link
            to='/'
            className='inline-flex items-center text-amber-600 hover:underline mb-8'
          >
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
            Вернуться к покупкам
          </Link> */}

          <h1 className='text-3xl font-bold text-gray-800 mb-8'>Корзина</h1>

          {cartCount === 0 ? (
            <div className='text-center py-12'>
              <h2 className='text-xl font-medium text-gray-700 mb-4'>
                Ваша корзина пуста
              </h2>
              <Link
                to='/All'
                className='inline-block px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors'
              >
                Начать покупки
              </Link>
            </div>
          ) : (
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='divide-y divide-gray-200'>
                {cartItems.map(item => (
                  <div key={`${item.category}-${item.id}`} className='p-6'>
                    <div className='flex flex-col md:flex-row md:items-center'>
                      <div className='flex-shrink-0 mb-4 md:mb-0 md:mr-6'>
                        <img
                          src={`/images/${item.category}/${item.id}.jpg`}
                          alt={item.name}
                          className='w-24 h-24 object-cover rounded-lg'
                          onError={e => {
                            e.target.src = '/images/placeholder.jpg'
                          }}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex justify-between'>
                          <h3 className='text-lg font-semibold text-gray-800'>
                            {item.name}
                          </h3>
                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.category)
                            }
                            className='text-gray-400 hover:text-red-500 transition-colors'
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                        <p className='text-gray-600 mb-2'>{item.price}</p>
                        <div className='flex items-center mt-4'>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.category,
                                item.quantity - 1
                              )
                            }
                            className='w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100'
                          >
                            -
                          </button>
                          <span className='w-12 h-8 flex items-center justify-center border-t border-b border-gray-300'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.category,
                                item.quantity + 1
                              )
                            }
                            className='w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100'
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='p-6 bg-gray-50'>
                <div className='flex justify-between items-center mb-6'>
                  <span className='text-lg font-semibold'>Итого:</span>
                  <span className='text-xl font-bold text-amber-600'>
                    {totalPrice.toFixed(2)} грн
                  </span>
                </div>
                <Link
                  to='/payment'
                  className='w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors'
                >
                  Оформить заказ
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
