import { Grid, Container } from '@mui/material';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import type { AppProps } from 'next/app';
import theme from '../styles/theme';
import GlobalStyle from '../styles/GlobalStyle';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/walter-turncoat';
import '@fontsource/patrick-hand-sc';
import { ThemeProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
