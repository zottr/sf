import { Box, Stack } from '@mui/material';
// import banner from '../../assets/images/image2.jpg';
import buyersImage from '../../assets/images/buyers3.svg';
// import deliveryImage from '../../assets/images/buyers8.svg';

function StoreBanner() {
  return (
    // <Box
    //   sx={{
    //     objectFit: 'contain',
    //     marginBottom: '40px',
    //     backgroundImage: `url(${banner})`,
    //     width: '100%',
    //     height: '170px',
    //     backgroundSize: 'cover',
    //     backgroundPositionX: 'center',
    //     backgroundPositionY: 'center',
    //     position: 'relative',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     boxShadow:
    //       'inset 0 0 0 1000px rgba(0, 0, 0, 0), inset 0 0 0 1000px theme.palette.common.lightBlack',
    //   }}
    // ></Box>
    // <Box display="flex" justifyContent="center">
    //   <img
    //     src={banner}
    //     alt="homepage banner"
    //     height="200px"
    //     width="100%"
    //     sx={{ objectFit: 'cover' }}
    //   />
    // </Box>
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box
        sx={{
          overflow: 'hidden', // hides any overflow caused by zoom
          width: '100%',
          // height: '220px',
          // mb: 1,
        }}
      >
        <Box
          component="img"
          src={buyersImage}
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
      {/* <Box
        sx={{
          overflow: 'hidden', // hides any overflow caused by zoom
          width: '100%',
          // height: '220px',
          // mb: 1,
        }}
      >
        <Box
          component="img"
          src={deliveryImage}
          alt="homepage banner"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transform: 'scale(1.2)', // zoom by 10%
            transformOrigin: 'top', // zoom from center
          }}
        />
      </Box> */}
    </Stack>
  );
}

export default StoreBanner;
