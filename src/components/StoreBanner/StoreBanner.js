import { Box, Stack } from '@mui/material';
// import banner from '../../assets/images/image2.jpg';
import homeBanner1 from '/images/home_banner_1.svg';
import homeBanner2 from '/images/home_banner_2.svg';
import homeTagline from '/images/tagline100-cropped.svg';

// import deliveryImage from '../../assets/images/buyers8.svg';

function StoreBanner() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // bgcolor: 'hsl(28.2,100%,90.7%)',
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: '100%',
          bgcolor: 'hsl(28.2,100%,90.7%)',
          height: { xs: 230, md: 370 },
        }}
        // sx={{ width: '100%', bgcolor: 'primary.light' }}
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
      <Box
        sx={{
          overflow: 'hidden', // hides any overflow caused by zoom
          width: '100%',
          ml: -1,
          position: 'absolute',
          bottom: -10,
          left: '2%',
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          src={homeTagline}
          alt="homepage banner"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transform: 'scale(0.80)', // zoom by 10%
            transformOrigin: 'top', // zoom from center
            // filter: 'brightness(-4) invert(1)', // Makes dark SVG appear white
          }}
        />
      </Box>
    </Box>
  );
}

export default StoreBanner;
