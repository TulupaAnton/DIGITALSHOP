import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import rekaImage from '../../assets/reka.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faPhone
} from '@fortawesome/free-solid-svg-icons'

import { Product } from '../../components/Product/product'

import { Description } from '../../components/Description/Description'
import ContactSection from '../../components/ContactSection/ContactSection'
import { Ingredients } from '../../components/Ingredients/Ingredients'

export function Home () {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      mirror: false
    })
  }, [])

  return (
    <div className='relative overflow-hidden'>
      {/* Первый блок с контентом - Hero секция */}
      <div
        className='flex flex-col items-center justify-center w-full px-4 py-20 md:p-20 text-center min-h-[70vh] bg-gradient-to-br from-amber-200 to-amber-300 relative overflow-hidden'
        data-aos='fade'
      >
        {/* Анимированные фоновые элементы */}
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute top-0 left-0 w-32 h-32 rounded-full bg-amber-400 opacity-20 mix-blend-multiply animate-blob animation-delay-2000'
            data-aos='zoom-in'
            data-aos-delay='300'
          ></div>
          <div
            className='absolute top-1/4 right-10 w-40 h-40 rounded-full bg-amber-500 opacity-20 mix-blend-multiply animate-blob'
            data-aos='zoom-in'
            data-aos-delay='500'
          ></div>
          <div
            className='absolute bottom-10 left-1/3 w-48 h-48 rounded-full bg-amber-600 opacity-20 mix-blend-multiply animate-blob animation-delay-4000'
            data-aos='zoom-in'
            data-aos-delay='700'
          ></div>
        </div>

        <div className='relative z-10 max-w-4xl'>
          <h1
            className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900'
            data-aos='fade-up'
            data-aos-delay='100'
          >
            Artisan Bakery
          </h1>
          <p
            className='text-lg md:text-xl text-amber-900 opacity-90 mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
          </p>
          <Link
            to='/about'
            className='inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full mt-4 hover:bg-amber-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
            data-aos='zoom-in'
            data-aos-delay='300'
          >
            <span>Learn More</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className='ml-2 transition-transform group-hover:translate-x-1'
            />
          </Link>
        </div>
      </div>

      {/* Параллакс-секция с продуктами */}
      <div>
        <Product />
      </div>
      {/* Секция с ингредиентами */}
      <div>
        <Ingredients />
      </div>

      {/* Секция с сортами хлеба */}
      <div>{/* <Description /> */}</div>

      {/* Секция с контактами */}

      <ContactSection />
    </div>
  )
}
