import React from 'react';
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
      <GlobalStyle />
      <Navbar />
      <Hero />
      <GridSection />
    </ThemeProvider>
  );
};

export default Index;
