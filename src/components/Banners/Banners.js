// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MobileStepper from '@mui/material/MobileStepper';
// import Banner from './Banner';

// const banners = [
//   {
//     title: 'JUST ADD COKE',
//     description: 'Make your meals magical!',
//     align: 'right',
//     color: 'dark',
//     image:
//       'https://as1.ftcdn.net/v2/jpg/03/16/57/94/1000_F_316579487_B4fgLeqkFrCiGLyZxZYtRr7dzsg3wB6y.jpg',
//   },
//   {
//     title: 'BUY 1 GET 1 FREE',
//     description: 'From UBQ by BBQ Nation',
//     align: 'center',
//     color: 'dark',
//     image:
//       'https://as2.ftcdn.net/v2/jpg/05/92/27/61/1000_F_592276117_pXAIw8Wxw107MGvTMGsQI9l43JCCEqim.jpg',
//   },
//   {
//     title: 'SUMMER CARNIVAL',
//     description: 'Enjoy upto 60% OFF and free delivery!',
//     align: 'left',
//     color: 'light',
//     image:
//       'https://static.vecteezy.com/system/resources/thumbnails/030/033/360/small_2x/burger-fry-souse-banner-free-space-text-mockup-fast-food-top-view-empty-professional-phonography-photo.jpg',
//   },
//   {
//     title: 'FLAT 150/- OFF',
//     description: 'On amazing delights to enjoy the match!',
//     align: 'center',
//     color: 'dark',
//     image:
//       'https://t4.ftcdn.net/jpg/03/41/36/41/360_F_341364196_0OQg9iqaP3Yrwqh7owRnH3VL5Kpauppl.jpg',
//   },
// ];

// function Banners() {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = banners.length;

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <AutoPlaySwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//       >
//         {banners.map((banner, index) => (
//           <Banner
//             title={banner.title}
//             description={banner.description}
//             align={banner.align}
//             color={banner.color}
//             image={banner.image}
//           />
//         ))}
//       </AutoPlaySwipeableViews>
//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         variant="dots"
//         activeStep={activeStep}
//         sx={{ backgroundColor: theme.palette.primary.dark }}
//       />
//     </Box>
//   );
// }

// export default Banners;
