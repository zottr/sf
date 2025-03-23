import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import OrderSuccessHeader from './OrderSuccessHeader';
import CheckMark from '../../assets/logos/svg/checkmark.svg';
import CheckMarkCircle from '../../assets/logos/svg/checkmarkCircle.svg';
import UPIIcon from '../../assets/logos/svg/upiIcon.svg';
import CheckMarkThinCircle from '../../assets/logos/svg/checkmarkThinCircle.svg';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SvgIcon from '@mui/material/SvgIcon';
import ReplyIcon from '@mui/icons-material/Reply';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SellerChat from '../SellerChat';

import './styles.css';

function OrderSuccess() {
  const [openChat, setOpenChat] = React.useState(false);

  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  const handleClick = () => {
    console.log('button clicked');
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <OrderSuccessHeader />
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
            marginTop: '50px',
          }}
          src={CheckMarkThinCircle}
        />
        <Typography
          variant="h5"
          // color="green"
          sx={{
            fontWeight: 400,
            fontFamily: 'Kumbh Sans',
          }}
        >
          Order Placed Successfully!
        </Typography>
        <Typography
          variant="caption"
          color="black"
          sx={{
            fontSize: '15px',
            fontFamily: 'Kumbh Sans',
          }}
        >
          Your order ID is 123456
        </Typography>
        <Link to={'/'} /*style={{ textDecoration: 'none' }}*/>
          <Typography
            variant="caption"
            color="black"
            sx={{
              fontSize: '15px',
              fontFamily: 'Kumbh Sans',
              fontWeight: 400,
            }}
          >
            view order details
          </Typography>
        </Link>
        <Typography
          variant="b2"
          color="black"
          sx={{
            fontSize: '16px',
            fontFamily: 'Kumbh Sans',
            fontWeight: 400,
          }}
        >
          Total order amount is <strong>₹800</strong>
        </Typography>
        <Typography
          color="black"
          sx={{
            fontFamily: 'Kumbh Sans',
            fontSize: '15px',
            fontWeight: 400,
          }}
        >
          Use your favourite UPI app to pay for your order
        </Typography>
        <Button
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
            <strong>Make payment of ₹850</strong>
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
        <Typography
          color="black"
          sx={{
            fontFamily: 'Kumbh Sans',
            fontSize: '15px',
            fontWeight: 400,
          }}
        >
          Know latest order status:
        </Typography>
        <Stack
          direction="column"
          alignItems="center"
          gap={1}
          marginTop="20px"
          width="90%"
        >
          <Button
            variant="outlined"
            onClick={handleOpenChat}
            sx={{
              width: '70%',
              marginY: '10px',
              fontWeight: '700',
              paddingY: '12px',
              borderRadius: '30px',
              color: 'hsl(142 70% 49%)',
              border: '1px solid',
            }}
          >
            <WhatsAppIcon fontSize="large" />
            <Typography variant="button" marginLeft="10px">
              <strong>chat with seller</strong>
            </Typography>
          </Button>

          {/* <SellerChat
            open={openChat}
            handleClose={handleCloseChat}
            handleClick={console.log('handle click called')}
          /> */}

          <Button
            variant="outlined"
            sx={{
              width: '70%',
              marginY: '10px',
              fontWeight: '700',
              paddingY: '12px',
              borderRadius: '30px',
              color: 'hsl(142 70% 49%)',
              border: '1px solid',
            }}
          >
            <CallIcon fontSize="large" />
            <Typography variant="button" marginLeft="10px">
              <strong>call seller</strong>
            </Typography>
          </Button>
        </Stack>
        <Typography
          color="black"
          sx={{
            fontFamily: 'Kumbh Sans',
            fontSize: '15px',
            fontWeight: 400,
            marginX: '5px',
            textAlign: 'center',
          }}
        >
          Or, Keep exploring the latest arrivals in the marketplace
        </Typography>
        <Link to={'/'}>
          <Box display="flex" gap={0.5} marginBottom={'100px'}>
            <ReplyIcon sx={{ color: 'black' }} />
            <Typography
              color="black"
              sx={{
                fontSize: '18px',
                fontFamily: 'Kumbh Sans',
                fontWeight: 400,
              }}
            >
              continue shopping
            </Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
}

export default OrderSuccess;
