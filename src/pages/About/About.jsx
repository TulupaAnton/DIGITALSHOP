import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLeaf,
  faHeart,
  faAward,
  faUsers,
  faStore
} from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function About () {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    })
  }, [])

  return (
    <div className='py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <div className='text-center mb-16' data-aos='fade-up'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'>
            Наша історія
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Від сімейної традиції до вашого столу - ми створюємо якісні продукти
            з любов'ю та турботою.
          </p>
        </div>

        {/* About Content */}
        <div className='grid md:grid-cols-2 gap-12 items-center mb-20'>
          <div className='space-y-6' data-aos='fade-right'>
            <h2 className='text-3xl font-bold text-gray-800'>
              Смак, який варто спробувати
            </h2>
            <p className='text-gray-600'>
              Наш магазин - це сімейна справа, яка почалася з невеликої ферми у
              серці України. Ми віримо, що справжній смак народжується з любові
              до своєї справи та поваги до традицій.
            </p>
            <p className='text-gray-600'>
              Кожен наш продукт - це результат багаторічного досвіду та
              ретельного відбору найкращих інгредієнтів. Ми не використовуємо
              шкідливих добавок, консервантів або замінників - тільки натуральні
              компоненти.
            </p>
            <div className='flex flex-wrap gap-4 pt-4'>
              <span className='px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium'>
                Натуральні інгредієнти
              </span>
              <span className='px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium'>
                Сімейні традиції
              </span>
              <span className='px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium'>
                Якість перевірена часом
              </span>
            </div>
          </div>
          <div
            className='rounded-2xl overflow-hidden shadow-xl'
            data-aos='fade-left'
          >
            <img
              src='https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              alt='Family farm'
              className='w-full h-auto object-cover transition-transform duration-500 hover:scale-105'
            />
          </div>
        </div>

        {/* Values Section */}
        <div className='py-12'>
          <h2
            className='text-3xl font-bold text-center text-gray-800 mb-12'
            data-aos='fade-up'
          >
            Наші цінності
          </h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                icon: faLeaf,
                title: 'Натуральність',
                description:
                  'Використовуємо тільки екологічно чисті інгредієнти'
              },
              {
                icon: faHeart,
                title: 'Любов до справи',
                description: 'Готуємо з дусі, як для себе'
              },
              {
                icon: faAward,
                title: 'Традиційні рецепти',
                description: 'Зберігаємо автентичність смаків'
              },
              {
                icon: faUsers,
                title: 'Клієнтоорієнтованість',
                description: 'Ваше задоволення - наш пріоритет'
              }
            ].map((item, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center'
                data-aos='fade-up'
                data-aos-delay={index * 100}
              >
                <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600 text-2xl'>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                  {item.title}
                </h3>
                <p className='text-gray-600'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section
        <div className='py-12'>
          <h2
            className='text-3xl font-bold text-center text-gray-800 mb-12'
            data-aos='fade-up'
          >
            Наша команда
          </h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                name: 'Олена Петренко',
                role: 'Засновниця',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                bio: 'З 2010 року розвиває сімейну справу, передаючи традиції через покоління'
              },
              {
                name: 'Іван Сидоренко',
                role: 'Шеф-кухар',
                image:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                bio: '15+ років досвіду в створенні автентичних рецептів'
              },
              {
                name: 'Марія Коваленко',
                role: 'Менеджер якості',
                image:
                  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                bio: 'Стежить за дотриманням всіх стандартів на кожному етапі'
              }
            ].map((member, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
                data-aos='fade-up'
                data-aos-delay={index * 100}
              >
                <div className='h-64 overflow-hidden'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {member.name}
                  </h3>
                  <p className='text-amber-600 font-medium mb-3'>
                    {member.role}
                  </p>
                  <p className='text-gray-600'>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* CTA Section */}
        <div
          className='bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 md:p-12 text-center text-white my-12'
          data-aos='fade-up'
        >
          <div className='max-w-3xl mx-auto'>
            <FontAwesomeIcon icon={faStore} className='text-3xl mb-6' />
            <h2 className='text-3xl font-bold mb-4'>
              Відчуйте справжній смак разом з нами
            </h2>
            <p className='text-xl mb-6 opacity-90'>
              Замовляйте наші продукти вже сьогодні та насолоджуйтесь якістю,
              створеною з любов'ю.
            </p>
            <a
              href='/All'
              className='inline-block px-8 py-3 bg-white text-amber-600 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg'
            >
              До каталогу
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
