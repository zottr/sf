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
} from '@mui/material';
import React, { useState } from 'react';
import Slide from '@mui/material/Slide';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  ADD_PAYMENT,
  GET_ELIGIBLE_PAYMENT_METHODS,
  GET_ELIGIBLE_SHIPPING_METHODS,
  SET_CUSTOMER_FOR_ORDER,
  SET_ORDER_CUSTOM_FIELDS,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  TRANSITION_TO_ARRANGING_PAYMENT,
} from '../../apollo/server';
import CartContext from '../../context/CartContext';
import OrderContext from '../../context/OrderContext';
import { handleError } from '../../context/ErrorContext';
import axiosClient from '../../axiosClient';

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

  const { activeOrder, setActiveOrder } = React.useContext(CartContext);
  const { setOrderCode } = React.useContext(OrderContext);

  const [addCustomer] = useMutation(SET_CUSTOMER_FOR_ORDER);
  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS);
  const [getEligibleShippingMethods] = useLazyQuery(
    GET_ELIGIBLE_SHIPPING_METHODS
  );
  const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD);
  const [transactionToArrangingPayment] = useMutation(
    TRANSITION_TO_ARRANGING_PAYMENT
  );
  const [getPaymentMethods] = useLazyQuery(GET_ELIGIBLE_PAYMENT_METHODS);
  const [addPaymentToOrder] = useMutation(ADD_PAYMENT);
  const [setCustomFieldsToOrder] = useMutation(SET_ORDER_CUSTOM_FIELDS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckout = async () => {
    const createCustomerInput = {
      firstName: userData.name,
      lastName: '',
      phoneNumber: userData.phone,
      emailAddress: `${userData.phone}@testabc.com`,
    };

    const addressInput = {
      streetLine1: userData.address,
      countryCode: 'IN',
    };

    try {
      //set custom fields to active order
      await setCustomFieldsToOrder({
        variables: {
          input: {
            customFields: {
              adminId:
                activeOrder?.lines[0]?.productVariant?.product?.customFields
                  ?.adminId,
              adminStatus: 'new',
            },
          },
        },
      });

      //Step 1: add customer to order
      await addCustomer({
        variables: {
          input: createCustomerInput,
        },
      });

      //Step 2: set shipping address
      await setShippingAddress({
        variables: {
          input: addressInput,
        },
      });

      //step 3: set eligible shipping methods
      const shippingMethodsResponse = await getEligibleShippingMethods();

      if (shippingMethodsResponse.data.eligibleShippingMethods) {
        const shippingMethodId =
          shippingMethodsResponse.data.eligibleShippingMethods[0]?.id;
        await setShippingMethod({
          variables: {
            id: shippingMethodId,
          },
        });
      } else {
        throw new Error('No shipping method found for this active order');
      }

      //step 3: set eligible payment methods
      const paymentMethodsResponse = await getPaymentMethods();
      if (paymentMethodsResponse.data.eligiblePaymentMethods) {
        const paymentMethodCode =
          paymentMethodsResponse.data.eligiblePaymentMethods[0]?.code;

        //Step 4: transition state
        const response = await transactionToArrangingPayment();
        let finalOrder = await addPaymentToOrder({
          variables: {
            input: { method: paymentMethodCode, metadata: { test: 'value' } },
          },
        });

        if (finalOrder.data) {
          setOrderCode(finalOrder?.data?.addPaymentToOrder?.code);
          setActiveOrder(null);

          const adminId =
            finalOrder?.data?.addPaymentToOrder?.lines[0]?.productVariant
              ?.product?.customFields?.adminId;
          //notify server to send order to seller
          const response = await axiosClient.post(`admin-user/notify-order`, {
            customer: userData?.name,
            orderId: finalOrder?.data?.addPaymentToOrder?.code,
            adminId: adminId,
          });

          completeCheckout();
        } else {
          throw new Error(
            'Something went wrong while placing order, please try again later.'
          );
        }
      } else {
        throw new Error('No payment method found for this active order');
      }
    } catch (err) {
      handleError(err);
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
          <Typography variant="h6">Delivery Instructions</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="b1">
              Please provide delivery address and contact information
            </Typography>
          </DialogContentText>
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
                label="Name"
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
                label="Phone Number"
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
                label="Flat/House Number"
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
            variant="outlined"
            className="place-order-button"
            endIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              padding: '10px 40px',
              marginY: '10px',
              borderRadius: '10px',
            }}
            onClick={handleCheckout}
          >
            <Typography variant="button1">Place Order</Typography>
          </Button>

          <Button onClick={closeCheckout}>
            <Typography variant="button2">Go Back</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderCheckout;
