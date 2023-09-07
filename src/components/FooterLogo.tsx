import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FOOTER } from '../constants';

const FooterLogo = () => (
  <Grid item xs={6} sm={4}>
    <Typography variant="h4" align="left">
      {FOOTER.LOGO_TEXT}
    </Typography>
  </Grid>
);

export default FooterLogo;
