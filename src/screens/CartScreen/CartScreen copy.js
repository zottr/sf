import CartHeader from './CartHeader';
import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './styles.css';
import CartContext from '../../context/CartContext';
import React from 'react';

function CartScreen() {
  const { cart, updateCart } = React.useContext(CartContext);
  const cartSize = cart.length;

  function addToCart(name, slug, price, preview) {
    updateCart(name, slug, price, preview, 'add');
  }

  function removeFromCart(name, slug, price, preview) {
    updateCart(name, slug, price, preview, 'remove');
  }

  return (
    <>
      <CartHeader />
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: 'white',
          marginTop: '50px',
        }}
      >
        {cart.map((product, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Box
              sx={{
                marginX: '1rem',
                display: 'flex',
                flexDirection: 'row',
                height: '8rem',
                justifyContent: 'space-between',
                marginTop: '5px',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                sx={{
                  height: '90px',
                  width: '60px',
                  overflow: 'hidden',
                  objectFit: 'contain',
                  marginLeft: '1rem',
                }}
                src={product.preview}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '2rem',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{
                    fontWeight: 500,
                    maxWidth: '40',
                  }}
                >
                  {product.name}
                </Typography>
                <Typography variant="b2" color="textSecondary">
                  ₹{Number(product.price ?? 0) / 100}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  <Button
                    onClick={() => {
                      console.log(product.name + ', ' + product.quantity);
                    }}
                  >
                    <RemoveIcon
                      onClick={() => {
                        removeFromCart(
                          product.name,
                          product.slug,
                          product.price,
                          product.preview
                        );
                      }}
                      sx={{ color: 'red' }}
                      fontSize="small"
                    />
                  </Button>
                  <Typography
                    color="red"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    }}
                  >
                    {product.quantity}
                  </Typography>
                  <Button>
                    <AddIcon
                      onClick={() => {
                        addToCart(
                          product.name,
                          product.slug,
                          product.price,
                          product.preview
                        );
                      }}
                      sx={{ color: 'red' }}
                      fontSize="small"
                    />
                  </Button>
                </Box>
              </Box>

              <Button
                variant="text"
                sx={{
                  color: 'red',
                  alignSelf: 'start',
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
            {index < cartSize - 1 && (
              <Divider variant="middle" sx={{ marginTop: '5px' }} />
            )}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ height: '75px' }} />
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          height: '70px',
          position: 'fixed',
          bottom: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500',
            fontSize: '22px',
            paddingBottom: '8px',
            fontFamily: 'Kumbh Sans',
            color: 'black',
          }}
        >
          ₹540
        </Typography>
        <Button
          variant="contained"
          className="place-order-button"
          endIcon={<ShoppingCartCheckoutIcon />}
          sx={{
            padding: '10px 40px',
            marginY: '10px',
            borderRadius: '10px',
          }}
        >
          Place Order
        </Button>
      </Paper>
    </>
  );
}
export default CartScreen;
