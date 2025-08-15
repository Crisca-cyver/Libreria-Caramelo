import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when reaching success page
    clearCart();
  }, [clearCart]);

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
      <Link
        to="/"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Return to Shop
      </Link>
    </div>
  );
}

