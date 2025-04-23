import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';

export default function CollectionBreadcrumbs({ name }) {
  return (
    <Breadcrumbs
      sx={{ ml: 1 }}
      separator={
        <NavigateNextIcon fontSize="small" sx={{ color: 'grey.700' }} />
      }
    >
      <Link
        component={RouterLink}
        to={'/'}
        underline="hover"
        sx={{ display: 'flex', alignItems: 'flex-start' }}
        color="inherit"
      >
        <HomeIcon sx={{ mr: 0.5, fontSize: '18px', color: 'grey.700' }} />
        <Typography variant="label2" sx={{ color: 'grey.700' }}>
          Home
        </Typography>
      </Link>
      <Typography variant="label2" sx={{ color: 'grey.700' }}>
        {name}
      </Typography>
    </Breadcrumbs>
  );
}
