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
  Box,
  FormControlLabel,
  Checkbox,
  Badge,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { GET_PLACE_ORDER_METADATA, PLACE_ORDER } from '../../apollo/server';
import CartContext from '../../context/CartContext';
import axiosClient from '../../axiosClient';
import { useLazyQuery, useMutation } from '@apollo/client';
import ErrorPopup from '../../components/ErrorHandling/ErrorPopup';
import ErrorAlert from '../../components/shared/Alerts/ErrorAlert';
import ServiceErrorAlert from '../../components/shared/Alerts/ServiceErrorAlert';
import OrderContext from '../../context/OrderContext';
import { getAdminInfo } from '../../dataLoaders/getAdminInfo';
import { isLocalStorageAvailable } from '../../utils/CommonUtils';

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

  const [saveFormData, setSaveFormData] = useState(true); // checkbox state
  const [fetchedFromStorage, setFetchedFromStorage] = useState(false); // to show badge

  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Add loading state
  const { activeOrder, setActiveOrder } = React.useContext(CartContext);

  const { getOrder } = useContext(OrderContext);

  const [serviceError, setServiceError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const validationErrorMessages = {
    name: 'Enter your name',
    phone: 'Enter your valid phone number',
    address: 'Enter your delivery address',
  };

  const [placeOrder, { error }] = useMutation(PLACE_ORDER, {
    onError: (err) => {
      console.error(err);
    },
  });
  const [fetchPlaceOrderMetadata] = useLazyQuery(GET_PLACE_ORDER_METADATA, {
    onError: (err) => {
      console.error(err);
    },
  });

  const adminId =
    activeOrder?.lines[0]?.productVariant?.product?.customFields?.adminId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[1-9][0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const handleCheckout = async () => {
    //reset error states
    setValidationErrors(() => ({
      name: false,
      phone: false,
      address: false,
    }));
    setServiceError(false);

    if (userData.name === '') {
      setValidationErrors((prev) => ({
        ...prev,
        name: true,
      }));
    }
    if (!isValidPhone(userData.phone)) {
      setValidationErrors((prev) => ({
        ...prev,
        phone: true,
      }));
    }
    if (userData.address === '') {
      setValidationErrors((prev) => ({
        ...prev,
        address: true,
      }));
    }
    if (
      userData.name !== '' &&
      isValidPhone(userData.phone) &&
      userData.address !== ''
    ) {
      setIsPlacingOrder(true);

      // Save or clear localStorage based on checkbox
      if (saveFormData) {
        localStorage.setItem('checkout_form_data', JSON.stringify(userData));
      } else {
        localStorage.removeItem('checkout_form_data');
      }

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

        if (finalOrder?.id) {
          let notificationError = false;
          try {
            await axiosClient.post('admin-user/notify-order', {
              customer: userData.name,
              orderId: finalOrder?.id,
              adminId,
            });
          } catch (error) {
            console.error(error);
            notificationError = true;
            setServiceError(true);
            console.error('Service error set to true'); // add this
            console.error('checkout open state:', checkout);
            if (error.response) {
              console.error('error.response.data:', error.response.data);
            } else if (error.request) {
              console.error('error.request:', error.request);
            } else {
              console.error('error.message:', error.message);
            }
          }
          if (!notificationError) {
            // if (true) {
            console.log('order placed and user notified successfully');
            //setActiveOrder(null);
            //fetch recently placed order
            const fetchedOrder = await getOrder(finalOrder?.code);
            //fetch admin info
            const adminInfo = await getAdminInfo(adminId);
            console.log('fetchedOrder:', fetchedOrder);
            completeCheckout(fetchedOrder, adminInfo);
          }
        }
      } catch (err) {
        console.error('Place order error:', err);
        const gqlErrors = err?.graphQLErrors || [];
        const isSessionError = gqlErrors.some((e) =>
          ['NO_ACTIVE_ORDER_ERROR', 'ALREADY_LOGGED_IN_ERROR'].includes(
            e?.extensions?.code
          )
        );
        if (isSessionError) {
          console.warn('Session is invalid or expired. Resetting...');
          localStorage.removeItem('userToken');
          //Clear cart context
          setActiveOrder(null);
          setServiceError(true);
          return;
        }
        setServiceError(true);
        console.error('checkout open state:', checkout);
      } finally {
        setIsPlacingOrder(false); // Stop loading
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setSaveFormData(checked);
    if (isLocalStorageAvailable())
      localStorage.setItem('checkout_save_form_checkbox', checked);
  };

  console.log('Render check:', { serviceError, isPlacingOrder });
  useEffect(() => {
    console.log('Service error changed:', serviceError);
  }, [serviceError]);

  useEffect(() => {
    if (checkout) {
      // Reset error states when dialog opens
      setServiceError(false);
      setValidationErrors({
        name: false,
        phone: false,
        address: false,
      });

      if (isLocalStorageAvailable()) {
        // Load saved form data
        const savedForm = localStorage.getItem('checkout_form_data');
        const savedCheckbox = localStorage.getItem(
          'checkout_save_form_checkbox'
        );
        console.log('savedForm:', savedForm);
        console.log('savedCheckbox:', savedCheckbox);
        if (savedCheckbox !== null) {
          setSaveFormData(savedCheckbox === 'true');
        }
        if (savedForm) {
          const parsed = JSON.parse(savedForm);
          setUserData(parsed);
          setFetchedFromStorage(true); // show "Edit if needed"
        } else {
          setFetchedFromStorage(false);
        }
      }
    }
  }, [checkout]);

  return (
    <>
      <Dialog
        open={checkout}
        onClose={closeCheckout}
        TransitionComponent={Transition}
      >
        {/* {false && ( */}
        {!serviceError && isPlacingOrder && (
          <DialogContent sx={{ p: 4 }}>
            <DialogContentText id="placing-order">
              <Stack gap={2}>
                <Typography variant="h7" sx={{ color: 'grey.700' }}>
                  Placing your order...
                </Typography>
                <Box className="flexCenter">
                  <CircularProgress
                    thickness={5}
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
              </Stack>
            </DialogContentText>
          </DialogContent>
        )}
        {/* {true && ( */}
        {serviceError && !isPlacingOrder && (
          <DialogContent sx={{ p: 1 }}>
            <DialogContentText id="placing-order">
              <ServiceErrorAlert variant="standard" />
            </DialogContentText>
            <DialogActions sx={{ p: 0 }}>
              <Button onClick={closeCheckout}>
                <Typography variant="button1" sx={{ color: 'secondary.main' }}>
                  CLOSE
                </Typography>
              </Button>
            </DialogActions>
          </DialogContent>
        )}
        {/* {false && ( */}
        {!serviceError && !isPlacingOrder && (
          <>
            <DialogTitle>
              <Typography variant="h6" sx={{ color: 'grey.800' }}>
                Enter your details
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="b1">
                  Please provide your order delivery details
                </Typography>
              </DialogContentText>
              <Stack
                gap={5}
                sx={{
                  display: 'flex',
                  // alignItems: 'center',
                  width: '100%',
                  marginTop: '20px',
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
                  <PersonIcon
                    sx={{ paddingTop: '20px', color: 'secondary.main' }}
                  />
                  <TextField
                    id="name"
                    name="name"
                    label=<Typography variant="b1" sx={{ color: 'grey.700' }}>
                      Name
                    </Typography>
                    variant="standard"
                    value={userData.name}
                    onChange={handleChange}
                    helperText={
                      validationErrors.name && validationErrorMessages.name
                    }
                    error={validationErrors.name}
                    sx={{ width: '80%', input: { color: 'grey.900' } }}
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
                  <LocalPhoneIcon
                    sx={{ paddingTop: '20px', color: 'secondary.main' }}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    label=<Typography variant="b1" sx={{ color: 'grey.700' }}>
                      Whatsapp Number
                    </Typography>
                    variant="standard"
                    value={userData.phone}
                    onChange={handleChange}
                    helperText={
                      validationErrors.phone && validationErrorMessages.phone
                    }
                    error={validationErrors.phone}
                    sx={{ width: '80%', input: { color: 'grey.900' } }}
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
                  <ApartmentIcon
                    sx={{ paddingTop: '20px', color: 'secondary.main' }}
                  />
                  <TextField
                    id="address"
                    name="address"
                    label=<Typography variant="b1" sx={{ color: 'grey.700' }}>
                      Flat Address
                    </Typography>
                    variant="standard"
                    value={userData.address}
                    onChange={handleChange}
                    helperText={
                      validationErrors.address &&
                      validationErrorMessages.address
                    }
                    error={validationErrors.address}
                    sx={{ width: '80%', input: { color: 'grey.900' } }}
                  />
                </Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={saveFormData}
                      onChange={handleCheckboxChange}
                      color="info"
                    />
                  }
                  label={
                    <Typography variant="b1" sx={{ color: 'grey.700' }}>
                      Save form data for faster checkout in the future
                    </Typography>
                  }
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  padding: '20px 40px',
                  mb: '10px',
                  py: 1.3,
                  borderRadius: '25px',
                  backgroundColor: 'primary.main',
                  mr: 1,
                }}
                onClick={handleCheckout}
              >
                <Typography variant="button1" sx={{ color: 'grey.900' }}>
                  Place Order
                </Typography>
              </Button>
              <Button onClick={closeCheckout}>
                <Typography variant="button1" sx={{ color: 'grey.600' }}>
                  Cancel
                </Typography>
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

export default OrderCheckout;
