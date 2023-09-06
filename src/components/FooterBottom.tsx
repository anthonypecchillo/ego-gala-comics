import React from 'react';

import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import FooterCopyright from './FooterCopyright';
import FooterLogo from './FooterLogo';

const FooterBottom = () => {
  const theme = useTheme();

  const containerStyles = {
    padding: '24px',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    alignItems: 'center',
  };

  return (
    <Grid container item sx={containerStyles}>
      <FooterLogo />
      <FooterCopyright />
    </Grid>
  );
};

export default FooterBottom;
