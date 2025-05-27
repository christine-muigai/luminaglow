import { useState } from 'react'

export default function FilterPanel({ onFilter }) {
  const [filters, setFilters] = useState({
    skinType: '',
    maxPrice: '',
    crueltyFree: false,
    vegan: false
  })

  const skinTypes = ['dry', 'oily', 'combination', 'sensitive', 'normal']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(filters)
  }

  const resetFilters = () => {
    const reset = {
      skinType: '',
      maxPrice: '',
      crueltyFree: false,
      vegan: false
    }
    setFilters(reset)
    onFilter(reset)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filter Products</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Skin Type</label>
          <select
            name="skinType"
            value={filters.skinType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Skin Types</option>
            {skinTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Price ($)</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="No limit"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="crueltyFree"
              checked={filters.crueltyFree}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Cruelty Free Only</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="vegan"
              checked={filters.vegan}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Vegan Only</span>
          </label>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}