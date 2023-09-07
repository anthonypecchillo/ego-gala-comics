import { createTheme } from '@mui/material/styles';

// mui.com/x/react-date-pickers/base-concepts/#typescript
// import type {} from '@mui/x-date-pickers/themeAugmentation';

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
};

const customColors = {
  black: '#000000',
  white: '#ffffff',
  lightestPurple: '#f7f6fa',
  lightPurple: '#e8e6f1',
  purple: '#4b3f72',
  darkPurple: '#1f2041',
  alabaster: '#f3f5ec',
  beige: '#e0e5d0',
  lime: '#bdf700',
  // lightestBlue: '#e0e7f1',
  // lightBlue: '#5077b2',
  // blue: '#31496e',
  // darkBlue: '#1E2D44',
  lightestBlue: '#e0e7f1',
  lightBlue: '#5077b2',
  blue: '#31496e',
  darkBlue: '#192e46',
  // lightYellow: '#F6F1D4',
  // yellow: '#dfcd65',
  lightYellow: '#f7f0d2',
  yellow: '#eecb6d',
  // yellow: '#FFC857',
  // turquoise: '#119DA4',
  // teal: '#19647E',
};

const rgbBlack = hexToRgb(customColors.black);

const theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    common: {
      black: customColors.black,
      white: customColors.white,
    },
    primary: {
      // main: customColors.purple,
      // light: customColors.lightPurple,
      // dark: customColors.darkPurple,
      // contrastText: customColors.white,
      main: customColors.blue,
      light: customColors.lightBlue,
      dark: customColors.darkBlue,
      contrastText: customColors.white,
    },
    secondary: {
      // main: customColors.alabaster,
      // light: customColors.white,
      // dark: customColors.beige,
      // contrastText: customColors.black,
      main: customColors.yellow,
      light: customColors.lightYellow,
      dark: customColors.beige,
      contrastText: customColors.black,
    },
    error: {
      main: '#d32f2f',
      light: '#e57373',
      dark: '#c62828',
      contrastText: customColors.white,
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: customColors.white,
    },
    info: {
      main: '#bdf700',
      // light: '#c6ff00',
      // dark: '#aeea00',
      contrastText: customColors.black,
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: customColors.white,
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
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    text: {
      primary: `rgba(${rgbBlack}, 0.87)`,
      secondary: `rgba(${rgbBlack}, 0.6)`,
      disabled: `rgba(${rgbBlack}, 0.38)`,
    },
    divider: `rgba(${rgbBlack}, 0.12)`,
    background: {
      paper: customColors.white,
      // default: customColors.lightestPurple,
      default: '#E0E7F1',
      // default: '#fcfbf3',
      // default: customColors.darkBlue,
    },
    action: {
      active: `rgba(${rgbBlack}, 0.54)`,
      hover: `rgba(${rgbBlack}, 0.04)`,
      hoverOpacity: 0.04,
      selected: `rgba(${rgbBlack}, 0.08)`,
      selectedOpacity: 0.08,
      disabled: `rgba(${rgbBlack}, 0.26)`,
      disabledBackground: `rgba(${rgbBlack}, 0.12)`,
      disabledOpacity: 0.38,
      focus: `rgba(${rgbBlack}, 0.12)`,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Walter Turncoat", "Patrick Hand SC", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      // fontFamily: '',
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '',
    },
    h2: {
      // fontFamily: '',
      fontWeight: 300,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      // fontFamily: '',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      // fontFamily: '',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      // fontFamily: '',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    caption: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      // fontFamily: '',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300, // most basic recommended timing
      complex: 375, // this is to be used in complex animations
      enteringScreen: 225, // recommended when something is entering screen
      leavingScreen: 195, // recommended when something is leaving screen
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default theme;
