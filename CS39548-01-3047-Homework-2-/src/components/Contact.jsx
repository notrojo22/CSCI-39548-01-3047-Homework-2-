import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Thank you for reaching out! Your message was submitted successfully.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact">
      <h2 className="section-title">Find & Contact Us</h2>
      <Row className="contact-container g-4">
        <Col lg={6}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows={5}
                required
                placeholder="Tell us about your experience..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary site-btn">
              Send Message
            </button>
          </form>
        </Col>
        <Col lg={6} className="map-container">
          <iframe
            title="Restaurant location map"
            src="https://maps.google.com/maps?q=Central%20Park,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            loading="lazy"
          />
        </Col>
      </Row>
    </section>
  )
}
