import React from 'react';
import { Box } from '@mui/material';

interface BannerProps {
  image: string; // URL of the image
  title?: string; // Optional title text overlay
  subtitle?: string; // Optional subtitle text overlay
  height?: number | string; // Optional height
}

const Banner: React.FC<BannerProps> = ({
  image,
  title,
  subtitle,
  height = 80, // Default height for the banner
}) => {
  return (
    <Box
      sx={{
        // position: 'relative',
        height: height,
        width: '100%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 0.5,
        // boxShadow: 1,
        overflow: 'hidden',
        marginBottom: '20px',
      }}
    >
      {/* Overlay for the text */}
      {/* <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        {title && (
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="subtitle1" component="p" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </Box> */}
    </Box>
  );
};

export default Banner;
