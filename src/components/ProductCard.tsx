import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
      )}
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      {product.description && (
        <p className="mt-2 text-gray-500">{product.description}</p>
      )}
      <div className="mt-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

