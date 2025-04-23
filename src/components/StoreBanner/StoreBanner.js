import { Box, Stack } from '@mui/material';
// import banner from '../../assets/images/image2.jpg';
import homeBanner1 from '/images/home_banner_1.svg';
import homeBanner2 from '/images/home_banner_2.svg';
// import deliveryImage from '../../assets/images/buyers8.svg';

function StoreBanner() {
  return (
    <Stack
      direction="row"
      sx={{ width: '100%', bgcolor: 'hsl(28.2,100%,90.7%)' }}
      // sx={{ width: '100%' }}
      // sx={{ width: '100%', bgcolor: 'hsl(240, 67%,84%)' }}
    >
      <Box
        sx={{
          overflow: 'hidden', // hides any overflow caused by zoom
          width: '100%',
          mr: -1,
        }}
      >
        <Box
          component="img"
          src={homeBanner1}
          alt="homepage banner"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transform: 'scale(1)', // zoom by 10%
            transformOrigin: 'top', // zoom from center
          }}
        />
      </Box>
      <Box
        sx={{
          overflow: 'hidden', // hides any overflow caused by zoom
          width: '100%',
          ml: -1,
        }}
      >
        <Box
          component="img"
          src={homeBanner2}
          alt="homepage banner"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transform: 'scale(1)', // zoom by 10%
            transformOrigin: 'top', // zoom from center
          }}
        />
      </Box>
    </Stack>
  );
}

export default StoreBanner;
