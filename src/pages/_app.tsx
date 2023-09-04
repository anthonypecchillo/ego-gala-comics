import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import theme from '../styles/theme';

import '@fontsource/walter-turncoat';
import '@fontsource/patrick-hand-sc';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
