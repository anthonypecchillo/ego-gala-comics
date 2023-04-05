import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import GridSection from '../components/GridSection';
import NewsletterForm from '../components/NewsletterForm';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

const Index: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
        <GlobalStyle />
        <Navbar />
        <Hero />
        <GridSection />
        <NewsletterForm />
        <Footer />
      {/* </Router> */}
    </ThemeProvider>
  );
};

export default Index;
