import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import Login from './authentication/login';
import Register from './authentication/register';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

