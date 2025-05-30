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
      case 'popular':
        filteredProducts = [...filteredProducts].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        )
        break
      case 'new':
        filteredProducts = [...filteredProducts].sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        )
        break
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
      button.classList.add('animate-ping')
      setTimeout(() => button.classList.remove('animate-ping'), 500)
    }
  }

  const handleCategoryFilter = categoryId => {
    if (categoryId === 'all') {
      navigate('/catalog')
    } else {
      navigate(`/catalog/${categoryId}`)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSortBy(null)
    navigate('/catalog')
  }

  const sortButtons = [
    { id: 'popular', name: 'Популярные', icon: faFire },
    { id: 'new', name: 'Новинки', icon: faStar },
    { id: 'price-asc', name: 'Цена (↑)', icon: faSortAmountUp },
    { id: 'price-desc', name: 'Цена (↓)', icon: faSortAmountUp, flip: true }
  ]

  return (
    <div className='py-12 bg-gradient-to-b from-amber-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
          <div className='mb-6 md:mb-0' data-aos='fade-right'>
            <h1 className='text-4xl font-bold text-gray-800'>
              {category ? categoryNames[category] || 'Каталог' : 'Весь каталог'}
            </h1>
            <p className='text-gray-600 mt-2'>
              {category
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
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500'
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>

        {/* Фильтры по категориям */}
        <div className='mb-4 flex flex-wrap gap-2' data-aos='fade-up'>
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleCategoryFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === filter.id || (!category && filter.id === 'all')
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {filter.name}
            </button>
          ))}
          {(category || searchTerm || sortBy) && (
            <button
              onClick={clearFilters}
              className='px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 border border-amber-200 hover:bg-amber-50 flex items-center gap-1'
            >
              <FontAwesomeIcon icon={faTimes} className='text-xs' />
              Сбросить фильтры
            </button>
          )}
        </div>

        {/* Кнопки сортировки */}
        <div className='mb-8 flex flex-wrap gap-2' data-aos='fade-up'>
          {sortButtons.map(button => (
            <button
              key={button.id}
              onClick={() =>
                setSortBy(prev => (prev === button.id ? null : button.id))
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                sortBy === button.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              <FontAwesomeIcon
                icon={button.icon}
                className={
                  sortBy === button.id ? 'text-white' : 'text-amber-500'
                }
                flip={button.flip}
              />
              {button.name}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {filteredProducts.map((product, i) => (
              <div
                key={`${product.category}-${product.id}`}
                className='group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2'
                data-aos='fade-up'
                data-aos-delay={i * 50}
              >
                <div className='relative overflow-hidden h-60'>
                  <img
                    src={`/images/${product.category}/${product.id}.jpg`}
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
                  <div className='absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
                    {product.categoryName}
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
                        to={`/product/${product.category}/${product.id}`}
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
              Товары не найдены
            </h3>
            <p className='text-gray-500 mt-2'>
              Попробуйте изменить критерии поиска или выбрать другую категорию.
            </p>
            <button
              onClick={clearFilters}
              className='mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm transition-colors duration-300'
            >
              Сбросить все фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
