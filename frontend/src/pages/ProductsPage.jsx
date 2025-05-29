import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import FilterPanel from '../components/FilterPanel'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products')
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleFilter = (filters) => {
    let result = [...products]
    
    if (filters.skinType) {
      result = result.filter(p => p.skin_type === filters.skinType)
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= filters.maxPrice)
    }
    if (filters.crueltyFree) {
      result = result.filter(p => p.is_cruelty_free === true)
    }
    if (filters.vegan) {
      result = result.filter(p => p.is_vegan === true)
    }
    
    setFilteredProducts(result)
  }

  if (loading) return <div className="text-center py-8">Loading products...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterPanel onFilter={handleFilter} />
        </div>
        
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link 
                key={product.id}
                to={`/products/${product.id}`}
                className="hover:no-underline"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}