import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Contact } from './pages/Contact/Contact'

import { Ingredients } from './pages/Ingredients/ingredients'
import { Catalog } from './pages/Catalog/Catalog'
import { ProductDetail } from './pages/ProductDetail/ProductDetail'
import { CartPage } from './pages/CartPage/CartPage'
import { CartProvider } from './pages/CartContext/CartContext'

function App () {
  return (
    <div>
      <CartProvider>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/catalog/:category' element={<Catalog />} />
          <Route path='/ingredients' element={<Ingredients />} />
          <Route path='/product/:category/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </CartProvider>
    </div>
  )
}

export default App
