import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export function Block () {
  // Анимации
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  const blob = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10
      }
    }
  }

  return (
    <div className='relative w-full px-4 py-20 md:p-20 text-center min-h-[70vh] bg-gradient-to-br from-amber-200 to-amber-300 overflow-hidden flex items-center justify-center'>
      {/* Анимированные фоновые элементы */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          variants={blob}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2 }}
          className='absolute top-0 left-0 w-32 h-32 rounded-full bg-amber-400 opacity-20 mix-blend-multiply animate-pulse'
        ></motion.div>
        <motion.div
          variants={blob}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.4 }}
          className='absolute top-1/4 right-10 w-40 h-40 rounded-full bg-amber-500 opacity-20 mix-blend-multiply animate-pulse'
        ></motion.div>
        <motion.div
          variants={blob}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.6 }}
          className='absolute bottom-10 left-1/3 w-48 h-48 rounded-full bg-amber-600 opacity-20 mix-blend-multiply animate-pulse'
        ></motion.div>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='visible'
        className='relative z-10 max-w-4xl'
      >
        <motion.h1
          variants={item}
          className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900'
        >
          Artisan Bakery
        </motion.h1>

        <motion.p
          variants={item}
          className='text-lg md:text-xl text-amber-900 opacity-90 mb-8'
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </motion.p>

        <motion.div variants={item}>
          <Link
            to='/about'
            className='inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full mt-4 hover:bg-amber-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group'
          >
            <span>Learn More</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className='ml-2 transition-transform group-hover:translate-x-1'
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
