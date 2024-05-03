import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinkStyles = {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  };

  const navLinkTextStyles = {
    color: theme.palette.common.white,
    marginRight: '12px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mt: 12,
        mb: 6,
        mx: isMobile ? '16px' : 'auto',
        maxWidth: '700px',
        textAlign: 'center',
        backgroundColor: 'black',
      }}
    >
      <Image
        src="https://ego-gala-comics.s3.us-east-1.amazonaws.com/public/404.jpg"
        alt="404"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '500px',
          padding: '0px 16px',
        }}
        width={5412}
        height={7517}
      />
      <br />
      <br />
      <Typography variant="body1" color="white">
        This is probably your fault.
      </Typography>
      <br />
      <Link href="/" style={navLinkStyles}>
        <Typography variant="body1" sx={navLinkTextStyles}>
          Go back home?
        </Typography>
      </Link>
      <br />
      <br />
    </Paper>
  );
}
