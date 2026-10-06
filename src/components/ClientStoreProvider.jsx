'use client';

import React, { createContext, useContext, useState, useSyncExternalStore, useCallback } from 'react';
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

// External store synchronization for localStorage
const cartListeners = new Set();
const compareListeners = new Set();

function emitCartChange() {
  for (const listener of cartListeners) {
    listener();
  }
}

function emitCompareChange() {
  for (const listener of compareListeners) {
    listener();
  }
}

function subscribeCart(callback) {
  cartListeners.add(callback);
  const onStorage = (e) => {
    if (e.key === (SITE.cartKey || 'mm-cart')) emitCartChange();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  return () => {
    cartListeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

function subscribeCompare(callback) {
  compareListeners.add(callback);
  const onStorage = (e) => {
    if (e.key === 'buggy-compare') emitCompareChange();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  return () => {
    compareListeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

let cachedCartRaw = null;
let cachedCartParsed = [];

function getCartSnapshot() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SITE.cartKey || 'mm-cart') || '[]';
    if (raw !== cachedCartRaw) {
      cachedCartRaw = raw;
      cachedCartParsed = JSON.parse(raw);
    }
    return cachedCartParsed;
  } catch {
    return [];
  }
}

const emptyArray = [];
function getServerSnapshot() {
  return emptyArray;
}

let cachedCompareRaw = null;
let cachedCompareParsed = [];

function getCompareSnapshot() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('buggy-compare') || '[]';
    if (raw !== cachedCompareRaw) {
      cachedCompareRaw = raw;
      cachedCompareParsed = JSON.parse(raw);
    }
    return cachedCompareParsed;
  } catch {
    return [];
  }
}

export default function ClientStoreProvider({ children }) {
  const cart = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerSnapshot);
  const comparedProducts = useSyncExternalStore(subscribeCompare, getCompareSnapshot, getServerSnapshot);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const saveCartToStorage = useCallback((newCart) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SITE.cartKey || 'mm-cart', JSON.stringify(newCart));
        emitCartChange();
      } catch (e) {
        console.error('Failed to save cart:', e);
      }
    }
  }, []);

  const saveCompareToStorage = useCallback((newCompare) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('buggy-compare', JSON.stringify(newCompare));
        emitCompareChange();
      } catch (e) {
        console.error('Failed to save compare list:', e);
      }
    }
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    const currentCart = getCartSnapshot();
    const existing = currentCart.find((item) => item.slug === product.slug);
    let updatedCart;
    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          category: product.category,
          subcategory: product.subcategory,
          image: product.images[0],
          quantity,
        },
      ];
    }
    saveCartToStorage(updatedCart);
    setIsCartOpen(true);
  }, [saveCartToStorage]);

  const updateQuantity = useCallback((slug, newQty) => {
    const currentCart = getCartSnapshot();
    if (newQty <= 0) {
      const updated = currentCart.filter((item) => item.slug !== slug);
      saveCartToStorage(updated);
      return;
    }
    const updated = currentCart.map((item) => (item.slug === slug ? { ...item, quantity: newQty } : item));
    saveCartToStorage(updated);
  }, [saveCartToStorage]);

  const removeFromCart = useCallback((slug) => {
    const currentCart = getCartSnapshot();
    const updated = currentCart.filter((item) => item.slug !== slug);
    saveCartToStorage(updated);
  }, [saveCartToStorage]);

  const clearCart = useCallback(() => {
    saveCartToStorage([]);
  }, [saveCartToStorage]);

  const toggleCompare = useCallback((product) => {
    const currentCompare = getCompareSnapshot();
    const exists = currentCompare.some((p) => p.slug === product.slug);
    if (exists) {
      const updated = currentCompare.filter((p) => p.slug !== product.slug);
      saveCompareToStorage(updated);
      return;
    }
    if (currentCompare.length >= 4) {
      return;
    }
    saveCompareToStorage([...currentCompare, product]);
  }, [saveCompareToStorage]);

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
