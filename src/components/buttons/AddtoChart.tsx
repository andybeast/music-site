import React from 'react';
import { useCart } from '../datasets/CartContext'; // Adjust the import path as needed

interface AddToCartButtonProps {
  item: {
    id: number;
    name: string;
    price: number;
    attribute: string;
  };
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, className = '' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      attribute: item.attribute,
    });
  };

  return (
    <button
      className={`bg-yellow-500 text-black rounded p-2 ${className}`}
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;