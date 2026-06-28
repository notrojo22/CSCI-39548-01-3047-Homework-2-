import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useCart } from '../context/useCart'
import { menuItems } from '../data/menuItems'

export default function Menu() {
  const { addToCart } = useCart()

  return (
    <section id="menu">
      <h2 className="section-title">The Menu</h2>
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
    </section>
  )
}
