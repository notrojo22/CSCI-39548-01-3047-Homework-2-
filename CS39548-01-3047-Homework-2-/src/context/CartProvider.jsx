import { useCallback, useMemo, useState } from 'react'
import { CartContext } from './CartContext'

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(null)
    window.setTimeout(() => {
      setToast({ message, id: Date.now() })
    }, 10)
  }, [])

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  const addToCart = useCallback(
    (item) => {
      setCart((prev) => {
        const existing = prev.find((entry) => entry.id === item.id)
        if (existing) {
          return prev.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          )
        }
        return [...prev, { ...item, quantity: 1 }]
      })
      showToast(`${item.name} added to cart!`)
    },
    [showToast],
  )

  const decrementItem = useCallback((id) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.id === id ? { ...entry, quantity: entry.quantity - 1 } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )
  }, [])

  const incrementItem = useCallback((id) => {
    setCart((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const grandTotal = useMemo(
    () =>
      cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  )

  const value = useMemo(
    () => ({
      cart,
      grandTotal,
      addToCart,
      decrementItem,
      incrementItem,
      clearCart,
      toast,
      dismissToast,
    }),
    [
      cart,
      grandTotal,
      addToCart,
      decrementItem,
      incrementItem,
      clearCart,
      toast,
      dismissToast,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
