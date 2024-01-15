import React from 'react';

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const About = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Box my={12} px={2}>
      <Paper elevation={3} sx={{ p: 2, mx: 'auto', maxWidth: 'md' }}>
        <Container maxWidth="md">
          <Box mt={4} mb={6} display="flex" flexDirection="column" alignItems="center">
            <Image
              src="/about_me.jpg"
              alt="Kristen Shull's Artwork"
              width={isMobile ? 300 : 480}
              height={isMobile ? 146.25 : 234}
            />
            <br />
            <br />
            <Typography variant="h4" gutterBottom>
              Kristen Shull
            </Typography>
            <Typography variant="subtitle1" align="center">
              Comic Artist & Educator in Burlington, Vermont
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            Kristen Shull is a comic artist and educator residing in Burlington, Vermont.
          </Typography>
          <Typography variant="body1" paragraph>
            She is a graduate of the Center for Cartoon Studies masters program class of 2020.
          </Typography>
          <Typography variant="body1" paragraph>
            Since then, she has been teaching Sequential Art at Champlain College since 2021.
          </Typography>
          <Typography variant="body1" paragraph>
            Her comics are also featured bi-monthly in the state-wide free newspaper, Seven Days.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Self-Published Works
          </Typography>
          <Typography variant="body1" paragraph>
            Her self-published works include Ego Gala, a four-paneled diary comic kept daily for
            three years that have been compiled into three books (2019, 2020, and 2021).
          </Typography>

          <Typography variant="h6" gutterBottom>
            Co-editor of Fantology
          </Typography>
          <Typography variant="body1" paragraph>
            Kristen is also the co-editor of Fantology with friend and fellow CCS alum, Emily Zea.
          </Typography>
          <Typography variant="body1" paragraph>
            Fantology is a fantasy comic anthology featuring an average of 16 artists per issue with
            all fantasy comics set in the same world.
          </Typography>
          <Typography variant="body1" paragraph>
            Fantology boasts three self-published issues, Issue One: Origins, Issue Two: Flora and
            Fauna, and Issue Three: Treasure.
          </Typography>

          <Divider />

          <Box mt={4} mb={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Kristen
            </Typography>
            <Typography variant="body1">
              Follow Kristen&apos;s comics on{' '}
              <Link href="https://instagram.com/ego_gala" target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
              .
            </Typography>
            <Typography variant="body1">
              For professional inquiries, email{' '}
              <Link href="mailto:k10.shull@gmail.com">k10.shull@gmail.com</Link>.
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default About;
