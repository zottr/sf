import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Banner from './Banner';
import { Container, Grid, Stack } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const banners = [
  {
    title: 'JUST ADD COKE',
    description: 'Make your meals magical!',
    align: 'right',
    color: 'dark',
    image:
      'https://as1.ftcdn.net/v2/jpg/03/16/57/94/1000_F_316579487_B4fgLeqkFrCiGLyZxZYtRr7dzsg3wB6y.jpg',
  },
  {
    title: 'BUY 1 GET 1 FREE',
    description: 'From UBQ by BBQ Nation',
    align: 'right',
    color: 'light',
    image:
      'https://img.freepik.com/premium-photo/italian-pasta-raw-dry-solid-color-background-food-banner-background-empty-place-text_810715-1171.jpg',
  },
  {
    title: 'SUMMER CARNIVAL',
    description: 'Enjoy upto 60% OFF and free delivery!',
    align: 'left',
    color: 'light',
    image:
      'https://png.pngtree.com/background/20210710/original/pngtree-chinese-food-pasta-simple-white-banner-picture-image_1059420.jpg',
  },
  {
    title: 'FLAT 150/- OFF',
    description: 'On amazing delights to enjoy the match!',
    align: 'center',
    color: 'light',
    image:
      'https://img.freepik.com/premium-photo/food-banner-spices-vegetables-herbs-black-stone-background-top-view-free-space-your-text-rustic-style_187166-41581.jpg',
  },
];

function Banners() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = banners.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Grid item xs={12}>
      <Container>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          {banners.map((banner, index) => (
            <Banner
              title={banner.title}
              description={banner.description}
              align={banner.align}
              color={banner.color}
              image={banner.image}
            />
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{}}
        />
      </Container>
    </Grid>
  );
}

export default Banners;
