import React from 'react';

import styled from 'styled-components';

const HeroContainer = styled.div`
  // background-image: url('hero.png');
  // background-color: #b4abd0;
  background: radial-gradient(
    circle at center,
    #f7f6fa,
    #ebe8f1,
    #d9d4e7,
    #8f82a9,
    #4b3f72,
    #352b56,
    #1f2041
  );

  background-size: cover;
  background-position: center;
  width: 100%;
  height: 35vh;
`;

const Hero: React.FC = () => {
  return <HeroContainer />;
};

export default Hero;
