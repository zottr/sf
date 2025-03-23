import { Box } from '@mui/material';
import banner from '../../assets/images/image2.jpg';

function StoreBanner() {
  return (
    <Box
      sx={{
        marginBottom: '40px',
        backgroundImage: `url(${banner})`,
        width: '100%',
        height: '150px',
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:
          'inset 0 0 0 1000px rgba(0, 0, 0, 0), inset 0 0 0 1000px theme.palette.common.lightBlack',
      }}
    ></Box>
  );
}

export default StoreBanner;
