import { useState } from 'react';
import PropTypes from 'prop-types';

export default function FilterPanel({ onFilter }) {
  const [filters, setFilters] = useState({
    skinType: '',
    maxPrice: '',
    crueltyFree: false,
    vegan: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Validate inputs before filtering
      if (filters.maxPrice && isNaN(filters.maxPrice)) {
        throw new Error('Max price must be a number');
      }
      onFilter(filters);
    } catch (error) {
      console.error('Filter error:', error);
      // You can set error state here to display to user
    }
  };

  const resetFilters = () => {
    const reset = {
      skinType: '',
      maxPrice: '',
      crueltyFree: false,
      vegan: false
    };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-3">Filter Products</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Skin Type Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Skin Type</label>
          <select
            name="skinType"
            value={filters.skinType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="dry">Dry</option>
            <option value="oily">Oily</option>
            <option value="combination">Combination</option>
            <option value="sensitive">Sensitive</option>
          </select>
        </div>

        {/* Max Price Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Max Price ($)</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="crueltyFree"
              checked={filters.crueltyFree}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Cruelty Free</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="vegan"
              checked={filters.vegan}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Vegan</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Apply
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
  );
}

FilterPanel.propTypes = {
  onFilter: PropTypes.func.isRequired
};