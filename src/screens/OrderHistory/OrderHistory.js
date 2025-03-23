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
import { getDateTimeString } from '../../Utils/utils';

function OrderHistory() {
  const theme = useTheme();

  const { getOrdersFromLocalStorage } = useContext(OrderContext);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true);
    const fetchedOrders = getOrdersFromLocalStorage();
    if (fetchedOrders) {
      setOrders([...fetchedOrders].reverse()); // Reverse orders here
    }
    setLoading(false);
  }, [getOrdersFromLocalStorage]);

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
      <Container>
        <Stack spacing={2.5}>
          <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.grey[800], fontWeight: 'bold' }}
            >
              Your Orders
            </Typography>
          </Box>
          {orders && orders.length < 1 && (
            <Stack sx={{ pt: '100px' }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.grey[600], textAlign: 'center' }}
              >
                No orders found
              </Typography>
              <Typography
                variant="heavyb1"
                sx={{ color: theme.palette.grey[500], textAlign: 'center' }}
              >
                You haven't placed any orders yet.
              </Typography>
            </Stack>
          )}
          {orders && orders.length > 1 && (
            <Stack>
              {orders?.map((order, index) => (
                <Box
                  component={RouterLink}
                  to={`/order-details/${order.code}`}
                  sx={{ textDecoration: 'none', marginTop: '30px' }}
                >
                  <Grid container rowSpacing={0.5} alignItems={'center'}>
                    <Grid item xs={6}>
                      <Typography
                        variant="heavyb1"
                        color={theme.palette.grey[800]}
                        sx={{
                          wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                        }}
                      >
                        {getSellerName(order)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="b3"
                        color={theme.palette.grey[700]}
                        sx={{
                          fontStyle: 'italic',
                          wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                        }}
                      >
                        {getDateTimeString(order)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="b2" color={theme.palette.grey[800]}>
                        {getProducts(order)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    flexItem
                    sx={{ marginTop: '30px', bgcolor: theme.palette.grey[200] }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default OrderHistory;
