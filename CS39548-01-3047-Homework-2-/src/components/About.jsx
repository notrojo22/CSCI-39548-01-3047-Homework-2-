import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function About() {
  return (
    <section id="about">
      <h2 className="section-title">Our Story</h2>
      <Row className="about-container align-items-center g-4">
        <Col lg={6} className="about-text">
          <h3>Crafting Flavors Since 1956</h3>
          <p>
            Founded by a passionate group of chefs, The Daily Crave began as a
            humble food truck with one mission: serving high quality, memorable
            meals using local, sustainable ingredients.
          </p>
          <p>
            Today, our award-winning restaurant features signature dishes,
            handcrafted cocktails, and a welcoming ambiance designed to make you
            feel right at home.
          </p>
        </Col>
        <Col lg={6} className="about-img">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
            alt="Kitchen Prep"
          />
        </Col>
      </Row>
    </section>
  )
}
