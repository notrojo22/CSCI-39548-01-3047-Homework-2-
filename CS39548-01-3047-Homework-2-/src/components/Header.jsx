import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#cart', label: 'Cart' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [expanded, setExpanded] = useState(false)

  const handleNavClick = () => {
    setExpanded(false)
  }

  return (
    <header>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="site-navbar"
        variant="dark"
      >
        <Container fluid className="navbar-inner">
          <Navbar.Brand href="#home" className="logo">
            The Daily<span>Crave</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" className="custom-toggle" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto nav-links">
              {navLinks.map((link) => (
                <Nav.Link key={link.href} href={link.href} onClick={handleNavClick}>
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
