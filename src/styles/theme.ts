import { createTheme } from '@mui/material/styles';

const customColors = {
  primary: '#333',
  secondary: '#a0a',
  darkGrey: '#c0c0c0',
  hoverGrey: '#e0e0e0',
};

const theme = createTheme({
  palette: {
    // primary: {
    //   main: customColors.primary,
    // },
    // secondary: {
    //   main: customColors.secondary,
    // },
  },
  typography: {
    fontFamily: '"Walter Turncoat", "Patrick Hand SC", sans-serif',
  },
});

export default theme;
