import React from 'react';

import Grid from '@mui/material/Grid';

import FooterSocialLink from './FooterSocialLink';
import { FOOTER } from '../constants';

const FooterSocialLinks = () => (
  <Grid item container spacing={2} justifyContent="center" sx={{ marginBottom: 3 }}>
    {FOOTER.LINKS.SOCIAL.map(({ href, iconName, text }) => (
      <FooterSocialLink href={href} iconName={iconName} text={text} key={href} />
    ))}
  </Grid>
);

export default FooterSocialLinks;
