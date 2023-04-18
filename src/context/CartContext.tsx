'use client';
import { createContext, useReducer } from 'react';
import { CartItem } from './cart.types';
import { CartActionTypes } from './cart.actions';
import cartReducer from './cart.reducer';

export type CartContextType = {
  state: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  const addItem = (item: CartItem) => {
    dispatch({ type: CartActionTypes.ADD_ITEM, payload: item });
  };

  const removeItem = (item: CartItem) => {
    dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: item });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
