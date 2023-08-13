import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GridSection from '../components/GridSection';
import GlobalStyle from '../styles/GlobalStyle';

const Index: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Hero />
      <GridSection />
    </>
  );
};

export default Index;
