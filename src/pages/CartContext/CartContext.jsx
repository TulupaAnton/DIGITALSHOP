import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState([])

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
    ) // ← ЦЯ ДУЖКА БУЛА ВІДСУТНЯ
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

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(' грн', ''))
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
