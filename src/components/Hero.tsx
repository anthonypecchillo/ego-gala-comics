import React from 'react';

import styled from 'styled-components';

const HeroContainer = styled.div`
  background-size: cover;
  background-position: center;
  // background-position: top left;
  width: 100%;

  // Default background image and height for mobile devices
  background-image: url('Banner_mobile.jpg');
  height: 150.5vw;

  @media (min-width: 600px) {
    background-image: url('Banner_tablet.jpg');
    height: 74.5vh;
  }

  @media (min-width: 900px) {
    background-image: url('Banner_desktop.jpg');
    height: 45.5vw;
    // height: 30.314vw;
  }
`;

const Hero = () => {
  // TODO: Use the priority prop on an <Image> tag here
  return <HeroContainer />;
};

export default Hero;
