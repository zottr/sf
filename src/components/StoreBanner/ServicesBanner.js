import { Box, Stack } from '@mui/material';
import banner from '/images/services3.svg';

function ServicesBanner() {
  return (
    <Box
      sx={{
        overflow: 'hidden', // hides any overflow caused by zoom
        width: '100%',
        mr: -1,
        mb: 2,
        height: '120px',
      }}
    >
      <Box
        component="img"
        src={banner}
        alt="homepage banner"
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'top',
          transform: 'scale(1)', // zoom by 10%
          transformOrigin: 'top', // zoom from center
        }}
      />
    </Box>
  );
}

export default ServicesBanner;
