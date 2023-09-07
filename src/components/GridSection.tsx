import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const GridSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const imageSize = isMobile ? '90vw' : '28vw';

  const gridItems = [
    { href: '/comic', label: 'Comics', image: 'comics2.jpg' },
    { href: '/illustrations', label: 'Illustrations', image: 'illustrations.jpg' },
    { href: '/about', label: 'About', image: 'about.jpg' },
  ];

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
      <Grid container justifyContent="center">
        {gridItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={item.href}
            sx={{ padding: '16px 0px', display: 'flex', justifyContent: 'center' }}
          >
            <Link href={item.href} passHref>
              <Card elevation={0} sx={{ width: imageSize, position: 'relative' }}>
                <CardActionArea
                  sx={{
                    backgroundImage: `url(${item.image})`,
                    height: imageSize,
                    backgroundSize: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                      // backgroundColor: theme.palette.action.hover,
                      // transition: `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={imageSize}
                    image={item.image}
                    title={item.label}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '6%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.78)',
                      padding: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" color={theme.palette.secondary.main}>
                      {item.label}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
    </Box>
  );
};

export default GridSection;

// import React from 'react';

// import { useMediaQuery, useTheme } from '@mui/material';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import Grid from '@mui/material/Grid';
// import Link from 'next/link';

// const GridSection = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const imageSize = isMobile ? '90vw' : '28vw';

//   const gridItems = [
//     { href: '/comic', label: 'Comics', image: 'comics2.jpg' },
//     { href: '/illustrations', label: 'Illustrations', image: 'illustrations.jpg' },
//     { href: '/about', label: 'About', image: 'about.jpg' },
//   ];

//   return (
//     <Box p={2} mb={2}>
//       <Grid container justifyContent="center">
//         {gridItems.map((item) => (
//           <Grid
//             item
//             xs={12}
//             sm={4}
//             key={item.href}
//             sx={{ padding: '16px 0px', display: 'flex', justifyContent: 'center' }}
//           >
//             <Link href={item.href} passHref>
//               <Card elevation={0} sx={{ width: imageSize }}>
//                 <CardActionArea
//                   sx={{
//                     backgroundImage: `url(${item.image})`,
//                     height: imageSize,
//                     backgroundSize: 'cover',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   {item.label}
//                 </CardActionArea>
//               </Card>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default GridSection;
