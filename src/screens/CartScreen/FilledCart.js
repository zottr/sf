import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import RemoveItemDialog from './RemoveItemDialog';
import OrderCheckout from '../OrderCheckout/OrderCheckout';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './styles.css';
import QuantityButton from '../Product/QuantityButton';

function FilledCart({
  activeOrder,
  addToCart,
  reduceFromCart,
  removeFromCart,
  loading,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);
  const [item, setItem] = React.useState('');

  const handleRemoveItem = (item, remove) => {
    if (remove) removeFromCart(item.id);
    closeDialog();
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = (item) => {
    setItem(item);
    setOpen(true);
  };

  const openCheckout = () => {
    setCheckout(true);
  };

  const completeCheckout = () => {
    setCheckout(false);
    navigate('/order-success');
  };

  const closeCheckout = () => {
    setCheckout(false);
  };

  const handleReduceQuantityFromCart = (id, quantity) => {
    reduceFromCart(id, quantity);
  };

  const handleIncreaseQuantityInCart = (id, quantity) => {
    addToCart(id, quantity);
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Container sx={{ px: 1, mb: 5 }}>
        <Box className="flexCenter" sx={{ mb: 3 }}>
          <Typography variant="h5">Cart</Typography>
        </Box>
        <Stack gap={3}>
          {activeOrder?.lines?.map((orderLine, index) => (
            <React.Fragment key={index}>
              <Grid container alignItems={'flex-start'}>
                <Grid item xs={3}>
                  <Box
                    component={RouterLink}
                    to={`/product/${orderLine?.productVariant?.product?.slug}`}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        aspectRatio: 1,
                        objectFit: 'cover',
                        objectPosition: 'center',
                        border: '1px solid hsl(84, 100%, 50%)',
                      }}
                      src={orderLine.featuredAsset.preview}
                    />
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <Stack
                    gap={1.4}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      pl: 3,
                    }}
                  >
                    <Stack gap={0.2}>
                      <Typography variant="b1" sx={{ wordBreak: 'break-word' }}>
                        {orderLine.productVariant.name}
                      </Typography>
                      <Typography
                        variant="heavyb2"
                        sx={{ wordBreak: 'break-word' }}
                      >
                        ₹
                        {orderLine.quantity *
                          (Number(orderLine.unitPrice ?? 0) / 100)}
                      </Typography>
                    </Stack>
                    <Box sx={{ width: '70%' }}>
                      <QuantityButton
                        quantity={orderLine.quantity}
                        addToCart={() =>
                          handleIncreaseQuantityInCart(
                            orderLine.id,
                            orderLine.quantity
                          )
                        }
                        removeFromCart={() =>
                          handleReduceQuantityFromCart(
                            orderLine.id,
                            orderLine.quantity
                          )
                        }
                        buttonHeight="1.8rem"
                        buttonSize="small"
                        labelVariant="button2"
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="text"
                    sx={{
                      color: 'red',
                    }}
                    onClick={() => {
                      openDialog(orderLine);
                    }}
                  >
                    <RemoveCircleIcon fontSize="small" sx={{ color: 'grey' }} />
                  </Button>
                </Grid>
              </Grid>
              {index < activeOrder?.lines?.length - 1 && (
                <Divider variant="middle" sx={{ marginTop: '5px' }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Container>
      <RemoveItemDialog
        open={open}
        onClose={closeDialog}
        item={item}
        handleItem={handleRemoveItem}
      />
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          height: '70px',
          position: 'fixed',
          bottom: '0',
          left: '0',
          display: 'flex',
        }}
      >
        <Grid container sx={{ px: 2 }}>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              // justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.common.black }}>
              ₹{Number(activeOrder?.total ?? 0) / 100}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              endIcon={
                <ShoppingCartCheckoutIcon
                  sx={{ color: theme.palette.grey[900] }}
                />
              }
              sx={{
                py: 1.3,
                borderRadius: '10px',
                backgroundColor: 'hsl(84, 100%, 50%)',
                '&:hover': {
                  backgroundColor: 'hsl(84, 100%, 50%)',
                },
                '&:focus': {
                  backgroundColor: 'hsl(84, 100%, 50%)',
                },
                '&:active': {
                  backgroundColor: 'hsl(84, 100%, 50%)',
                },
              }}
              onClick={() => {
                openCheckout();
              }}
            >
              <Typography
                variant="label1"
                sx={{ color: theme.palette.grey[900] }}
              >
                Proceed to Buy
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <OrderCheckout
        checkout={checkout}
        completeCheckout={completeCheckout}
        closeCheckout={closeCheckout}
      />
    </>
  );
}

export default FilledCart;
