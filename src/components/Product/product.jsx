import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import rekaImage from '../../assets/reka.jpg'

import AOS from 'aos'
import 'aos/dist/aos.css'

const categories = [
  {
    id: 'pickles',
    name: 'Соленья',
    description: 'Традиционные русские соленья и маринады',
    image: '/images/pickles/category.jpg',
    catalogLink: '/catalog/pickles'
  },
  {
    id: 'smoked',
    name: 'Копчености',
    description: 'Мясные и рыбные копчености холодного копчения',
    image: '/images/smoked/category.jpg',
    catalogLink: '/catalog/smoked'
  },
  {
    id: 'salads',
    name: 'Салаты',
    description: 'Готовые салаты по традиционным рецептам',
    image: '/images/salads/category.jpg',
    catalogLink: '/catalog/salads'
  },
  {
    id: 'semi-finished',
    name: 'Полуфабрикаты',
    description: 'Домашние пельмени, вареники и другие полуфабрикаты',
    image: '/images/semi-finished/category.jpg',
    catalogLink: '/catalog/semi-finished'
  }
]

export function Product () {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      mirror: false
    })
  }, [])

  return (
    <div
      className='min-h-[35rem] bg-cover bg-center bg-no-repeat bg-fixed relative py-20 overflow-hidden'
      style={{ backgroundImage: `url(${rekaImage})` }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-black/30'></div>
      <div className='absolute inset-0 bg-noise opacity-10'></div>

      <div className='relative z-10 container mx-auto px-4'>
        <h2
          className='text-4xl font-bold text-white text-center mb-12'
          data-aos='fade-down'
          data-aos-delay='100'
        >
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-white'>
            Наши категории
          </span>
        </h2>

        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          {categories.map((category, i) => (
            <div
              key={category.id}
              className='group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2'
              data-aos='zoom-in'
              data-aos-delay={200 + i * 100}
            >
              <div className='overflow-hidden'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110'
                />
              </div>
              <div className='p-6 flex flex-col h-[250px]'>
                <h3 className='font-semibold text-xl text-center mb-3 text-gray-800'>
                  {category.name}
                </h3>
                <p className='text-gray-600 mb-6 text-center flex-grow'>
                  {category.description}
                </p>
                <Link
                  to={category.catalogLink}
                  className='mt-auto mx-auto text-center bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full transition-all duration-300 hover:shadow-md'
                >
                  В каталог
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
