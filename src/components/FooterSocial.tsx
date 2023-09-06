import React from 'react';

import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import FooterSocialHeading from './FooterSocialHeading';
import FooterSocialLinks from './FooterSocialLinks';

const FooterSocial = () => {
  const theme = useTheme();

  const containerStyles = {
    padding: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  };

  return (
    <Grid container spacing={2} direction="column" sx={containerStyles}>
      <FooterSocialHeading />
      <FooterSocialLinks />
    </Grid>
  );
};

export default FooterSocial;
