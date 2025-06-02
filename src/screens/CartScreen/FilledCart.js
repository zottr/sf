import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
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
import placeholderLogo from '/logos/zottr_logo_small2_grey_white.svg';
import CartContext from '../../context/CartContext';
import WestIcon from '@mui/icons-material/West';

function FilledCart({
  activeOrder,
  addToCart,
  reduceFromCart,
  removeFromCart,
  loading,
  itemBeingRemovedId,
  itemBeingModifiedId,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);
  const [item, setItem] = React.useState('');
  const { setActiveOrder } = React.useContext(CartContext);

  const handleRemoveItem = (item, remove) => {
    if (remove) removeFromCart(item.id);
    while (itemBeingRemovedId !== '') {} //this will let remove-item-dialog close only after item has been removed from cart and itemBeingRemovedId resets to empty string.
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

  const completeCheckout = (order, admin) => {
    setCheckout(false);
    localStorage.removeItem('userToken');
    setActiveOrder(null);
    navigate('/order-success2', {
      state: { order, admin },
    });
  };

  const closeCheckout = () => {
    setCheckout(false);
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
      <Container sx={{ px: 2, mb: 5 }}>
        <Box className="flexCenter" sx={{ mb: 4 }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                sx={{ position: 'absolute', marginLeft: '50px' }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <WestIcon
                  fontSize="medium"
                  sx={{
                    color: 'secondary.main',
                  }}
                />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.grey[800],
                textAlign: 'center',
                margin: 'auto',
                width: '100%',
              }}
            >
              Cart
            </Typography>
          </Stack>
        </Box>
        <Stack gap={3}>
          {activeOrder?.lines?.map((orderLine, index) => (
            <React.Fragment key={index}>
              <Grid container>
                <Grid
                  item
                  xs={5}
                  sx={{
                    width: '100%',
                  }}
                >
                  <Box
                    component={RouterLink}
                    to={
                      orderLine?.productVariant?.product?.customFields
                        .itemType === 'service'
                        ? `/service/${orderLine?.productVariant?.product?.slug}`
                        : `/product/${orderLine?.productVariant?.product?.slug}`
                    }
                    sx={{
                      textDecoration: 'none',
                      width: '100%',
                    }}
                  >
                    <Box
                      component="img"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = `${placeholderLogo}`; // This should exist in /public
                      }}
                      sx={{
                        width: '75%',
                        aspectRatio: 1,
                        objectFit: 'contain',
                        objectPosition: 'center',
                        // border: '1px solid hsl(84, 100%, 50%)',
                        borderRadius: '10px',
                      }}
                      src={`${orderLine.featuredAsset?.preview}?preset=small`}
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
                    <Stack gap={0.5}>
                      <Typography
                        variant="heavyb1"
                        sx={{ wordBreak: 'break-word', color: 'grey.800' }}
                      >
                        {orderLine.productVariant.name}
                      </Typography>
                      <Typography
                        variant="b2"
                        sx={{ wordBreak: 'break-word', color: 'grey.600' }}
                      >
                        {
                          orderLine?.productVariant?.product?.customFields
                            .adminName
                        }
                      </Typography>
                      <Typography
                        variant="heavyb1"
                        sx={{ wordBreak: 'break-word', color: 'grey.900' }}
                      >
                        ₹
                        {orderLine.quantity *
                          (Number(orderLine.unitPrice ?? 0) / 100)}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        width: '100%',
                      }}
                    >
                      <Stack
                        gap={1}
                        direction="row"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <QuantityButton
                          quantity={orderLine.quantity}
                          addToCart={() =>
                            addToCart(orderLine.id, orderLine.quantity)
                          }
                          removeFromCart={() =>
                            reduceFromCart(orderLine.id, orderLine.quantity)
                          }
                          buttonHeight="2rem"
                          buttonSize="medium"
                          labelVariant="button1"
                          itemId={orderLine.id}
                          itemBeingModifiedId={itemBeingModifiedId}
                        />
                        <IconButton
                          onClick={() => {
                            openDialog(orderLine);
                          }}
                        >
                          <DeleteOutlineIcon
                            fontSize="medium"
                            sx={{ color: 'grey.800' }}
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
              {index < activeOrder?.lines?.length - 1 && (
                <Divider variant="middle" sx={{ marginTop: '5px' }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
        <Box sx={{ height: '25px' }} />
      </Container>
      <RemoveItemDialog
        open={open}
        onClose={closeDialog}
        item={item}
        handleItem={handleRemoveItem}
        itemBeingRemovedId={itemBeingRemovedId}
      />
      <Paper
        elevation={20}
        sx={{
          // bgcolor: 'primary.surface',
          width: '100%',
          height: '80px',
          position: 'fixed',
          bottom: '0',
          left: '0',
          display: 'flex',
          borderRadius: '0',
        }}
      >
        <Grid container sx={{ px: 2 }}>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.common.black }}>
              ₹{Number(activeOrder?.total ?? 0) / 100}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // bgcolor: 'yellow',
            }}
          >
            <Button
              variant="contained"
              endIcon={
                <ShoppingCartCheckoutIcon
                  sx={{ color: theme.palette.grey[900] }}
                />
              }
              sx={{
                py: 1.3,
                borderRadius: '25px',
                backgroundColor: 'primary.light',
              }}
              onClick={() => {
                openCheckout();
              }}
            >
              <Typography
                variant="label1"
                sx={{ color: theme.palette.grey[900] }}
              >
                Go to checkout
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
