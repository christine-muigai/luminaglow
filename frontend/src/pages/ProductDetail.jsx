import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { StarIcon } from '@heroicons/react/24/solid'

export default function ProductDetail() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${productId}`)
        setProduct(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>
  if (!product) return <div className="text-center py-8">Product not found</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="aspect-square w-full overflow-hidden bg-gray-100">
              <img
                src={product.image_url || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-500 uppercase">{product.brand}</p>
            <p className="mt-4 text-2xl font-medium text-purple-600">${product.price.toFixed(2)}</p>
            
            <div className="mt-4 flex items-center">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {product.rating?.toFixed(1) || 'No reviews'}
              </span>
            </div>

            {product.skin_type && (
              <span className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize">
                {product.skin_type}
              </span>
            )}

            <div className="mt-4 flex gap-4">
              {product.is_cruelty_free && (
                <span className="text-sm text-green-600">Cruelty-Free</span>
              )}
              {product.is_vegan && (
                <span className="text-sm text-green-600">Vegan</span>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="mt-8">
              <Link to="/" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                &larr; Back to products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}