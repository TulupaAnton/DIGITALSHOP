import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faPhone,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const ContactSection = () => {
  useEffect(() => {
    // Инициализация анимаций при скролле
    const handleScroll = () => {
      const elements = document.querySelectorAll('.contact-element')
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementTop < windowHeight * 0.85) {
          el.classList.add('animate-in')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Инициализация при загрузке

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          className='text-center mb-16 contact-element'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className='text-4xl md:text-5xl font-bold text-gray-800 mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Свяжитесь с нами
          </motion.h1>
          <motion.div
            className='w-24 h-1.5 bg-amber-500 mx-auto rounded-full'
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Левая часть - форма */}
          <motion.div
            className='bg-white rounded-2xl shadow-xl p-8 contact-element'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <motion.h2
              className='text-2xl font-bold text-gray-800 mb-8 flex items-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className='text-amber-500 mr-3 text-xl'
              />
              Напишите нам
            </motion.h2>

            <form className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label
                  htmlFor='email'
                  className='block text-gray-700 mb-2 flex items-center'
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className='mr-2 text-amber-500'
                  />
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='Ваш email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:shadow-md'
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor='name' className='block text-gray-700 mb-2'>
                  Ваше имя
                </label>
                <input
                  type='text'
                  id='name'
                  placeholder='Ваше имя'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:shadow-md'
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label htmlFor='message' className='block text-gray-700 mb-2'>
                  Сообщение
                </label>
                <textarea
                  id='message'
                  rows='5'
                  placeholder='Ваше сообщение'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 hover:shadow-md'
                  required
                ></textarea>
              </motion.div>

              <motion.button
                type='submit'
                className='w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Отправить сообщение</span>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className='ml-3 animate-pulse'
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Правая часть - контактная информация */}
          <div className='space-y-8'>
            <motion.div
              className='bg-white rounded-2xl shadow-xl p-8 contact-element'
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                <motion.span
                  className='text-amber-500 mr-3'
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut'
                  }}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </motion.span>
                НАЙДИТЕ НАС
              </h2>
              <motion.p
                className='text-gray-600'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Космическая улица, 123
                <br />
                Запорожье, Украина
              </motion.p>
              <motion.div
                className='mt-6 rounded-xl overflow-hidden'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.1234567890123!2d35.12345678901234!3d47.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA3JzI0LjQiTiAzNcKwMDcnMjQuNCJF!5e0!3m2!1sru!2sua!4v1234567890123!5m2!1sru!2sua'
                  width='100%'
                  height='300'
                  style={{ border: 0 }}
                  allowFullScreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='rounded-xl'
                ></iframe>
              </motion.div>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <motion.div
                className='bg-white rounded-2xl shadow-xl p-8 contact-element'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              >
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                  <motion.span
                    className='text-amber-500 mr-3'
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FontAwesomeIcon icon={faClock} />
                  </motion.span>
                  ЧАСЫ РАБОТЫ
                </h2>
                <div className='space-y-2 text-gray-600'>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    с понедельника по субботу
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    с 9:00 до 19:00
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    воскресенье: 10:00 - 18:00
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                className='bg-white rounded-2xl shadow-xl p-8 contact-element'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
              >
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                  <motion.span
                    className='text-amber-500 mr-3'
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut'
                    }}
                  >
                    <FontAwesomeIcon icon={faPhone} />
                  </motion.span>
                  ПОЗВОНИТЕ НАМ
                </h2>
                <div className='space-y-4'>
                  <motion.a
                    href='tel:+380631234567'
                    className='block text-gray-600 hover:text-amber-600 transition-all duration-300 hover:pl-2 flex items-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className='bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center mr-3'>
                      1
                    </span>
                    +38 (063) 123-45-67
                  </motion.a>
                  <motion.a
                    href='tel:+380501234567'
                    className='block text-gray-600 hover:text-amber-600 transition-all duration-300 hover:pl-2 flex items-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <span className='bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center mr-3'>
                      2
                    </span>
                    +38 (050) 123-45-67
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Декоративные элементы */}
        <motion.div
          className='absolute top-20 left-10 w-24 h-24 rounded-full bg-amber-200 opacity-30 blur-xl'
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute bottom-40 right-20 w-16 h-16 rounded-full bg-amber-300 opacity-40 blur-xl'
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-amber-400 opacity-20 blur-lg'
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

export default ContactSection
