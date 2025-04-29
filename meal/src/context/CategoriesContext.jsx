// src/context/CategoriesContext.js
import React, { createContext, useState } from 'react';
import { availableCategories as initialCategories } from '../data/dummy-data';

export const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories);

  const addCategory = (newCategory) => {
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}
