import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ActionAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const ActionAlert: React.FC<ActionAlertProps> = ({
  open,
  onClose,
  message,
  severity = 'success',
  duration = 3000, // default to 3 seconds
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ActionAlert;
