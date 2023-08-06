// components/About.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import Hero from '../components/Hero';
// import GridSection from '../components/GridSection';
import NewsletterForm from '../components/NewsletterForm';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

const About: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <GlobalStyle />
      <Navbar />
      <div>About page</div>
      {/* <NewsletterForm /> */}
      <Footer />
      {/* </Router> */}
    </ThemeProvider>
  );
};

export default About;
