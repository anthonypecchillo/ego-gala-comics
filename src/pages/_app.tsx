import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import theme from '../styles/theme';

import '@fontsource/walter-turncoat';
import '@fontsource/patrick-hand-sc';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
