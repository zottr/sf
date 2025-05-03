import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';

export default function OrderHistoryBreadcrumbs() {
  return (
    <Breadcrumbs
      sx={{ ml: 1 }}
      separator={
        <NavigateNextIcon fontSize="small" sx={{ color: 'grey.600' }} />
      }
    >
      <Link
        component={RouterLink}
        to={'/'}
        underline="hover"
        sx={{ display: 'flex', alignItems: 'flex-start' }}
        color="inherit"
      >
        <HomeIcon sx={{ mr: 0.5, fontSize: '18px', color: 'grey.600' }} />
        <Typography variant="heavylabel2" sx={{ color: 'grey.600' }}>
          Home
        </Typography>
      </Link>
      <Typography variant="label2" sx={{ color: 'grey.600' }}>
        Your Orders
      </Typography>
    </Breadcrumbs>
  );
}
