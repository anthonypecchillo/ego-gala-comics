import React from 'react';

import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FOOTER } from '../constants';

const FooterSocialHeading = () => {
  const theme = useTheme();

  const headingStyles = {
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    marginBottom: '25px',
  };

  const hrStyles = {
    border: `1px solid ${theme.palette.primary.contrastText}`,
    // borderRadius: '25%',
    color: theme.palette.primary.contrastText,
    margin: '10px auto',
    width: '75%',
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
