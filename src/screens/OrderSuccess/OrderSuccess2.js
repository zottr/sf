import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CheckmarkThinCircle from '../../components/common/svg/CheckmarkThinCircle';
import CheckmarkCircle from '../../components/common/svg/CheckmarkCircle';
import ContactSellerDialog from '../../components/common/ContactSellerDialog';

function OrderSuccess2() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  console.log('order:', order);

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container sx={{ px: 3 }}>
        <Stack sx={{ mt: 10 }} gap={2}>
          <Box
            sx={{
              height: '150px',
              color: '#4caf50', // will be passed to SVG as fill
            }}
          >
            <CheckmarkCircle style={{ width: '100%', height: '100%' }} />
          </Box>
          <Typography
            variant="h4"
            sx={{ color: 'success.light', textAlign: 'center' }}
          >
            Order placed Successfully
          </Typography>
          <Stack sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="heavylabel2"
              sx={{ color: 'grey.700', textAlign: 'left' }}
            >
              Date & Time: 12/12/2025 9:00PM
            </Typography>
            <Typography
              variant="heavylabel2"
              sx={{ color: 'grey.700', textAlign: 'left' }}
            >
              Order ID: 12
            </Typography>
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/order/${order.code}`);
            }}
          >
            <Typography variant="button1">View Order Details</Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <Typography variant="button1">Check Order Status</Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <Typography variant="button1">Continue Shopping</Typography>
          </Button>
        </Stack>
      </Container>
      <ContactSellerDialog
        open={openDialog}
        onClose={closeDialog}
        order={order}
      />
    </>
  );
}

export default OrderSuccess2;
