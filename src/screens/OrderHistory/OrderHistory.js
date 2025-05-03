import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/OrderContext';
import {
  getDateTimeString,
  isLocalStorageAvailable,
} from '../../utils/CommonUtils';
import ErrorAlert from '../../components/shared/Alerts/ErrorAlert';
import noItemsFoundImage from '/images/no_items_found.svg';
import OrderHistoryBreadcrumbs from './OrderHistoryBreadcrumbs';

function OrderHistory() {
  const theme = useTheme();

  const { getSavedOrdersFromLocalStorage } = useContext(OrderContext);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true);
    const fetchedOrders = getSavedOrdersFromLocalStorage();
    if (fetchedOrders) {
      setOrders([...fetchedOrders].reverse()); // Reverse orders here
      console.log('fetchedOrders:', fetchedOrders);
    }
    setLoading(false);
  }, [getSavedOrdersFromLocalStorage]);

  const getSellerName = (order) => {
    return (
      order?.lines[0]?.productVariant?.product?.customFields?.adminName ??
      'Dummy Seller'
    );
  };

  const getProducts = (order) => {
    const products = order?.lines?.map((item) => item.productVariant?.name);
    return products.toString().replaceAll(',', ', ');
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <OrderHistoryBreadcrumbs />
      <Container>
        <Stack sx={{ mt: 2 }}>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.grey[800], fontWeight: 'bold' }}
            >
              Your Orders
            </Typography>
          </Box>
          {!isLocalStorageAvailable() ? (
            <Box>
              <ErrorAlert
                title="Your web browser's local storage is disabled"
                description="We store your order history in web browser's storage. Please enable browser storage to use this feature."
                variant="standard"
              />
            </Box>
          ) : (
            <>
              {orders && orders.length < 1 && (
                <Stack
                  gap={4}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 5,
                  }}
                >
                  <Stack sx={{ pt: '50px' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.grey[600],
                        textAlign: 'center',
                      }}
                    >
                      No orders found
                    </Typography>
                    <Typography
                      variant="h7"
                      sx={{
                        color: theme.palette.grey[500],
                        textAlign: 'center',
                      }}
                    >
                      You haven't placed any orders yet.
                    </Typography>
                  </Stack>
                  <Box
                    component="img"
                    sx={{
                      width: '60%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      borderRadius: '10px',
                    }}
                    src={noItemsFoundImage}
                  />
                </Stack>
              )}
              {orders && orders.length > 1 && (
                <Stack>
                  {orders?.map((order, index) => (
                    <Box
                      component={RouterLink}
                      to={`/order/${order.code}`}
                      sx={{ textDecoration: 'none', marginTop: '30px' }}
                    >
                      <Grid container rowSpacing={0.5} alignItems={'center'}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h7"
                            color={theme.palette.grey[700]}
                            sx={{
                              wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                            }}
                          >
                            {getSellerName(order)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="heavyb2"
                            color={theme.palette.grey[600]}
                            sx={{
                              fontStyle: 'italic',
                              wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                            }}
                          >
                            {getDateTimeString(order)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="heavyb1"
                            color={theme.palette.grey[500]}
                          >
                            {getProducts(order)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        flexItem
                        sx={{
                          marginTop: '30px',
                          bgcolor: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default OrderHistory;
