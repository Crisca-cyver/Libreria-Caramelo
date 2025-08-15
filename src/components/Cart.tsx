import React from 'react';
import { Link } from 'react-router-dom';
import { PaymentButton } from './PaymentButton';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  // Prepare items for Stripe checkout
  const checkoutItems = items.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image
  }));

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              
              <span className="w-8 text-center">{item.quantity}</span>
              
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl">${total.toFixed(2)}</span>
        </div>
        
        <PaymentButton items={checkoutItems} />
      </div>
    </div>
  );
}




