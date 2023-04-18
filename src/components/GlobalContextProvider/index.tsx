'use client';
import { CartProvider } from '@/context/CartContext';

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
};
