import React from 'react';
import { Box, Button, Typography, Modal, Stack } from '@mui/material';

const ErrorPopup = ({ message, onRetry, onClose }) => {
  return (
    <Modal open={true} onClose={onClose} aria-labelledby="error-popup">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        {/* Error Title */}
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Error
        </Typography>

        {/* Error Message */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          {message}
        </Typography>

        {/* Buttons in a vertical stack */}
        <Stack direction="column" spacing={2}>
          {/* {onRetry && (
            <Button variant="contained" onClick={onRetry}>
              Retry
            </Button>
          )} */}
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ErrorPopup;
