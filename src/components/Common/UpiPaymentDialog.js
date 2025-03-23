import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  TextField,
  Snackbar,
  IconButton,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const UpiPaymentDialog = ({
  merchantName,
  upiId,
  qrCodeUrl,
  mobileNumber,
  dialogOpen,
  toggleDialog,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        onClose={toggleDialog}
        fullWidth
        maxWidth="xs" // Adjust width as needed
        PaperProps={{
          sx: {
            position: 'fixed',
            bottom: 0,
            m: 0,
            width: '100%',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            padding: 2,
            height: '60vh', // Ensure it opens with adequate height
            color: 'black',
          },
        }}
      >
        <DialogContent>
          <Typography variant="h5">Pay {merchantName}</Typography>

          {qrCodeUrl && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2,
              }}
            >
              <Box
                component="img"
                src={qrCodeUrl}
                alt="QR Code for UPI Payment"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 200,
                  marginBottom: 2,
                  alignSelf: 'center',
                }}
              />
            </Box>
          )}

          {upiId && (
            <TextField
              fullWidth
              label="UPI ID"
              value={upiId}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy UPI ID">
                    <IconButton
                      onClick={() =>
                        handleCopy(upiId, 'UPI ID copied to clipboard!')
                      }
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-input': { color: '#333' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#aaa' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
                },
              }}
            />
          )}

          {mobileNumber && (
            <TextField
              fullWidth
              label="Mobile Number"
              value={mobileNumber}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title="Copy Mobile Number">
                    <IconButton
                      onClick={() =>
                        handleCopy(
                          mobileNumber,
                          'Mobile number copied to clipboard!'
                        )
                      }
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-input': { color: '#333' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#aaa' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
                },
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default UpiPaymentDialog;
