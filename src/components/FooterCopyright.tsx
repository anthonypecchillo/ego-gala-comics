import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FOOTER } from '../constants';

const FooterCopyright = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={6} sm={8}>
      <Typography variant={isMobile ? 'body2' : 'body1'} align="right">
        {!isMobile && FOOTER.COPYRIGHT_TEXT}

        {isMobile &&
          FOOTER.COPYRIGHT_TEXT.split(', ').map((segment, index) => (
            <>
              {segment}
              {index < FOOTER.COPYRIGHT_TEXT.split(', ').length - 1 && ','}
              <br />
            </>
          ))}
      </Typography>
    </Grid>
  );
};

export default FooterCopyright;
