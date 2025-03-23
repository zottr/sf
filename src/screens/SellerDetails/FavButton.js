// StarButton.js
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFavorites } from '../../context/FavoriteSellerContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavButton = ({ sellerId }) => {
  const { favoriteSellers, toggleFavorite } = useFavorites();
  const isFavorite = favoriteSellers.includes(sellerId);

  return (
    // <Tooltip title="Add to Favorites">
    <IconButton
      onClick={() => toggleFavorite(sellerId)}
      color={isFavorite ? 'warning' : 'default'}
      aria-label="add to favorites"
    >
      {isFavorite ? (
        <FavoriteIcon fontSize="medium" />
      ) : (
        <FavoriteBorderIcon fontSize="medium" />
      )}
    </IconButton>
    // </Tooltip>
  );
};

export default FavButton;
