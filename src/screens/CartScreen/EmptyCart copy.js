import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import cartImg from '../../assets/images/emptyCart.svg';
import emptyCartImg from '/images/no_items_found.svg';
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
      <CustomStack
        sx={{
          mt: '20vh',
        }}
        gap={3}
      >
        <CustomStack
          sx={{
            height: '110px',
            width: '100%',
          }}
        >
          {/* <Box
            component="img"
            sx={{
              height: '50px',
              width: '50px',
              position: 'absolute',
            }}
            src={fireworksImg}
          />
          <Box
            component="img"
            sx={{
              height: '100px',
              width: '100px',
              marginTop: '20px',
            }}
            src={cartImg}
          /> */}
          <Box
            component="img"
            sx={{
              height: '200px',
              width: '200px',
              marginTop: '20px',
            }}
            src={emptyCartImg}
          />
        </CustomStack>
        <CustomStack>
          <Typography variant="h5" sx={{ color: theme.palette.grey[700] }}>
            Your cart is empty
          </Typography>
          <Typography variant="heavyb1" sx={{ color: theme.palette.grey[600] }}>
            Browse our collection of amazing products
          </Typography>
        </CustomStack>
        <Button
          component={RouterLink}
          to={'/'}
          variant="contained"
          size="large"
          sx={{
            borderRadius: '25px',
          }}
        >
          <Typography variant="button1" sx={{ color: 'grey.800' }}>
            Back to shopping
          </Typography>
        </Button>
      </CustomStack>
    </>
  );
}

export default EmptyCart;
