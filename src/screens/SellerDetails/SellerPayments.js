import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAdminInfo from '../../customhooks/useAdminInfo';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function SellerPayments() {
  const theme = useTheme();
  const query = useParams();
  const navigate = useNavigate();
  const sellerId = query.sellerId;
  const { adminData, loading, error } = useAdminInfo({
    adminId: query.sellerId,
  });
  console.log(adminData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    adminData != null && (
      <Container sx={{ px: 3 }}>
        <Stack gap={3} sx={{ mt: 12 }}>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.grey[900],
                textAlign: 'center',
                fontWeight: '700',
              }}
            >
              Pay via UPI
            </Typography>
            <Typography
              variant="h7"
              sx={{
                color: theme.palette.grey[700],
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              {adminData.businessName}
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(`/seller/${query.sellerId}`);
                }}
                sx={{
                  borderRadius: '25px',
                  bgcolor: 'rgba(249, 191, 59,1)',
                }}
              >
                <Typography variant="button2" color={theme.palette.grey[800]}>
                  visit store
                </Typography>
              </Button>
            </Box>
          </Stack>
          <Stack>
            <Stack gap={0.5}>
              <Typography
                variant="heavylabel2"
                sx={{
                  color: theme.palette.grey[700],
                }}
              >
                Bank Customer Name
              </Typography>
              {adminData.upiName && (
                <TextField
                  multiline
                  value={adminData.upiName}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    marginBottom: 2,
                    '& .MuiOutlinedInput-input': { color: '#333' },
                    bgcolor: 'rgba(0, 0, 255,0.02)',
                  }}
                />
              )}
            </Stack>
            <Stack gap={0.5}>
              <Typography
                variant="heavylabel2"
                sx={{ color: theme.palette.grey[700] }}
              >
                UPI Phone Number
              </Typography>
              {adminData.upiPhone && (
                <TextField
                  fullWidth
                  value={adminData.upiPhone}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ color: theme.palette.grey[600] }}>
                          +91
                        </Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Tooltip title="Copy UPI Number">
                        <IconButton
                          onClick={() =>
                            handleCopy(
                              adminData.upiPhone,
                              'UPI phone number copied to clipboard!'
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
                    bgcolor: 'rgba(0, 0, 255,0.02)',
                  }}
                />
              )}
            </Stack>
            <Stack gap={0.5}>
              <Typography
                variant="heavylabel2"
                sx={{ color: theme.palette.grey[700] }}
              >
                UPI ID
              </Typography>
              {adminData.upiId && (
                <TextField
                  multiline
                  value={adminData.upiId}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <Tooltip title="Copy UPI ID">
                        <IconButton
                          onClick={() =>
                            handleCopy(
                              adminData.upiId,
                              'UPI ID copied to clipboard!'
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
                    bgcolor: 'rgba(0, 0, 255,0.02)',
                  }}
                />
              )}
            </Stack>
            <Stack gap={1}>
              <Typography
                variant="heavylabel2"
                sx={{ color: theme.palette.grey[700] }}
              >
                UPI QR Code
              </Typography>
              {adminData.upiScan && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={adminData.upiScan}
                    alt="QR Code for UPI Payment"
                    sx={{
                      width: '95%',
                      height: 'auto',
                      alignSelf: 'center',
                      border: '1px solid rgb(180,180,180)',
                    }}
                  />
                </Box>
              )}
            </Stack>
          </Stack>
        </Stack>
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
      </Container>
    )
  );
}

export default SellerPayments;
