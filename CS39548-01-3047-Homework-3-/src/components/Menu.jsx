import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useCart } from '../context/useCart'
import { fetchMenuItems } from '../services/api'

export default function Menu() {
  const { addToCart } = useCart()
  const [menuItems, setMenuItems] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false

    fetchMenuItems()
      .then((items) => {
        if (cancelled) return
        setMenuItems(items)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="menu">
      <h2 className="section-title">The Menu</h2>

      {status === 'loading' && <p className="cart-empty">Loading menu…</p>}

      {status === 'error' && (
        <p className="cart-empty">
          Couldn&apos;t load the menu right now. Please make sure the backend
          server is running and try refreshing the page.
        </p>
      )}

      {status === 'ready' && (
        <Row className="menu-grid g-4">
          {menuItems.map((item) => (
            <Col key={item.id} xs={12} sm={6} lg={4}>
              <article className="menu-item h-100">
                <img src={item.image} alt={item.alt} />
                <div className="menu-info">
                  <div className="menu-title-price">
                    <h3>{item.name}</h3>
                    <span className="menu-price">${item.price.toFixed(2)}</span>
                  </div>
                  <p>{item.description}</p>
                  <button
                    type="button"
                    className="btn btn-primary site-btn add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add To Cart
                  </button>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}
