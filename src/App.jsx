import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Contacts } from './pages/Contact/Contact'

import { Ingredients } from './pages/Ingredients/ingredients'

import { ProductDetail } from './pages/ProductDetail/ProductDetail'
import { CartPage } from './pages/CartPage/CartPage'
import { CartProvider } from './pages/CartContext/CartContext'
import { Catalog } from './pages/Catalog/Catalog'
import { Payment } from './pages/Payment/Payment'
import { All } from './pages/Catalog/All'

function App () {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contacts />} />
        <Route path='/All' element={<All />} />
        <Route path='/catalog/:category' element={<Catalog />} />
        <Route path='/ingredients' element={<Ingredients />} />
        <Route path='/product/:category/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </CartProvider>
  )
}

export default App
