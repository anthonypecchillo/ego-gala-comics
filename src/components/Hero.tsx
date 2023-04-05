import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  background-image: url('hero.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 35vh;
`;

const Hero: React.FC = () => {
  return <HeroContainer />;
};

export default Hero;
