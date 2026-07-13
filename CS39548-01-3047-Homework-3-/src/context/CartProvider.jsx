import { useCallback, useMemo, useState } from 'react'
import { CartContext } from './CartContext'
import { placeOrder } from '../services/api'

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)
  const [checkoutStatus, setCheckoutStatus] = useState('idle') // 'idle' | 'submitting' | 'error'

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

  // Sends the current cart to the backend as a new order, persists it to
  // MongoDB, then clears the cart on success.
  const checkout = useCallback(
    async (customer = {}) => {
      if (cart.length === 0) return { success: false, error: 'Cart is empty' }

      setCheckoutStatus('submitting')
      try {
        const order = await placeOrder({
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          grandTotal,
          customer,
        })

        setCheckoutStatus('idle')
        clearCart()
        showToast('Order placed! We\u2019re getting it ready.')
        return { success: true, order }
      } catch (err) {
        setCheckoutStatus('error')
        showToast('Something went wrong placing your order. Please try again.')
        return { success: false, error: err.message }
      }
    },
    [cart, grandTotal, clearCart, showToast],
  )

  const value = useMemo(
    () => ({
      cart,
      grandTotal,
      addToCart,
      decrementItem,
      incrementItem,
      clearCart,
      checkout,
      checkoutStatus,
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
      checkout,
      checkoutStatus,
      toast,
      dismissToast,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
