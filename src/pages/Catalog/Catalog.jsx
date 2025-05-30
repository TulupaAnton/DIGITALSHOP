import React from 'react'
import { Link, useParams } from 'react-router-dom'
import productsData from '../../data/products.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faSearch,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useCart } from '../CartContext/CartContext'

const categoryNames = {
  pickles: 'Соленья',
  smoked: 'Копчености',
  salads: 'Салаты',
  'semi-finished': 'Полуфабрикаты'
}

export function Catalog () {
  const { category } = useParams()
  const [searchTerm, setSearchTerm] = React.useState('')
  const { addToCart } = useCart()

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    })
  }, [])

  const categoryProducts = productsData[category] || []

  const filteredProducts = categoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddToCart = product => {
    addToCart(product, category)
    const button = document.getElementById(`add-to-cart-${product.id}`)
    if (button) {
      button.classList.add('animate-ping')
      setTimeout(() => button.classList.remove('animate-ping'), 500)
    }
  }

  return (
    <div className='py-12 bg-gradient-to-b from-amber-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-12'>
          <div className='mb-6 md:mb-0' data-aos='fade-right'>
            <h1 className='text-4xl font-bold text-gray-800'>
              {categoryNames[category] || 'Каталог'}
            </h1>
            <p className='text-gray-600 mt-2'>
              {categoryNames[category]
                ? `Усі товари з категорії "${categoryNames[category]}"`
                : "Продукти приготовлені з любов'ю та турботою"}
            </p>
          </div>

          <div className='relative w-full md:w-64' data-aos='fade-left'>
            <FontAwesomeIcon
              icon={faSearch}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500'
            />
            <input
              type='text'
              placeholder='Поиск продуктов...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 rounded-full bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300'
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {filteredProducts.map((product, i) => (
              <div
                key={`${category}-${product.id}`}
                className='group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2'
                data-aos='fade-up'
                data-aos-delay={i * 50}
              >
                <div className='relative overflow-hidden h-60'>
                  <img
                    src={`/images/${category}/${product.id}.jpg`}
                    alt={product.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    onError={e => {
                      e.target.src = '/images/placeholder.jpg'
                    }}
                  />
                  <div className='absolute top-4 right-4 flex space-x-2'>
                    <button className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-amber-100 transition-colors'>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className='text-gray-400 hover:text-amber-500'
                      />
                    </button>
                  </div>
                </div>

                <div className='p-6'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-semibold text-lg text-gray-800'>
                      {product.name}
                    </h3>
                    <span className='font-bold text-amber-600'>
                      {product.price}
                    </span>
                  </div>

                  <p className='text-gray-600 text-sm mb-6 line-clamp-2'>
                    {product.description}
                  </p>

                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>
                      {product.weight}
                    </span>
                    <div className='flex space-x-2'>
                      <Link
                        to={`/product/${category}/${product.id}`}
                        className='px-4 py-2 border border-amber-500 text-amber-600 hover:bg-amber-50 rounded-full text-sm transition-colors duration-300 flex items-center group'
                      >
                        Детальніше
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='ml-2 text-xs transition-transform group-hover:translate-x-1'
                        />
                      </Link>
                      <button
                        id={`add-to-cart-${product.id}`}
                        onClick={() => handleAddToCart(product)}
                        className='px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm transition-colors duration-300'
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12' data-aos='fade-up'>
            <h3 className='text-xl font-medium text-gray-700'>
              Товари не знайдені
            </h3>
            <p className='text-gray-500 mt-2'>
              Спробуйте змінити критерії пошуку або вибрати іншу категорію.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
