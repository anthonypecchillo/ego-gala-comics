import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FOOTER } from '../constants';

const FooterSocialHeading = () => {
  const headingStyles = {
    textAlign: 'center',
    marginBottom: '25px',
  };

  const hrStyles = {
    width: '75%',
    margin: '10px auto',
  };

  return (
    <Grid item container justifyContent="center">
      <Typography variant="h4" gutterBottom sx={headingStyles}>
        {FOOTER.SOCIAL_HEADING}
        <hr style={hrStyles} />
      </Typography>
    </Grid>
  );
};

export default FooterSocialHeading;
