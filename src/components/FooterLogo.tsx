import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FOOTER } from '../constants';

const FooterCopyright = () => (
  <Grid item xs={4} sm={4}>
    <Typography variant="h4" align="left">
      {FOOTER.LOGO_TEXT}
    </Typography>
  </Grid>
);

export default FooterCopyright;
