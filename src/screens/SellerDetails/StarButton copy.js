// StarButton.js
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFavorites } from '../../context/FavoriteSellerContext';

const StarButton = ({ sellerId }) => {
  const { favoriteSellers, toggleFavorite } = useFavorites();

  const isFavorite = favoriteSellers.includes(sellerId);

  return (
    <Tooltip title="Add to Favorites">
      <IconButton
        onClick={() => toggleFavorite(sellerId)}
        color={isFavorite ? 'warning' : 'default'}
        aria-label="add to favorites"
      >
        {isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default StarButton;
