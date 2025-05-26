import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import ProductFilters from './ProductFilters';

export default function MobileFilters() {
  const { mobileFiltersOpen, setMobileFiltersOpen } = useContext(FilterContext);

  return (
    <div className={`fixed inset-0 z-40 transition-all duration-300 ${mobileFiltersOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black transition-opacity ${mobileFiltersOpen ? 'opacity-50' : 'opacity-0'}`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      
      <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 h-full overflow-y-auto">
          <button 
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <ProductFilters />
        </div>
      </div>
    </div>
  );
}