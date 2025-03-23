import React from 'react';
import { Button, Typography, Box, Slide, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewCartSnackbar = ({ open, message }) => {
  const navigate = useNavigate();
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          bottom: '10px',
          zIndex: 1200,
          // boxShadow: 3,
        }}
      >
        <Paper
          sx={{
            backgroundColor: 'primary.main',
            color: 'common.white',
            padding: '8px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '50px',
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
        </Paper>
      </Box>
    </Slide>
  );
};

export default ViewCartSnackbar;
