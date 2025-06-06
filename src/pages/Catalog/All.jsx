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
import { useCartStore } from '../../store/cartStore'

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

const sortOptions = [
  { id: null, name: 'По умолчанию' },
  { id: 'price-asc', name: 'По возрастанию цены' },
  { id: 'price-desc', name: 'По убыванию цены' },
  { id: 'popular', name: 'По популярности' }
]

export function All () {
  const { category } = useParams()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortBy, setSortBy] = React.useState(null)
  const [isSortOpen, setIsSortOpen] = React.useState(false)
  const { addToCart } = useCartStore()

  const navigate = useNavigate()

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 20
    })
  }, [])

  const allProducts = Object.entries(productsData).flatMap(
    ([category, products]) =>
      products.map(product => ({
        ...product,
        category,
        categoryName: categoryNames[category] || category
      }))
  )

  let filteredProducts = allProducts.filter(product => {
    const matchesCategory =
      !category || category === 'all' || product.category === category
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
      case 'popular':
        filteredProducts = [...filteredProducts].sort(
          (a, b) => b.rating - a.rating
        )
        break
      default:
        break
    }
  }

  const handleAddToCart = product => {
    addToCart(product, product.category)
    const button = document.getElementById(`add-to-cart-${product.id}`)
    if (button) {
      button.classList.add('animate-pulse', 'scale-110')
      setTimeout(() => {
        button.classList.remove('animate-pulse', 'scale-110')
      }, 500)
    }
  }

  const handleFavoriteClick = (product, e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite(product.id, product.category)) {
      removeFromFavorites(product.id, product.category)
    } else {
      addToFavorites(product)
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

  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen)
  }

  const selectSortOption = option => {
    setSortBy(option)
    setIsSortOpen(false)
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

          <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
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
                  className='w-full pl-12 pr-10 py-3 rounded-2xl bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md'
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

            <div className='relative' data-aos='fade-left' data-aos-delay='100'>
              <button
                onClick={toggleSortDropdown}
                className='px-5 py-3 bg-white border border-amber-200 rounded-2xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2'
              >
                <FontAwesomeIcon icon={faSortAmountUp} />
                <span>
                  {sortOptions.find(opt => opt.id === sortBy)?.name ||
                    'Сортировка'}
                </span>
              </button>
              {isSortOpen && (
                <div className='absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-hidden animate-fadeIn'>
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => selectSortOption(option.id)}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                        sortBy === option.id
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                    >
                      {option.id === sortBy && (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='text-xs'
                        />
                      )}
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mb-8 flex flex-wrap gap-3' data-aos='fade-up'>
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleCategoryFilter(filter.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === filter.id || (!category && filter.id === 'all')
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200 hover:shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
              }`}
            >
              {filter.name}
            </button>
          ))}
          {(category || searchTerm || sortBy) && (
            <button
              onClick={clearFilters}
              className='px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2 transition-all duration-200 hover:shadow-md'
            >
              <FontAwesomeIcon icon={faTimes} className='text-xs' />
              Сбросить фильтры
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredProducts.map((product, i) => (
              <div
                key={`${product.category}-${product.id}`}
                className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative'
                data-aos='fade-up'
                data-aos-delay={i * 50}
              >
                {product.isPopular && (
                  <div className='absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg'>
                    <FontAwesomeIcon icon={faFire} className='text-xs' />
                    <span>Хит</span>
                  </div>
                )}

                {product.rating > 4.5 && (
                  <div className='absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg'>
                    <FontAwesomeIcon icon={faStar} className='text-xs' />
                    <span>Топ</span>
                  </div>
                )}

                <div className='relative overflow-hidden h-64'>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
                  <img
                    src={
                      product.image
                        ? `../../assets/${product.image}`
                        : zaglushka
                    }
                    alt={product.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    loading='lazy'
                  />
                  <div className='absolute top-4 right-4 flex space-x-2 z-20'></div>
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
                        className='px-4 py-2 border border-amber-400 text-amber-600 hover:bg-amber-50 rounded-xl text-sm transition-all duration-200 flex items-center group/readmore hover:shadow-md'
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
                        className='px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95'
                      >
                        У кошик
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
              <div className='w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className='text-amber-500 text-3xl'
                />
              </div>
              <h3 className='text-2xl font-medium text-gray-800 mb-2'>
                Товари не знайдені.
              </h3>
              <p className='text-gray-500 mb-6'>
                Спробуйте,змінити критерії пошука або вибрати іншу категорію.
              </p>
              <button
                onClick={clearFilters}
                className='px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]'
              >
                Сбросити усі фільтри
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
