import { AppBar, Box, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
function OrderSuccessHeader() {
  const theme = useTheme();

  return (
    <AppBar elevation={0} position="fixed">
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          height: '50px',
        }}
      >
        <Link to={'/'} style={{ marginBottom: '15px', marginLeft: '15px' }}>
          <WestIcon
            fontSize="medium"
            sx={{
              color: 'brown',
              position: 'absolute',
            }}
          />
        </Link>
        <Box sx={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">Order Summary</Typography>
        </Box>
      </Stack>
    </AppBar>
  );
}

export default OrderSuccessHeader;
