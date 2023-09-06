import React from 'react';

import Container from '@mui/material/Container';

import FooterBottom from './FooterBottom';
import FooterSocial from './FooterSocial';

const Footer = () => {
  return (
    <Container component="footer" disableGutters maxWidth={false}>
      <FooterSocial />
      <FooterBottom />
    </Container>
  );
};

export default Footer;
