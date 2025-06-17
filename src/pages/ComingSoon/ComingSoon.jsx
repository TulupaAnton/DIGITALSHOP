import React from 'react'
import { motion } from 'framer-motion'

export default function ComingSoon () {
  return (
    <div className='relative w-full h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-200 overflow-hidden flex items-center justify-center p-6'>
      {/* 3D шарики или блобы */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className='absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 rounded-full opacity-20 blur-3xl'
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className='absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-amber-500 rounded-full opacity-20 blur-3xl'
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className='absolute top-1/4 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-yellow-300 rounded-full opacity-10 blur-2xl'
      />

      {/* Контент */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='z-10 text-center max-w-3xl'
      >
        <h1 className='text-5xl md:text-6xl font-extrabold text-amber-900 mb-6'>
          Скоро в продажу!
        </h1>
        <p className='text-xl md:text-2xl text-amber-800 mb-8'>
          Ми активно працюємо над додаванням найкращих товарів для вас.
          Залишайтеся з нами – незабаром буде багато цікавого!
        </p>
        <div className='text-amber-700 font-medium text-lg animate-pulse'>
          Дякуємо за терпіння 💛
        </div>
      </motion.div>
    </div>
  )
}
