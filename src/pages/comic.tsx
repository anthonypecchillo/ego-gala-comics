import React from 'react';
import { ThemeProvider } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsletterForm from '../components/NewsletterForm';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

const Comic: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <GlobalStyle />
      <Navbar />
      <div>Comics page</div>
      <NewsletterForm />
      <Footer />
      {/* </Router> */}
    </ThemeProvider>
  );
};

export default Comic;
