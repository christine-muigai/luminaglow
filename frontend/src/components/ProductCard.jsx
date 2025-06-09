export default function ProductCard({ product }) {
  console.log("ProductCard product.id:", product.id);
  return (
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.brand}</p>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
            {product.skin_type}
          </span>
          {product.is_cruelty_free && (
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
              Cruelty Free
            </span>
          )}
          {product.is_vegan && (
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
              Vegan
            </span>
          )}
        </div>
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">View Details</span>
        </div>
      </div>
    </div>
  )
}