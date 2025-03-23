import {
  Dialog,
  Button,
  TextField,
  Stack,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import Slide from '@mui/material/Slide';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { GET_PLACE_ORDER_METADATA, PLACE_ORDER } from '../../apollo/server';
import CartContext from '../../context/CartContext';
import OrderContext from '../../context/OrderContext';
import { handleError, logError } from '../../context/ErrorContext';
import axiosClient from '../../axiosClient';
import { useLazyQuery, useMutation } from '@apollo/client';
import ErrorPopup from '../../components/ErrorHandling/ErrorPopup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderCheckout({ checkout, completeCheckout, closeCheckout }) {
  const theme = useTheme();
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [errorMessage, setErrorMessage] = useState('');
  const { activeOrder, setActiveOrder } = React.useContext(CartContext);
  const { setOrderCode } = React.useContext(OrderContext);

  const [placeOrder, { error }] = useMutation(PLACE_ORDER, {
    onError: (err) => {
      logError(err); // Log the error
      setErrorMessage(
        'Something went wrong while placing the order. Please try again or contact support.'
      );
    },
  });
  const [fetchPlaceOrderMetadata] = useLazyQuery(GET_PLACE_ORDER_METADATA, {
    onError: (err) => handleError(err),
  });

  const adminId =
    activeOrder?.lines[0]?.productVariant?.product?.customFields?.adminId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const createCustomerInput = {
      firstName: userData.name,
      lastName: '',
      phoneNumber: userData.phone,
      emailAddress: `${userData.phone}-customer@zottr.com`,
    };

    const addressInput = {
      streetLine1: userData.address,
      countryCode: 'IN',
    };

    const updateOrderInput = {
      customFields: {
        adminId: adminId,
        adminStatus: 'new',
      },
    };

    try {
      // Step 1: Fetch shipping and payment methods using batch query
      const { data: methodsData } = await fetchPlaceOrderMetadata();
      if (
        !methodsData?.eligibleShippingMethods?.length ||
        !methodsData?.eligiblePaymentMethods?.length
      ) {
        throw new Error(
          'Failed to fetch shipping or payment methods. Please try again.'
        );
      }

      const shippingMethodId = methodsData.eligibleShippingMethods[0]?.id;
      const paymentMethodCode = methodsData.eligiblePaymentMethods[0]?.code;

      // Step 2: Call the place order mutation with all required data
      const { data: orderData } = await placeOrder({
        variables: {
          updateOrderInput,
          customerInput: createCustomerInput,
          addressInput,
          shippingMethodId: [shippingMethodId],
          paymentInput: {
            method: paymentMethodCode,
            metadata: { test: 'value' },
          },
        },
      });

      const finalOrder = orderData.addPaymentToOrder;
      setOrderCode(finalOrder?.code);
      setActiveOrder(null);

      // Notify the server to send the order to the seller
      axiosClient
        .post('admin-user/notify-order', {
          customer: userData.name,
          orderId: finalOrder?.code,
          adminId,
        })
        .catch(function (error) {
          if (error.response) {
            logError(error.response.data);
          } else if (error.request) {
            logError(error.request);
          } else {
            logError('Error', error.message);
          }
        });

      completeCheckout();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Dialog
        open={checkout}
        onClose={closeCheckout}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ margin: 'auto', color: theme.palette.common.black }}>
          <Typography variant="h6">Order Delivery</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="b1">
              Please provide name, address and contact number
            </Typography>
          </DialogContentText>
          {errorMessage && <ErrorPopup message={errorMessage} />}
          <Stack
            spacing={5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: '10px',
              marginBottom: '10px',
              color: theme.palette.common.black,
            }}
          >
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <PersonIcon sx={{ paddingTop: '20px' }} />
              <TextField
                id="name"
                name="name"
                label=<Typography variant="b2">Customer Name</Typography>
                variant="standard"
                value={userData.name}
                onChange={handleChange}
                sx={{ width: '80%', input: { color: 'black' } }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <LocalPhoneIcon sx={{ paddingTop: '20px' }} />
              <TextField
                id="phone"
                name="phone"
                label=<Typography variant="b2">
                  Phone/Whatsapp Number
                </Typography>
                variant="standard"
                value={userData.phone}
                onChange={handleChange}
                sx={{ width: '80%', input: { color: 'red' } }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <ApartmentIcon sx={{ paddingTop: '20px' }} />
              <TextField
                id="address"
                name="address"
                label=<Typography variant="b2">Flat/House Number</Typography>
                variant="standard"
                value={userData.address}
                onChange={handleChange}
                sx={{ width: '80%', input: { color: 'red' } }}
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            // endIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              padding: '10px 40px',
              marginY: '10px',
              borderRadius: '10px',
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
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Typography variant="button1">Place Order</Typography>
            )}
          </Button>

          <Button onClick={closeCheckout} disabled={isLoading}>
            <Typography variant="button2">Go Back</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderCheckout;
