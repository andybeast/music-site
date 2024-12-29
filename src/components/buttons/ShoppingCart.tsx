'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import CartPanel from './ShopPanel';

const ShoppingCartLink = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemCount = 3; // Replace this with your dynamic cart item count

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative inline-flex items-center p-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {cartItemCount}
        </span>
      </button>
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ShoppingCartLink;

