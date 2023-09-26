// WishlistContext.js

import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistSelected, setIsWishlistSelected] = useState(false);

  const addToWishlist = (item) => {
    console.log('Adding item to wishlist:', item);
    setWishlistItems([...wishlistItems, item]);
  };

  const removeFromWishlist = (item) => {
    const updatedWishlist = wishlistItems.filter(
      (wishlistItem) => wishlistItem.itemName !== item.itemName
    );
    setWishlistItems(updatedWishlist);
  };

  const toggleWishlist = () => {
    setIsWishlistSelected(!isWishlistSelected);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, isWishlistSelected, addToWishlist, removeFromWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
