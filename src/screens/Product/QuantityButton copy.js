import { Button, Typography, Box, useTheme } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function QuantityButton({ quantity, addToCart, removeFromCart }) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '0.5rem',
          border: '1px solid',
          borderColor: theme.palette.secondary.dark,
          borderRadius: 2,
          width: 'fit-content',
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Button onClick={removeFromCart}>
          <RemoveIcon
            sx={{ color: theme.palette.secondary.dark }}
            fontSize="small"
          />
        </Button>
        <Typography
          color={theme.palette.secondary.dark}
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {quantity}
        </Typography>
        <Button onClick={addToCart}>
          <AddIcon
            sx={{ color: theme.palette.secondary.dark }}
            fontSize="small"
          />
        </Button>
      </Box>
    </>
  );
}

export default QuantityButton;
