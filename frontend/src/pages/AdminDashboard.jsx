import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminDashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/reviews')
        setReviews(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8000/reviews/${reviewId}`)
      setReviews(reviews.filter(r => r.id !== reviewId))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reviews Management</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {reviews.length === 0 ? (
          <p className="p-6 text-gray-500">No reviews found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {reviews.map(review => (
              <li key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Product ID: {review.product_id}</h3>
                    <div className="flex text-yellow-400 mt-1">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                {review.image_url && (
                  <img 
                    src={review.image_url} 
                    alt="Review" 
                    className="max-w-xs rounded-lg shadow-sm mb-3"
                  />
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}