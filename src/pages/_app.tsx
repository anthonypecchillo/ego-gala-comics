import '@/styles/globals.css';
import { Grid, Container } from '@mui/material';
import Footer from '../components/Footer';
import type { AppProps } from 'next/app';
import theme from '../styles/theme';

import '@fontsource/walter-turncoat';
import '@fontsource/patrick-hand-sc';
import { ThemeProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth={false}>
        <Grid container direction="column" style={{ minHeight: '100vh' }}>
          <Grid item xs style={{ flex: 1 }}>
            <Component {...pageProps} />
          </Grid>
          <br />
          <br />
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
