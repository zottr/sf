import React from 'react';
import { Button, Typography, Box, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewCartSnackbar = ({ open, message }) => {
  const navigate = useNavigate();
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'primary.main',
          color: 'common.white',
          padding: '8px 0',
          position: 'fixed',
          zIndex: 1200,
          bottom: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
        }}
      >
        <Typography sx={{ marginLeft: '10px' }} variant="b1">
          {message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/cart')}
          sx={{ marginLeft: '16px', marginRight: '10px' }}
        >
          <Typography variant="button1">View Cart</Typography>
        </Button>
      </Box>
    </Slide>
  );
};

export default ViewCartSnackbar;
