import { useEffect } from 'react' //Improved features based on the comments left on Homework 1: added cart toast 
import { useCart } from '../context/useCart'

export default function CartToast() {
  const { toast, dismissToast } = useCart()

  useEffect(() => {
    if (!toast) return undefined

    const timer = setTimeout(dismissToast, 3000)
    return () => clearTimeout(timer)
  }, [toast, dismissToast])

  if (!toast) return null

  return (
    <div className="cart-toast-container" role="alert" aria-live="assertive">
      <div key={toast.id} className="cart-toast show">
        <div className="cart-toast-header">
          <strong>Cart Update</strong>
          <button
            type="button"
            className="cart-toast-close"
            aria-label="Close notification"
            onClick={dismissToast}
          >
            ×
          </button>
        </div>
        <div className="cart-toast-body">{toast.message}</div>
      </div>
    </div>
  )
}
