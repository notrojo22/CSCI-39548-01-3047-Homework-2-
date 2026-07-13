import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function Footer() {
  return (
    <footer>
      <Row className="footer-content g-4">
        <Col md={6} className="footer-section">
          <h3>Operating Hours</h3>
          <p>Monday - Thursday: 4:00 PM - 10:00 PM</p>
          <p>Friday - Saturday: 12:00 PM - 11:00 PM</p>
          <p>Sunday: 12:00 PM - 9:00 PM</p>
        </Col>
        <Col md={6} className="footer-section">
          <h3>Follow Our Journey</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </div>
        </Col>
      </Row>
      <div className="copyright">© 2026 The Daily Crave. All Rights Reserved.</div>
    </footer>
  )
}
