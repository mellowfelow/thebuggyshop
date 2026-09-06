'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import CartDrawer from './CartDrawer';
import ChatHub from './ChatHub';
import { SITE } from '@/src/config/site';

const StoreContext = createContext(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

export default function ClientStoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SITE.cartKey || 'mm-cart');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    return [];
  });

  const [comparedProducts, setComparedProducts] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('buggy-compare');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load compare list:', e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SITE.cartKey || 'mm-cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart:', e);
      }
    }
  }, [cart]);

  // Save compare list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('buggy-compare', JSON.stringify(comparedProducts));
      } catch (e) {
        console.error('Failed to save compare list:', e);
      }
    }
  }, [comparedProducts]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.images[0],
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (slug, newQty) => {
    if (newQty <= 0) {
      removeFromCart(slug);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCompare = (product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.slug === product.slug);
      if (exists) {
        return prev.filter((p) => p.slug !== product.slug);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 buggy models simultaneously.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        comparedProducts,
        toggleCompare,
      }}
    >
      <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#12241D]">
        {/* Skip to Main Content for WCAG 2.2 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:p-3 focus:bg-[#C5A059] focus:text-[#12241D] focus:font-bold focus:rounded-lg focus:shadow-xl"
        >
          Skip to main content
        </a>

        <AnnouncementBar />
        <Nav 
          cartCount={totalCartCount} 
          onOpenCart={() => setIsCartOpen(true)} 
          compareCount={comparedProducts.length} 
        />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <ChatHub />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>
    </StoreContext.Provider>
  );
}
