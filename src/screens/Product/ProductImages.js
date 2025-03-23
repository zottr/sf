import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductImages({ images }) {
  const settings = {
    dots: images?.length > 1,
    infinite: images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
        marginBottom: images?.length > 1 ? '30px' : '10px',
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={image.id}>
            <Box
              component="img"
              sx={{
                height: 250,
                display: 'block',
                overflow: 'hidden',
                width: '100%',
                objectFit: 'contain',
                alignContent: 'center',
              }}
              src={image.preview}
              alt={image.name}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
}

export default ProductImages;
