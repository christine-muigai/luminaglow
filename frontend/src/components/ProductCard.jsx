import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'

export default function ProductCard({ product }) {
  return (
    <Link 
      to={`/products/${product.id}`}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-xs text-gray-500 uppercase">{product.brand}</p>
          </div>
          <p className="text-sm font-medium text-purple-600">${product.price.toFixed(2)}</p>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`h-4 w-4 ${
                  product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">
            {product.rating?.toFixed(1) || 'No reviews'}
          </span>
        </div>
        {product.skin_type && (
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize">
            {product.skin_type}
          </span>
        )}
        <div className="mt-2 flex gap-2">
          {product.is_cruelty_free && (
            <span className="text-xs text-green-600">Cruelty-Free</span>
          )}
          {product.is_vegan && (
            <span className="text-xs text-green-600">Vegan</span>
          )}
        </div>
      </div>
    </Link>
  )
}