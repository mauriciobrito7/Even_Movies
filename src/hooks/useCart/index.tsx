import { CartContextType, CartContext } from '@/context/CartContext';
import { useContext } from 'react';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
