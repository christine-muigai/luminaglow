import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import axios from 'axios'

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/products', {
          params: Object.fromEntries(searchParams)
        })
        setProducts(response.data)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block md:w-1/4">
          <ProductFilters />
        </div>
        
        <div className="md:w-3/4">
          <div className="md:hidden mb-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              Show Filters
            </button>
          </div>
        
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}