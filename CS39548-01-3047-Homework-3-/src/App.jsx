import { CartProvider } from './context/CartProvider'
import About from './components/About'
import Cart from './components/Cart'
import CartToast from './components/CartToast'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Cart />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <CartToast />
    </CartProvider>
  )
}

export default App
