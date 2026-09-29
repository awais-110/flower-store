"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AtelierProduct, AtelierCurrencyCode } from "../types";

interface ToastInfo {
  id: string;
  title: string;
  message: string;
}

interface AtelierContextType {
  currencyCode: AtelierCurrencyCode;
  wishlist: string[];
  toggleWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;

  quickAddProduct: AtelierProduct | null;
  isQuickAddOpen: boolean;
  openQuickAdd: (product: AtelierProduct) => void;
  closeQuickAdd: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  toasts: ToastInfo[];
  showToast: (title: string, message: string) => void;
  dismissToast: (id: string) => void;
}

const AtelierContext = createContext<AtelierContextType | undefined>(undefined);

export const AtelierProvider: React.FC<{
  children: ReactNode;
  currencyCode?: AtelierCurrencyCode;
}> = ({ children, currencyCode = "eur" }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickAddProduct, setQuickAddProduct] = useState<AtelierProduct | null>(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("atelier_fleur_wishlist");
      if (saved) setWishlist(JSON.parse(saved));
    } catch (e) {
      console.warn("Wishlist load error", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("atelier_fleur_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Wishlist save error", e);
    }
  }, [wishlist]);

  const toggleWishlist = (handle: string) => {
    setWishlist((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    );
  };

  const isInWishlist = (handle: string) => wishlist.includes(handle);

  const openQuickAdd = (product: AtelierProduct) => {
    setQuickAddProduct(product);
    setIsQuickAddOpen(true);
  };

  const closeQuickAdd = () => {
    setIsQuickAddOpen(false);
    setTimeout(() => setQuickAddProduct(null), 300);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const showToast = (title: string, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message }]);
    setTimeout(() => dismissToast(id), 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AtelierContext.Provider
      value={{
        currencyCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickAddProduct,
        isQuickAddOpen,
        openQuickAdd,
        closeQuickAdd,
        isSearchOpen,
        openSearch,
        closeSearch,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
};

export const useAtelier = () => {
  const context = useContext(AtelierContext);
  if (!context) {
    throw new Error("useAtelier must be used within an AtelierProvider");
  }
  return context;
};