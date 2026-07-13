import { useCart } from '../context/useCart'

export default function Cart() {
  const { cart, grandTotal, decrementItem, incrementItem, clearCart, checkout, checkoutStatus } =
    useCart()

  const handlePlaceOrder = async () => {
    await checkout()
  }

  return (
    <section id="cart" className="cart-section">
      <h2 className="section-title">Your Order Cart</h2>
      <div className="cart-container">
        {cart.length === 0 ? (
          <p className="cart-empty">
            Your cart is empty. Add delicious food from the menu!
          </p>
        ) : (
          <>
            <div className="cart-table-view d-none d-md-block">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <CartTableRow
                      key={item.id}
                      item={item}
                      onDecrement={decrementItem}
                      onIncrement={incrementItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-mobile-view d-md-none">
              {cart.map((item) => (
                <CartMobileItem
                  key={item.id}
                  item={item}
                  onDecrement={decrementItem}
                  onIncrement={incrementItem}
                />
              ))}
            </div>
          </>
        )}

        <div className="cart-summary">
          <button type="button" className="clear-btn" onClick={clearCart} disabled={cart.length === 0}>
            Clear Entire Cart
          </button>
          <div className="cart-total">
            Grand Total: $<span>{grandTotal.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary site-btn"
            onClick={handlePlaceOrder}
            disabled={cart.length === 0 || checkoutStatus === 'submitting'}
          >
            {checkoutStatus === 'submitting' ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      </div>
    </section>
  )
}

function CartTableRow({ item, onDecrement, onIncrement }) {
  const itemTotal = item.price * item.quantity

  return (
    <tr>
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <div className="qty-controls">
          <button
            type="button"
            className="qty-btn"
            aria-label={`Remove one ${item.name}`}
            onClick={() => onDecrement(item.id)}
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn"
            aria-label={`Add one ${item.name}`}
            onClick={() => onIncrement(item.id)}
          >
            +
          </button>
        </div>
      </td>
      <td>${itemTotal.toFixed(2)}</td>
      <td>
        <button
          type="button"
          className="remove-btn"
          onClick={() => onDecrement(item.id)}
        >
          Remove One
        </button>
      </td>
    </tr>
  )
}

function CartMobileItem({ item, onDecrement, onIncrement }) {
  const itemTotal = item.price * item.quantity

  return (
    <article className="cart-mobile-item">
      <div className="cart-mobile-header">
        <h3>{item.name}</h3>
        <span className="cart-mobile-total">${itemTotal.toFixed(2)}</span>
      </div>
      <div className="cart-mobile-meta">
        <span>${item.price.toFixed(2)} each</span>
        <div className="qty-controls">
          <button
            type="button"
            className="qty-btn"
            aria-label={`Remove one ${item.name}`}
            onClick={() => onDecrement(item.id)}
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn"
            aria-label={`Add one ${item.name}`}
            onClick={() => onIncrement(item.id)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  )
}