import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App