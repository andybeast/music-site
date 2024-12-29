import React, { useEffect, useState } from 'react';
import { useCart } from '../datasets/CartContext';
import Button from './ShopButton';
import { X } from 'lucide-react';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-zinc-800 shadow-lg border border-zinc-400 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-16 border-b-2 border-yellow-500 pb-2">
          <h2 className="text-2xl font-bold text-yellow-500">Cart</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 bg-yellow-500 rounded-lg" />
          </button>
        </div>
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex justify-between items-center ${
                isVisible ? 'opacity-0 animate-fade-in' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div>
                <h3 className="text-xl font-medium text-yellow-500">{item.name}</h3>
                <p className="text-sm text-yellow-600">{item.attribute}</p>
              </div>
              <div className="text-xl font-medium text-yellow-400">${item.price.toFixed(2)}</div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-64">
          <div className="flex justify-between items-center border-b border-yellow-500 pb-2">
            <span className="text-lg font-bold text-yellow-600">Total</span>
            <span className="text-lg font-bold text-yellow-400">${totalPrice.toFixed(2)}</span>
          </div>
          <Button className="mt-4 w-full text-lg animate-fade-in-1">Checkout</Button>
          <button className="mt-4 w-full bg-yellow-500 text-black rounded" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;