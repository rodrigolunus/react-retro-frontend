// src/context/ProductContext.jsx
import  { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  // Guardamos o id do produto que está sendo editado no momento
  const [editingId, setEditingId] = useState(null);

  const startEditing = (id) => setEditingId(id);
  const cancelEditing = () => setEditingId(null);

  return (
    <ProductContext.Provider value={{ editingId, startEditing, cancelEditing }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}