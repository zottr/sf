import {
  Typography,
  Box,
  useTheme,
  Stack,
  useMediaQuery,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function CollectionLinkItem(props) {
  const theme = useTheme();
  return (
    <Link
      component={RouterLink}
      to={`/collection/${props.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          marginX: '10px',
          width: { xs: '7.5rem' },
          height: { xs: '7.5rem' },
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          borderRadius: '10px',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props?.preview?.replace(
            /\\/g,
            '/'
          )})`,
          backgroundSize: 'cover',
        }}
      >
        <Stack
          // direction="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="heavylabel2"
            sx={{
              color: theme.palette.common.white,
            }}
          >
            Explore
          </Typography>
          <Typography
            variant="heavylabel2"
            sx={{
              color: theme.palette.common.white,
            }}
            align="center"
          >
            {props.name}
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
}

export default CollectionLinkItem;
