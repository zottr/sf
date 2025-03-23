import {
  AppBar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import { Link as RouterLink } from 'react-router-dom';

function OrderDetailsHeader(props) {
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
        <Button
          component={RouterLink}
          to={'/order-history'}
          sx={{ position: 'absolute' }}
        >
          <WestIcon
            fontSize="medium"
            sx={{
              color: 'white',
            }}
          />
        </Button>
        <Box sx={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">Order #{props.orderId}</Typography>
        </Box>
      </Stack>
    </AppBar>
  );
}

export default OrderDetailsHeader;
