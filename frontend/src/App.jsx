import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import MobileFilters from './components/MobileFilters';
import { FilterContext } from './context/FilterContext';

export default function App() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  return (
    <BrowserRouter>
      <FilterContext.Provider value={{ mobileFiltersOpen, setMobileFiltersOpen }}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          
          <MobileFilters />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </FilterContext.Provider>
    </BrowserRouter>
  );
}