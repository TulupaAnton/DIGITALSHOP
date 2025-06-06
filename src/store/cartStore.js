// src/store/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      // Добавление товара в корзину
      addToCart: (product, category) => {
        const existingItem = get().cartItems.find(
          item => item.id === product.id && item.category === category
        )

        if (existingItem) {
          set({
            cartItems: get().cartItems.map(item =>
              item.id === product.id && item.category === category
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              { ...product, category, quantity: 1 }
            ]
          })
        }
      },

      // Удаление товара из корзины
      removeFromCart: (productId, category) => {
        set({
          cartItems: get().cartItems.filter(
            item => !(item.id === productId && item.category === category)
          )
        })
      },

      // Обновление количества товара
      updateQuantity: (productId, category, newQuantity) => {
        if (newQuantity < 1) {
          get().removeFromCart(productId, category)
          return
        }

        set({
          cartItems: get().cartItems.map(item =>
            item.id === productId && item.category === category
              ? { ...item, quantity: newQuantity }
              : item
          )
        })
      },

      // Очистка корзины
      clearCart: () => set({ cartItems: [] }),

      // Вычисляемые значения
      totalPrice: () => {
        return get().cartItems.reduce((sum, item) => {
          const price = parseFloat(
            item.price.replace(' грн', '').replace(',', '.')
          )
          return sum + price * item.quantity
        }, 0)
      },

      cartCount: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage' // имя для localStorage
    }
  )
)
