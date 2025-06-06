import React from 'react'
import { useParams, Link } from 'react-router-dom'
import productsData from '../../data/products.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const categoryNames = {
  pickles: 'Соленья',
  smoked: 'Копчености',
  salads: 'Салаты',
  'semi-finished': 'Полуфабрикаты'
}
import zaglushka from '../../assets/zaglushka.png'

import { useCartStore } from '../../store/cartStore'
export function ProductDetail () {
  const { category, id } = useParams()
  const addToCart = useCartStore(state => state.addToCart)

  const product = productsData[category]?.find(item => item.id === parseInt(id))

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Товар не найден
          </h2>
          <Link
            to='/'
            className='inline-flex items-center text-amber-600 hover:underline'
          >
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, category)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-white py-12'>
      <div className='container mx-auto px-4'>
        <Link
          to={`/catalog/${category}`}
          className='inline-flex items-center text-amber-600 hover:underline mb-8'
        >
          <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
          Назад к {categoryNames[category] || 'каталогу'}
        </Link>

        <div className='bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto'>
          <div className='md:flex'>
            <div className='md:w-1/2'>
              <img
                src={
                  product.image ? `../../assets/${product.image}` : zaglushka
                }
                alt={product.name}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                onError={e => {
                  e.target.src = zaglushka
                }}
              />
            </div>
            <div className='p-8 md:w-1/2'>
              <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                {product.name}
              </h1>

              <div className='flex items-center mb-6'>
                <span className='text-2xl font-bold text-amber-600 mr-4'>
                  {product.price}
                </span>
                <span className='text-gray-500'>{product.weight}</span>
              </div>

              <p className='text-gray-700 mb-8'>{product.description}</p>

              <button
                onClick={handleAddToCart}
                className='flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-colors w-full'
              >
                <FontAwesomeIcon icon={faShoppingCart} className='mr-2' />
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
