import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import productsData from '../../data/products.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faSearch,
  faArrowRight,
  faTimes,
  faFire,
  faStar,
  faSortAmountUp
} from '@fortawesome/free-solid-svg-icons'
import zaglushka from '../../assets/zaglushka.png'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useCart } from '../CartContext/CartContext'

const categoryNames = {
  pickles: 'Соленья',
  smoked: 'Копчености',
  salads: 'Салаты',
  'semi-finished': 'Полуфабрикаты'
}

const categoryFilters = [
  { id: 'all', name: 'Все товары' },
  { id: 'pickles', name: 'Соленья' },
  { id: 'smoked', name: 'Копчености' },
  { id: 'salads', name: 'Салаты' },
  { id: 'semi-finished', name: 'Полуфабрикаты' }
]

export function All () {
  const { category } = useParams()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortBy, setSortBy] = React.useState(null)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    })
  }, [])

  // Собираем все продукты из всех категорий
  const allProducts = Object.entries(productsData).flatMap(
    ([category, products]) =>
      products.map(product => ({
        ...product,
        category,
        categoryName: categoryNames[category] || category
      }))
  )

  // Фильтруем по категории и поисковому запросу
  let filteredProducts = allProducts.filter(product => {
    const matchesCategory =
      !category || category === 'all' || product.category === category
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Применяем сортировку
  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filteredProducts = [...filteredProducts].sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0
          return priceA - priceB
        })
        break
      case 'price-desc':
        filteredProducts = [...filteredProducts].sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0
          return priceB - priceA
        })
        break
      default:
        break
    }
  }

  const handleAddToCart = product => {
    addToCart(product, product.category)
    const button = document.getElementById(`add-to-cart-${product.id}`)
    if (button) {
      button.classList.add('animate-pulse')
      setTimeout(() => button.classList.remove('animate-pulse'), 500)
    }
  }

  const handleCategoryFilter = categoryId => {
    if (categoryId === 'all') {
      navigate('/All')
    } else {
      navigate(`/catalog/${categoryId}`)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSortBy(null)
    navigate('/All')
  }

  return (
    <div className='py-12 bg-gradient-to-b from-amber-50 to-white min-h-screen'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
          <div className='mb-6 md:mb-0' data-aos='fade-right'>
            <h1 className='text-4xl font-bold text-gray-900 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'>
              {category ? categoryNames[category] || 'Каталог' : 'Весь каталог'}
            </h1>
            <p className='text-gray-600 mt-2 max-w-lg'>
              {category
                ? `Усі товари з категорії "${categoryNames[category]}"`
                : "Продукти приготовлені з любов'ю та турботою"}
            </p>
          </div>

          <div className='relative w-full md:w-72' data-aos='fade-left'>
            <div className='relative'>
              <FontAwesomeIcon
                icon={faSearch}
                className='absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500'
              />
              <input
                type='text'
                placeholder='Поиск продуктов...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-10 py-3 rounded-2xl bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-all duration-200'
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors'
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Фильтры по категориям */}
        <div className='mb-8 flex flex-wrap gap-3' data-aos='fade-up'>
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleCategoryFilter(filter.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === filter.id || (!category && filter.id === 'all')
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 shadow-sm'
              }`}
            >
              {filter.name}
            </button>
          ))}
          {(category || searchTerm || sortBy) && (
            <button
              onClick={clearFilters}
              className='px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2 transition-colors duration-200'
            >
              <FontAwesomeIcon icon={faTimes} className='text-xs' />
              Сбросить фильтры
            </button>
          )}
        </div>

        {/* Кнопки сортировки */}
        <div className='mb-8 flex flex-wrap gap-2' data-aos='fade-up'></div>

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredProducts.map((product, i) => (
              <div
                key={`${product.category}-${product.id}`}
                className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                data-aos='fade-up'
                data-aos-delay={i * 50}
              >
                <div className='relative overflow-hidden h-64'>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10'></div>
                  <img
                    src={
                      product.image
                        ? `../../assets/${product.image}`
                        : zaglushka
                    }
                    alt={product.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute top-4 right-4 flex space-x-2 z-20'>
                    <button className='w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:bg-amber-100 transition-all duration-200 group/wishlist'>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className='text-gray-500 group-hover/wishlist:text-amber-500 transition-colors'
                      />
                    </button>
                  </div>
                  <div className='absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-md z-20'>
                    {product.categoryName}
                  </div>
                </div>

                <div className='p-5'>
                  <div className='flex justify-between items-start mb-3'>
                    <h3 className='font-semibold text-lg text-gray-900 line-clamp-1'>
                      {product.name}
                    </h3>
                    <span className='font-bold text-amber-600 whitespace-nowrap ml-2'>
                      {product.price}
                    </span>
                  </div>

                  <p className='text-gray-600 text-sm mb-5 line-clamp-2'>
                    {product.description}
                  </p>

                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>
                      {product.weight}
                    </span>
                    <div className='flex space-x-2'>
                      <Link
                        to={`/product/${product.category}/${product.id}`}
                        className='px-4 py-2 border border-amber-400 text-amber-600 hover:bg-amber-50 rounded-xl text-sm transition-all duration-200 flex items-center group/readmore'
                      >
                        Детальніше
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='ml-2 text-xs transition-transform duration-200 group-hover/readmore:translate-x-1'
                        />
                      </Link>
                      <button
                        id={`add-to-cart-${product.id}`}
                        onClick={() => handleAddToCart(product)}
                        className='px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg'
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
          <div className='text-center py-16' data-aos='fade-up'>
            <div className='max-w-md mx-auto'>
              <div className='w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className='text-amber-500 text-3xl'
                />
              </div>
              <h3 className='text-2xl font-medium text-gray-800 mb-2'>
                Товары не найдены
              </h3>
              <p className='text-gray-500 mb-6'>
                Попробуйте изменить критерии поиска или выбрать другую
                категорию.
              </p>
              <button
                onClick={clearFilters}
                className='px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg'
              >
                Сбросить все фильтры
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
