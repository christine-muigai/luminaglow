import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 100])

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      <div className="mb-4">
        <label className="block font-medium mb-2">Category</label>
        <select
          value={searchParams.get('category') || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="foundation">Foundation</option>
          <option value="lipstick">Lipstick</option>
          <option value="eyeshadow">Eyeshadow</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => {
              const newMax = parseInt(e.target.value)
              setPriceRange([priceRange[0], newMax])
              handleFilterChange('max_price', newMax)
            }}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Skin Type</label>
        <div className="space-y-2">
          {['dry', 'oily', 'combination', 'sensitive'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="skin_type"
                checked={searchParams.get('skin_type') === type}
                onChange={() => handleFilterChange('skin_type', type)}
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={searchParams.get('cruelty_free') === 'true'}
            onChange={(e) => handleFilterChange('cruelty_free', e.target.checked)}
            className="mr-2"
          />
          Cruelty-Free
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={searchParams.get('vegan') === 'true'}
            onChange={(e) => handleFilterChange('vegan', e.target.checked)}
            className="mr-2"
          />
          Vegan
        </label>
      </div>
    </div>
  )
}