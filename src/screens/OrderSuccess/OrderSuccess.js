import { useContext } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Icon,
  Stack,
  Typography,
} from '@mui/material';
import UPIIcon from '../../assets/logos/svg/upiIcon.svg';
import CheckMarkThinCircle from '../../assets/logos/svg/checkmarkThinCircle.svg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import OrderContext from '../../context/OrderContext';

const CustomButton = styled(Button)(({ theme }) => ({
  width: '70%',
  marginY: '10px', // Equivalent to marginTop and marginBottom
  paddingY: '12px', // Equivalent to paddingTop and paddingBottom
  fontWeight: 700,
  borderRadius: '30px',
  color: 'hsl(142, 70%, 49%)',
  border: '1px solid',
}));

function OrderSuccess() {
  const { order, loading } = useContext(OrderContext);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <CircularProgress size={44} />
        </Box>
      ) : order ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Box
            component="img"
            sx={{
              height: '85px',
              width: '85px',
              objectFit: 'contain',
            }}
            src={CheckMarkThinCircle}
          />
          <Typography variant="h5">Order Placed Successfully!</Typography>
          <Typography variant="subtitle1" color="black">
            Your order number is {order?.code}
          </Typography>
          <Link to={`/order-details/${order?.code}`}>
            <Typography variant="subtitle1" color="black">
              view order details
            </Typography>
          </Link>
          <Typography variant="b1" color="black">
            Total order amount is
            <strong> ₹{Number(order?.totalWithTax ?? 0) / 100}</strong>
          </Typography>
          <Typography variant="subtitle1" color="black">
            Use your favourite UPI app to pay for your order
          </Typography>
          <Button
            component={RouterLink}
            to={`/make-payment`}
            variant="contained"
            sx={{
              width: '70%',
              height: '60px',
              marginY: '10px',
              fontWeight: '700',
              paddingY: '12px',
              border: '1px solid',
              color: 'hsl(26, 100%, 55%)',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="button">
              <strong>
                Make payment of ₹{Number(order?.totalWithTax ?? 0) / 100}
              </strong>
            </Typography>
            <Icon sx={{ fontSize: '25px' }}>
              <Box
                component="img"
                src={UPIIcon}
                alt=""
                sx={{ height: '100%', marginBottom: '10px' }}
              />
            </Icon>
          </Button>
          <Typography variant="subtitle1" color="black">
            Know your order status:
          </Typography>
          <Stack
            direction="column"
            alignItems="center"
            gap={1}
            marginTop="10px"
            width="90%"
          >
            <CustomButton
              component={RouterLink}
              //to={`/seller-chat/${sellerid}`}
              variant="outlined"
            >
              <WhatsAppIcon fontSize="large" />
              <Typography variant="button" marginLeft="10px">
                <strong>chat with seller</strong>
              </Typography>
            </CustomButton>

            <CustomButton variant="outlined">
              <CallIcon fontSize="large" />
              <Typography variant="button" marginLeft="10px">
                <strong>call seller</strong>
              </Typography>
            </CustomButton>
          </Stack>
          <Typography color="black" variant="b1" sx={{ align: 'center' }}>
            Or, Keep exploring the latest arrivals
          </Typography>
          <Link to={'/'}>
            <Box display="flex" gap={0.5} marginBottom={'100px'}>
              <ReplyIcon sx={{ color: 'black' }} />
              <Typography color="black" variant="b1">
                continue shopping
              </Typography>
            </Box>
          </Link>
        </Box>
      ) : (
        <Typography align="center" variant="h6">
          There is no recently placed order. Please refer to order history for
          past order details.
        </Typography>
      )}
    </>
  );
}

export default OrderSuccess;
