import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

import aboutImage from '../../public/about.jpg';
import comicsImage from '../../public/comics2.jpg';
import illustrationsImage from '../../public/illustrations.jpg';

const GridSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const imageSize = isMobile ? '90vw' : '28vw';

  const gridItems = [
    { href: '/comic', label: 'Comics', image: comicsImage },
    { href: '/illustrations', label: 'Illustrations', image: illustrationsImage },
    { href: '/about', label: 'About', image: aboutImage },
  ];

  const gridItemStyles = {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 0px',
  };

  const cardStyles = {
    width: imageSize,
    position: 'relative',
    background: 'transparent',
  };

  const cardActionAreaStyles = {
    height: imageSize,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardBoxOverlayStyles = {
    position: 'absolute',
    bottom: '6%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    color: theme.palette.secondary.main,
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <Box
      p={2}
      mb={2}
      // sx={{
      //   background:
      //     // 'radial-gradient(ellipse at center, #e0e7f1 0%, #5077b2 95%, #31496e 98%, #192e46 100%)',
      //     // 'linear-gradient(#192e46 0%, #5077b2 3%, #e0e7f1 8%, #e0e7f1 92%, #92aacf 97%, #5077b2 100%)',
      //     // 'linear-gradient(#192e46 0%, #31496e 5%, #5077b2 10%, #e0e7f1 16%, #e0e7f1 90%, #92aacf 95%, #5077b2 100%)',
      //     // 'radial-gradient(circle at top left, #f7f5f6, #e0e7f1, #5077b2, #31496e, #192e46)',
      //     `radial-gradient(circle at top left, #f7f5f6, #e0e7f1, #5077b2, #31496e, #192e46), linear-gradient(#192e46 0%, #31496e 5%, #5077b2 10%, #e0e7f1 16%, #e0e7f1 90%, #92aacf 95%, #5077b2 100%)`,
      // }}
    >
      <br />
      <Grid container>
        {gridItems.map((item) => (
          <Grid item xs={12} sm={4} key={item.href} sx={gridItemStyles}>
            <Link href={item.href} passHref>
              <Card sx={cardStyles}>
                <CardActionArea sx={cardActionAreaStyles}>
                  <Image alt={item.label} fill sizes={imageSize} src={item.image} quality={100} />
                  <Box sx={cardBoxOverlayStyles}>
                    <Typography variant="h6">{item.label}</Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <br />
    </Box>
  );
};

export default GridSection;
