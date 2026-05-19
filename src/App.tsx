import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import type { Product } from './types';

// Fix: Add error handling for lazy imports
const Home = lazy(() => import('./pages/Home').catch(() => ({ default: () => <div>Home Page Error</div> })));
const Cart = lazy(() => import('./pages/Cart').catch(() => ({ default: () => <div>Cart Page Error</div> })));
const Contact = lazy(() => import('./pages/Contact').catch(() => ({ default: () => <div>Contact Page Error</div> })));
const LandingPage = lazy(() => import('./pages/LandingPage').catch(() => ({ default: () => <div>Landing Page Error</div> })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-green-700 animate-spin" />
      <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">Loading...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('kb_cart_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Product[];
        setCart(parsed);
        setCount(parsed.length);
      } catch { /* ignore */ }
    }
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const updated = [...prev, product];
      localStorage.setItem('kb_cart_v2', JSON.stringify(updated));
      setCount(updated.length);
      toast.success('Added to enquiry cart');
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('kb_cart_v2', JSON.stringify(updated));
      setCount(updated.length);
      toast.success('Removed from cart');
      return updated;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="bottom-right" />
      <Nav count={count} onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} cart={cart} onRemove={removeFromCart} />
      <main className="flex-1 pt-[110px] lg:pt-[120px]">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage addToCart={addToCart} setCount={setCount} count={count} />} />
            <Route path="/shop" element={<Home addToCart={addToCart} setCount={setCount} count={count} />} />
            <Route path="/cart" element={<Cart cart={cart} setCount={setCount} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;