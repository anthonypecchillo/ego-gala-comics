import '@/styles/globals.css';
import { Grid, Container } from '@mui/material';
import Footer from '../components/Footer'; // Adjust the path to your Footer component
import type { AppProps } from 'next/app';
import NewsletterForm from '@/components/NewsletterForm';

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
