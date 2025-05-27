import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CheckmarkCircle from '../../components/shared/svg/CheckmarkCircle';
import ContactSellerDialog from '../../components/shared/ContactSellerDialog';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ReplyIcon from '@mui/icons-material/Reply';

function OrderSuccess2() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const admin = location.state?.admin;

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container sx={{ px: 3 }}>
        <Stack className="flexCenter" sx={{ mt: 10 }} gap={4}>
          <Stack gap={0.5}>
            <Box
              sx={{
                height: '120px',
                // color: '#4caf50', // will be passed to SVG as fill
                color: 'success.light', // will be passed to SVG as fill
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
          </Stack>
          <Typography
            variant="h7"
            sx={{ color: 'secondary.main', textAlign: 'center' }}
          >
            Order ID {order.id}
          </Typography>
          <Stack className="flexCenter" gap={2} sx={{ width: '100%' }}>
            <Button
              className="flexCenter"
              sx={{
                borderRadius: '25px',
                borderColor: 'secondary.dark',
                width: '90%',
                height: '3rem',
                // bgcolor: 'primary.main',
                '&:hover, &:focus, &:active': {
                  // bgcolor: 'primary.main',
                  borderColor: 'secondary.dark',
                },
              }}
              variant="outlined"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <Typography
                variant="button1"
                sx={{ color: 'secondary.dark', mr: 1 }}
              >
                Check Order Status
              </Typography>
              <QuestionAnswerIcon
                fontSize="small"
                sx={{ color: 'secondary.dark' }}
              />
            </Button>
            <Button
              className="flexCenter"
              variant="outlined"
              onClick={() => {
                navigate(`/order/${order.code}`);
              }}
              sx={{
                borderRadius: '25px',
                borderColor: 'secondary.dark',
                width: '90%',
                height: '3rem',
                // bgcolor: 'primary.light',
                '&:hover, &:focus, &:active': {
                  // bgcolor: 'primary.light',
                  borderColor: 'secondary.dark',
                },
              }}
            >
              <Typography variant="button1" sx={{ color: 'secondary.dark' }}>
                View Order Details
              </Typography>
              <ArrowRightIcon
                sx={{ color: 'secondary.dark', fontSize: '36px' }}
              />
            </Button>
            <Button
              variant="standard"
              className="flexCenter"
              onClick={() => {
                navigate(`/`);
              }}
              sx={{
                borderRadius: '25px',
                borderColor: 'secondary.light',
                width: '90%',
                height: '3rem',
                // bgcolor: 'primary.light',
                '&:hover, &:focus, &:active': {
                  // bgcolor: 'primary.light',
                  borderColor: 'secondary.light',
                },
              }}
            >
              <Typography
                variant="button1"
                sx={{ mr: 1, color: 'primary.dark' }}
              >
                Continue Shopping
              </Typography>
              <ReplyIcon sx={{ color: 'primary.dark' }} />
            </Button>
          </Stack>
        </Stack>
      </Container>
      <ContactSellerDialog
        open={openDialog}
        onClose={closeDialog}
        order={order}
        admin={admin}
      />
    </>
  );
}

export default OrderSuccess2;
