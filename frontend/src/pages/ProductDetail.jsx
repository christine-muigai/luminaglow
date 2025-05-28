import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetail() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:8000/products/${productId}`),
          axios.get(`http://localhost:8000/products/${productId}/reviews`)
        ])
        setProduct(productRes.data)
        setReviews(reviewsRes.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [productId])

  const handleNewReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    if (product) {
      const updatedReviews = [...reviews, newReview];
      const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
      setProduct({...product, rating: Math.round(avgRating * 10) / 10});
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>
  if (!product) return <div className="text-center py-8">Product not found</div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600 text-lg mt-1">{product.brand}</p>
            <p className="text-xl text-blue-600 mt-2">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center mt-4">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {product.skin_type} skin
              </span>
              {product.is_cruelty_free && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Cruelty Free
                </span>
              )}
              {product.is_vegan && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Vegan
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
          <ReviewForm onReviewSubmit={handleReviewSubmit} />
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  )
}