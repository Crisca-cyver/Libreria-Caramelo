import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Success } from './pages/Success';
import getProducts from './data/products';
import { Product } from './types';

function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { items } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products');
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
          {location.pathname !== '/success' && (
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <CartIcon size={24} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        ) : isCartOpen && location.pathname !== '/success' ? (
          <Cart />
        ) : location.pathname === '/' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/success" element={<Success />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;


