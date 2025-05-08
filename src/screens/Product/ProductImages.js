import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Grid, IconButton } from '@mui/material';
import logo from '/logos/zottr_logo_small2_grey_white.svg';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import placeholderLogo from '/logos/zottr_logo_small2_grey_white.svg';

function ProductImages({ images }) {
  console.log('images:', images);
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
    afterChange: (index) => setCurrentIndex(index),
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <Box sx={{ maxWidth: '100%', position: 'relative' }}>
      <Slider {...settings} ref={sliderRef}>
        {images.map((image) => (
          <div key={image.id}>
            <Zoom overlayBgColorEnd="rgba(0,0,0,0.8)">
              <Box
                component="img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${logo}`;
                }}
                sx={{
                  height: '240px',
                  display: 'block',
                  width: '100%',
                  objectFit: 'contain',
                  objectPosition: 'top',
                  cursor: 'zoom-in',
                }}
                src={`${image.preview}?preset=medium`}
                alt={image.name}
              />
            </Zoom>
          </div>
        ))}
      </Slider>

      {images.length === 0 && (
        <Box
          component="img"
          src={placeholderLogo}
          sx={{
            height: '200px',
            display: 'block',
            width: '100%',
            objectFit: 'contain',
            objectPosition: 'top',
            cursor: 'zoom-in',
          }}
        />
      )}

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
                  e.target.onerror = null;
                  e.target.src = `${logo}`;
                }}
                sx={{
                  width: '100%',
                  aspectRatio: 1,
                  objectFit: 'contain',
                  cursor: 'pointer',
                  border:
                    currentIndex === index
                      ? '2px solid #FF8F00'
                      : '1px solid transparent',
                  borderRadius: '4px',
                  p: 0.3,
                }}
                src={`${image.preview}?preset=small`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductImages;
