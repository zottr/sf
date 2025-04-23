import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Grid } from '@mui/material';
import logo from '/logos/zottr_logo_small2_grey_white.svg';

function ProductImages({ images }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderRef = React.useRef(null);

  const settings = {
    dots: false,
    infinite: images?.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    touchMove: true,
    afterChange: (index) => setCurrentIndex(index), // Sync state on manual scroll
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    sliderRef.current?.slickGoTo(index); // Move main slider
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
      }}
    >
      <Slider {...settings} ref={sliderRef}>
        {images.map((image) => (
          <div key={image.id}>
            <Box
              component="img"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = `${logo}`; // This should exist in /public
              }}
              sx={{
                height: '240px',
                display: 'block',
                width: '100%',
                objectFit: 'contain',
                objectPosition: 'top', // 🟢 Align image to the top inside the container
              }}
              src={`${image.preview}?preset=medium`}
              alt={image.name}
            />
          </div>
        ))}
      </Slider>
      <Container sx={{ px: 2 }}>
        <Grid
          container
          sx={{ mt: 1 }}
          columnSpacing={2}
          rowSpacing={1}
          columns={20}
        >
          {images.map((image, index) => (
            <Grid item xs={4} key={image.id}>
              <Box
                component="img"
                alt={image.name}
                onClick={() => handleThumbnailClick(index)}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = `${logo}`; // This should exist in /public
                }}
                sx={{
                  width: '100%',
                  aspectRatio: 1,
                  objectFit: 'contain',
                  cursor: 'pointer',
                  border:
                    currentIndex === index
                      ? '2px solid #FF8F00' // Active border
                      : '1px solid transparent',
                  borderRadius: '4px',
                  p: 0.3,
                }}
                src={`${image.preview}?preset=thumb`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductImages;
