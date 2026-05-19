import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaTrashAlt, FaShoppingBag } from 'react-icons/fa';
import type { Product } from '../types';

interface CartProps {
  cart?: Product[];
  setCount?: React.Dispatch<React.SetStateAction<number>>;
}

const Cart: React.FC<CartProps> = ({ cart: propCart, setCount }) => {
  const [localCart, setLocalCart] = useState<Product[]>([]);
  
  // Use prop cart if provided, otherwise use local state
  const cart = propCart !== undefined ? propCart : localCart;
  
  useEffect(() => {
    // Only load from localStorage if no prop cart provided
    if (propCart === undefined) {
      const saved = localStorage.getItem('kb_cart_v2');
      if (saved) setLocalCart(JSON.parse(saved));
    }
  }, [propCart]);

  const removeItem = (id: number) => {
    const updated = cart.filter(i => i.id !== id);
    if (propCart !== undefined && setCount) {
      // If using prop cart, update localStorage and notify parent
      localStorage.setItem('kb_cart_v2', JSON.stringify(updated));
      setCount(updated.length);
    } else {
      // If using local state
      setLocalCart(updated);
      localStorage.setItem('kb_cart_v2', JSON.stringify(updated));
    }
  };

  const message = cart.map(i => `• ${i.description}`).join('%0A');
  const waLink = `https://wa.me/918921123759?text=🌸 Enquiry from Kottayam Blooms%0A%0A${message}`;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <FaShoppingBag className="text-3xl text-gray-400" />
        </div>
        <h2 className="font-serif text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add beautiful flowers to get started</p>
        <Link to="/shop" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">Browse Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-6">Your Cart ({cart.length})</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
              <img src={item.image} alt={item.description} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.description}</h3>
                <p className="text-xs text-emerald-600 mt-1">{item.category}</p>
                <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs mt-2 flex items-center gap-1 hover:text-red-600 transition">
                  <FaTrashAlt size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500">Total Items</span>
            <span className="font-bold text-gray-900">{cart.length}</span>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition">
            <FaWhatsapp size={16} /> Request Price on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;