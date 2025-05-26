import { createContext } from 'react';

export const FilterContext = createContext({
  mobileFiltersOpen: false,
  setMobileFiltersOpen: () => {}
});