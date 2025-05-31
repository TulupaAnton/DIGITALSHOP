import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import breadImage from '../../assets/-min.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'
import zaglushka from '../../assets/zaglushka.png'

export function Ingredients () {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      mirror: false
    })
  }, [])
  return (
    <div className='max-w-7xl mx-auto px-4 py-20'>
      <div className='flex flex-col md:flex-row gap-12 items-center'>
        <div className='md:w-1/2' data-aos='fade-right'>
          <div className='max-w-md mx-auto'>
            <span
              className='text-amber-600 font-medium mb-2 block'
              data-aos='fade-right'
              data-aos-delay='100'
            >
              Traditional Methods
            </span>
            <h2
              className='text-4xl font-bold text-gray-800 mb-6 leading-tight'
              data-aos='fade-right'
              data-aos-delay='200'
            >
              Ингредиенты и метод
            </h2>
            <p
              className='text-gray-600 mb-8 leading-relaxed'
              data-aos='fade-right'
              data-aos-delay='300'
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              ratione dolore unde, esse iure dolor ex. Fugit tempora sint esse.
              Optio, hic iure! Sunt magni suscipit laboriosam ullam accusamus
              distinctio!
            </p>
            <Link
              to='/ingredients'
              className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-white hover:shadow-lg transition-all duration-300 group'
              data-aos='zoom-in'
              data-aos-delay='400'
            >
              <span>ЧИТАТЬ ДАЛЕЕ</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className='ml-3 transition-transform group-hover:translate-x-1'
              />
            </Link>
          </div>
        </div>

        <div
          className='md:w-1/2 relative'
          data-aos='fade-left'
          data-aos-delay='200'
        >
          <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
            <img
              src={zaglushka}
              alt='Хлеб и ингредиенты'
              className='w-full h-auto object-cover transition-transform duration-1000 hover:scale-105'
              style={{ minHeight: '500px' }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
          </div>
          <div
            className='absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg'
            data-aos='zoom-in'
            data-aos-delay='600'
          >
            <div className='text-amber-600 font-bold'>100% Organic</div>
          </div>
        </div>
      </div>
    </div>
  )
}
