import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Grid, Stack } from '@mui/material';

function ProductImages({ images }) {
  const settings = {
    // dots: images?.length > 1,
    dots: false,
    infinite: images?.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    touchMove: true,
  };

  console.log(images);

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
                height: '250px',
                display: 'block',
                overflow: 'hidden',
                width: '100%',
                objectFit: 'contain',
                alignContent: 'center',
              }}
              src={`${image.preview}?preset=medium`}
              alt={image.name}
            />
          </div>
        ))}
      </Slider>
      <Grid container spacing={1}>
        {images.map((image, index) => (
          <Grid item xs={3}>
            <Box
              component="img"
              key={image.id}
              sx={{
                height: '5rem',
                display: 'block',
                overflow: 'hidden',
                width: '100%',
                objectFit: 'contain',
                alignContent: 'center',
                border: '1px solid grey',
              }}
              src={`${image.preview}?preset=medium`}
              alt={image.name}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductImages;
