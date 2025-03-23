import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
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
      <Stack gap={3}>
        {activeOrder?.lines?.map((orderLine, index) => (
          <React.Fragment key={index}>
            <Grid
              container
              columnSpacing={1}
              alignItems={'flex-start'}
              sx={{ overflowX: 'hidden', width: '98%', margin: 'auto' }}
            >
              <Grid item xs={3}>
                <Box
                  component={RouterLink}
                  to={`/sampleseller/${orderLine?.productVariant?.product?.slug}`}
                  sx={{ textDecoration: 'none' }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: '80px',
                      height: '80px',
                      overflow: 'hidden',
                      objectFit: 'contain',
                    }}
                    src={orderLine.featuredAsset.preview}
                  />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Stack
                  spacing={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingLeft: '10px',
                  }}
                >
                  <Typography noWrap variant="b2">
                    {orderLine.productVariant.name}
                    <br />₹{Number(orderLine.unitPrice ?? 0) / 100}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button>
                      <RemoveIcon
                        onClick={() =>
                          handleReduceQuantityFromCart(
                            orderLine.id,
                            orderLine.quantity
                          )
                        }
                        sx={{ color: 'red' }}
                        fontSize="small"
                      />
                    </Button>
                    <Typography
                      color="red"
                      variant="b2"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {orderLine.quantity}
                    </Typography>
                    <Button>
                      <AddIcon
                        onClick={() =>
                          handleIncreaseQuantityInCart(
                            orderLine.id,
                            orderLine.quantity
                          )
                        }
                        sx={{ color: 'red' }}
                        fontSize="small"
                      />
                    </Button>
                  </Stack>
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
                  <RemoveCircleIcon fontSize="small" sx={{ color: 'red' }} />
                </Button>
              </Grid>
            </Grid>
            {index < activeOrder?.lines?.length - 1 && (
              <Divider variant="middle" sx={{ marginTop: '5px' }} />
            )}
          </React.Fragment>
        ))}
      </Stack>
      <RemoveItemDialog
        open={open}
        onClose={closeDialog}
        item={item}
        handleItem={handleRemoveItem}
      />
      <Box sx={{ height: '90px' }} />
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          height: '70px',
          position: 'fixed',
          bottom: '0',
          left: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.common.black }}>
          Total ₹{Number(activeOrder?.total ?? 0) / 100}
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
          onClick={() => {
            openCheckout();
          }}
        >
          <Typography variant="button1">Proceed to Buy</Typography>
        </Button>
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
