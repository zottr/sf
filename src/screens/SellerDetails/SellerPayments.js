import {
  Box,
  Button,
  CircularProgress,
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
import WestIcon from '@mui/icons-material/West';
import ErrorAlert from '../../components/shared/Alerts/ErrorAlert';

function SellerPayments() {
  const theme = useTheme();
  const query = useParams();
  const navigate = useNavigate();
  const sellerId = query.sellerId;
  const { adminData, loading, error } = useAdminInfo({
    adminId: query.sellerId,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>
      <CircularProgress thickness={4} size={50} />
    </Box>
  ) : (
    adminData != null && (
      <Container sx={{ px: 3 }}>
        <Stack gap={4} sx={{ mt: 1 }}>
          <Stack gap={1} className="flexCenter">
            <Stack
              direction="row"
              className="flexCenter"
              sx={{
                width: '100%',
              }}
            >
              <Box display="flex" sx={{ position: 'absolute', mr: 30 }}>
                <IconButton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <WestIcon
                    fontSize="medium"
                    sx={{
                      color: 'secondary.main',
                    }}
                  />
                </IconButton>
              </Box>
              <Stack>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.grey[900],
                    textAlign: 'center',
                  }}
                >
                  Pay via UPI
                </Typography>
                <Typography
                  variant="heavylabel1"
                  sx={{
                    color: theme.palette.grey[600],
                    textAlign: 'center',
                  }}
                >
                  {adminData.businessName}
                </Typography>
              </Stack>
            </Stack>
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
                  navigate(`/profile/${query.sellerId}`);
                }}
                sx={{
                  borderRadius: '25px',
                  bgcolor: 'primary.main',
                }}
              >
                <Typography variant="button2" color={theme.palette.grey[800]}>
                  visit store
                </Typography>
              </Button>
            </Box>
          </Stack>
          {!adminData.upiName &&
            !adminData.upiPhone &&
            !adminData.upiId &&
            !adminData.upiScan && (
              <Stack className="flexCenter">
                <ErrorAlert
                  title="No UPI payment information available"
                  description={`Contact ${adminData.businessName} directly to get payment details.`}
                  variant="standard"
                />
              </Stack>
            )}
          <Stack gap={1} sx={{ mt: -1 }}>
            {adminData.upiName && (
              <Stack gap={1}>
                <Typography
                  variant="heavylabel2"
                  sx={{
                    color: theme.palette.grey[700],
                  }}
                >
                  Bank Customer Name
                </Typography>
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
              </Stack>
            )}
            {adminData.upiPhone && (
              <Stack gap={1}>
                <Typography
                  variant="heavylabel2"
                  sx={{ color: theme.palette.grey[700] }}
                >
                  UPI Phone Number
                </Typography>
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
                              'UPI Phone Number copied to clipboard'
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
              </Stack>
            )}
            {adminData.upiId && (
              <Stack gap={1}>
                <Typography
                  variant="heavylabel2"
                  sx={{ color: theme.palette.grey[700] }}
                >
                  UPI ID
                </Typography>
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
                              'UPI ID copied to clipboard'
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
              </Stack>
            )}
            {adminData.upiScan && (
              <Stack gap={1}>
                <Typography
                  variant="heavylabel2"
                  sx={{ color: theme.palette.grey[700] }}
                >
                  UPI QR Code
                </Typography>
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
                {/* Download Button */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    // size="large"
                    variant="contained"
                    sx={{
                      mt: 1,
                      height: '2.7rem',
                      width: '90%',
                      borderRadius: '25px',
                      bgcolor: 'secondary.main',
                      '&:hover, &:focus, &:active': {
                        bgcolor: 'secondary.main',
                      },
                    }}
                    onClick={async () => {
                      try {
                        const response = await fetch(adminData.upiScan, {
                          mode: 'cors',
                        });
                        const blob = await response.blob();
                        const blobUrl = window.URL.createObjectURL(blob);

                        const urlParts = adminData.upiScan.split('/');
                        const fileName =
                          urlParts[urlParts.length - 1].split('?')[0];

                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(blobUrl);

                        // ✅ Show snackbar after successful download
                        setSnackbarMessage('QR Code downloaded successfully');
                        setSnackbarOpen(true);
                      } catch (error) {
                        console.error('Failed to download image:', error);
                      }
                    }}
                  >
                    <Typography variant="button1" sx={{ color: 'white' }}>
                      Download QR Code
                    </Typography>
                  </Button>
                </Box>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={<Typography variant="heavyb2">{snackbarMessage}</Typography>}
          action={
            <IconButton color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    )
  );
}

export default SellerPayments;
