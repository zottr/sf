// FavoriteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoriteSellersContext = createContext();

export const useFavorites = () => useContext(FavoriteSellersContext);

export const FavoriteSellerProvider = ({ children }) => {
  const [favoriteSellers, setFavoriteSellers] = useState([]);

  // Load favorites from local storage on initial render
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteSellers')) || [];
    setFavoriteSellers(storedFavorites);
  }, []);

  // Update local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favoriteSellers', JSON.stringify(favoriteSellers));
  }, [favoriteSellers]);

  const toggleFavorite = (sellerId) => {
    setFavoriteSellers(
      (prevFavorites) =>
        prevFavorites.includes(sellerId)
          ? prevFavorites.filter((id) => id !== sellerId) // Remove if already favorite
          : [...prevFavorites, sellerId] // Add if not favorite
    );
  };

  return (
    <FavoriteSellersContext.Provider
      value={{ favoriteSellers, toggleFavorite }}
    >
      {children}
    </FavoriteSellersContext.Provider>
  );
};
