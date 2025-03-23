import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import cartImg from '../../assets/images/emptyCart.svg';
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
          marginTop: '100px',
        }}
      >
        <CustomStack
          sx={{
            height: '110px',
            width: '100%',
          }}
        >
          <Box
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
              height: '90px',
              width: '90px',
              marginTop: '20px',
            }}
            src={cartImg}
          />
        </CustomStack>
        <CustomStack>
          <Typography variant="h5" sx={{ color: theme.palette.grey[900] }}>
            Your cart is empty
          </Typography>
          <Typography variant="heavyb1" sx={{ color: theme.palette.grey[700] }}>
            Fill your cart with amazing items
          </Typography>
        </CustomStack>
        <Button
          component={RouterLink}
          to={'/'}
          variant="outlined"
          sx={{
            mt: 3,
            borderColor: 'hsl(33 100% 36.7%)',
            borderRadius: '25px',
          }}
        >
          <Typography variant="button1" sx={{ color: 'hsl(33 100% 36.7%)' }}>
            Back to shopping
          </Typography>
        </Button>
      </CustomStack>
    </>
  );
}

export default EmptyCart;
