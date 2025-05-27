import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#FFB300', // Warm Amber
      light: '#FFD54F', // Soft Gold
      dark: '#FF8F00', // Deep Golden
      surface: 'hsl(42, 80%, 90%)', // Light golden cream
      lightsurface: 'hsl(42, 80%, 99%)', // Light golden cream
      contrastText: '#000',
    },
    secondary: {
      main: '#00897B', // Teal
      light: '#4DB6AC', // Soft Aqua
      dark: '#00695C', // Dark Teal
      surface: 'hsl(174, 30%, 90%)', // Cool mint
      lightSurface: 'hsl(174, 30%, 99%)', // Cool mint
      contrastText: '#fff',
    },
    // secondary: {
    //   main: '#8E24AA', // Deep Plum
    //   light: '#BA68C8', // Soft Lavender
    //   dark: '#6A1B9A', // Royal Purple
    //   surface: 'hsl(288, 30%, 92%)', // Pale lilac
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   main: '#6D4C41', // Cocoa Brown
    //   light: '#A1887F', // Muted Clay
    //   dark: '#4E342E', // Dark Chocolate
    //   surface: 'hsl(20, 15%, 15%)', // Earthy dark brown
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   main: '#8E24AA', // Deep Plum
    //   light: '#BA68C8', // Soft Lavender
    //   dark: '#6A1B9A', // Royal Purple
    //   surface: 'hsl(288, 20%, 15%)', // Very dark muted purple
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   main: '#673AB7', // Regal Purple
    //   light: '#9575CD', // Lavender
    //   dark: '#512DA8', // Deep Violet
    //   surface: 'hsl(270, 60%, 90%)', // Soft purple background
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   main: '#F06292', // Coral Pink
    //   light: '#F8BBD0', // Light Blush
    //   dark: '#C2185B', // Raspberry
    //   surface: 'hsl(340, 80%, 90%)', // Soft pink surface
    //   contrastText: '#000',
    // },
    // // primary: {
    //   main: '#ee8300',
    //   light: '#f8c67e',
    //   lightest: '#fdf2df',
    //   dark: '#e87301',
    //   darkest: '#d74a01',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   main: '##b241d1',
    //   light: '#c066d9',
    //   lightest: '#f4e5f8',
    //   dark: '#9416c2',
    //   darkest: '#430ea6',
    //   contrastText: '#000000',
    // },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    error: {
      main: '#fe0000',
      light: '#F1F3F3',
      dark: '#131313',
      contrastText: '#fff',
    },
    warning: {
      main: '#FA7751',
      light: '#FCC54C',
      dark: '#DCDCDC',
      contrastText: '#fff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: '#fff',
      secondary: '#212121',
      disabled: '#5A5858',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#FAFAFA',
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    b1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '0.00938em',
      fontStyle: 'normal',
    },
    lightb1: {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '0.00938em',
      fontStyle: 'normal',
    },
    heavyb1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.00938em',
      fontStyle: 'normal',
    },
    b2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    lightb2: {
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    heavyb2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    b3: {
      fontSize: '0.800rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    lightb3: {
      fontSize: '0.800rem',
      fontWeight: 300,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    heavyb3: {
      fontSize: '0.800rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontStyle: 'normal',
    },
    h1: { fontSize: '6rem', fontWeight: 500 },
    h2: { fontSize: '3.75rem', fontWeight: 600 },
    h3: { fontSize: '3rem', fontWeight: 600 },
    h4: { fontSize: '2.125rem', fontWeight: 700 },
    h5: { fontSize: '1.5rem', fontWeight: 700 },
    h6: { fontSize: '1.25rem', fontWeight: 700 }, //default line height should be 1.25*font-size
    h7: { fontSize: '1.15rem', fontWeight: 700 }, //default line height should be 1.25*font-size
    h8: { fontSize: '1rem', fontWeight: 700 }, //default line height should be 1.25*font-size
    button: undefined,
    button1: {
      fontSize: '1rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans, sans-serif',
      fontOpticalSizing: 'auto',
      fontVariationSettings: "'wdth' 100",
      textTransform: 'none',
    },
    button2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans, sans-serif',
      fontOpticalSizing: 'auto',
      fontVariationSettings: "'wdth' 100",
      textTransform: 'none',
    },
    label1: {
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: 'Noto Sans, sans-serif',
      fontOpticalSizing: 'auto',
      fontVariationSettings: "'wdth' 100",
      textTransform: 'none',
    },
    heavylabel1: {
      fontSize: '1rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans, sans-serif',
      fontOpticalSizing: 'auto',
      fontVariationSettings: "'wdth' 100",
      textTransform: 'none',
    },
    label2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      fontFamily: 'Noto Sans, sans-serif',
      fontOpticalSizing: 'auto',
      fontVariationSettings: "'wdth' 100",
      textTransform: 'none',
    },
    heavylabel2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans, sans-serif',
      fontOpticalSizing: 'auto',
      fontVariationSettings: "'wdth' 100",
      textTransform: 'none',
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 600, // Tablets
      md: 960, // Small laptops
      lg: 1280, // Desktops
      xl: 1920, // Large desktops
    },
  },
  shape: {
    borderRadius: 8,
  },
  // shadows: [
  //   'none',
  //   '0px 1px 3px rgba(0, 0, 0, 0.2)',
  //   '0px 3px 6px rgba(0, 0, 0, 0.3)',
  // ],
  zIndex: {
    appBar: 1100,
    drawer: 1200,
  },
});

export default mainTheme;
