import React from 'react';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import qrImage from '../../assets/temp/qr.jpg';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Bhim from '../../assets/logos/svg/bhim.svg';
import Gpay from '../../assets/logos/svg/gpay.svg';
import Paytm from '../../assets/logos/svg/paytm.svg';
import Drawer from '@mui/material/Drawer';

function MakePayment() {
  const [openDrawer, setStateOpenDrawer] = React.useState(false);

  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setStateOpenDrawer(open);
  };

  const DrawerContent = () => (
    <Box sx={{ height: 'auto', width: 'auto' }}>
      <Typography color={theme.palette.common.black}>Hello World!</Typography>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          overflowY: 'scroll',
        }}
      >
        <Typography>Paying to</Typography>
        <Typography>Burger King</Typography>
        <Typography>₹450</Typography>
        <Typography>Banking Name: Rohit Saxena</Typography>
        <Typography>UPI ID: rohitweasley@okhdfcbank</Typography>
        <Typography>UPI Number: 9001062422</Typography>
        <Typography>Pay through any UPI App</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={Bhim}
            alt="bhim"
            sx={{ width: '55px', height: '55px', objectFit: 'contained' }}
          />
          <Box
            component="img"
            src={Gpay}
            alt="gpay"
            sx={{ width: '55px', height: '55px', objectFit: 'contained' }}
          />
          {/* <Box
            component="img"
            src={Phonepe}
            alt="phonepe"
            sx={{ width: '65px', height: '65px', objectFit: 'contained' }}
          /> */}
          <Box
            component="img"
            src={Paytm}
            alt="paytm"
            sx={{ width: '55px', height: '55px', objectFit: 'contained' }}
          />
        </Box>
        <Divider flexItem>OR</Divider>
        <Typography>Scan and pay:</Typography>
        <Box
          component="img"
          src={qrImage}
          sx={{
            height: '300px',
            objectFit: 'contain',
            marginTop: '50px',
          }}
        />
      </Box>
      <Box sx={{ height: '100px' }} />
      <Box
        sx={{
          width: '100%',
          height: '80px',
          marginBottom: '5px',
          position: 'fixed',
          bottom: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          className="seller-chat-button"
          sx={{
            padding: '15px 40px',
            marginY: '10px',
            borderRadius: '30px',
          }}
        >
          <CloudUploadIcon fontSize="medium" sx={{ paddingX: '10px' }} />
          <Typography variant="button">
            <strong>Upload Payment Proof</strong>
          </Typography>
        </Button>
      </Box>
      <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer(false)}>
        <DrawerContent />
      </Drawer>
    </>
  );
}

export default MakePayment;
