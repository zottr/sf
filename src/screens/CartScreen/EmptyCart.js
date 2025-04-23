import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import cartImg from '../../assets/images/emptyCart.svg';
// import emptyCartImg from '/images/no_items_found.svg';
import emptyCartImg from '/images/empty_cart.svg';
import fireworksImg from '../../assets/images/fireworks.svg';
import styled from '@emotion/styled';

const CustomStack = styled(Stack)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

function EmptyCart() {
  const theme = useTheme();

  return (
    <>
      <CustomStack gap={3}>
        <Box
          component="img"
          sx={{
            height: '300px',
          }}
          src={emptyCartImg}
        />
        <CustomStack>
          <Typography variant="h5" sx={{ color: theme.palette.grey[700] }}>
            Your cart is empty
          </Typography>
          <Typography variant="heavyb1" sx={{ color: theme.palette.grey[600] }}>
            Shop from our collection of amazing products
          </Typography>
        </CustomStack>
        <Button
          component={RouterLink}
          to={'/'}
          variant="contained"
          sx={{
            height: '2.8rem',
            borderRadius: '25px',
            bgcolor: 'primary.light',
          }}
        >
          <Typography variant="button1" sx={{ color: 'grey.800' }}>
            Continue shopping
          </Typography>
        </Button>
      </CustomStack>
    </>
  );
}

export default EmptyCart;
