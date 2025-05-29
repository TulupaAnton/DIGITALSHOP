import React, { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Загрузка корзины из localStorage при инициализации
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems')
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, category) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.category === category
      )

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.category === category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevItems, { ...product, category, quantity: 1 }]
    })
  }

  const removeFromCart = (productId, category) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.id === productId && item.category === category)
      )
    )
  }

  const updateQuantity = (productId, category, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, category)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.category === category
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(' грн', '').replace(',', '.'))
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
