import React, { useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import Icon from '../components/Icon';
import { IIllustration } from '../db/models/Illustration';
import { fetchAllIllustrations } from '../services/illustrations';

const Illustrations = () => {
  const theme = useTheme();
  const [illustrations, setIllustrations] = useState<IIllustration[]>([]);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const iconButtonStyles = {
    color: theme.palette.secondary.light,
    // marginRight: '10px',
    '&:hover': {
      // color: theme.palette.info.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'none',
    },
  };

  useEffect(() => {
    const fetchIllustrations = async () => {
      try {
        const response = await fetchAllIllustrations();
        setIllustrations(response);
      } catch (error) {
        console.error('Error fetching illustrations:', error);
      }
    };

    fetchIllustrations();
  }, []);

  return (
    <Grid container my={12} justifyContent="center" alignItems="center" direction="column">
      <Grid item xs={12}>
        <Container
          maxWidth="sm"
          sx={{
            width: isMobile ? '95vw' : '90vw',
            backgroundColor: 'white',
            marginTop: '20px',
            padding: '20px 0px 20px 0px',
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="h3" color={theme.palette.secondary.contrastText} textAlign="center">
            Illustrations
          </Typography>

          <br />

          <Typography
            variant="body1"
            color={theme.palette.secondary.contrastText}
            textAlign="center"
          >
            Below you will find an assortment of illustrations I have created that are not bound to
            any particular comic collection.
          </Typography>

          <br />

          <Typography
            variant="body1"
            color={theme.palette.secondary.contrastText}
            textAlign="center"
          >
            I hope you enjoy them!
          </Typography>
        </Container>
      </Grid>

      {illustrations.map((illustration) => (
        <Grid item xs={12} key={illustration.url}>
          <Container
            maxWidth="md"
            sx={{
              width: isMobile ? '95vw' : '90vw',
              backgroundColor: theme.palette.primary.light,
              marginTop: '20px',
              padding: '20px 0px 20px 0px',
              boxShadow: theme.shadows[3],
            }}
          >
            <Grid container px="10px">
              {/* First Row */}
              <Grid item container py="5px" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6" px="10px" color={theme.palette.secondary.light}>
                    {/* {comic.category === 'diary' ? 'Diary Comic' : comic.title} */}
                    K. Shull
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Typography variant="h6" px="10px" color={theme.palette.secondary.light}>
                    K.Shull
                  </Typography> */}
                </Grid>
              </Grid>

              {/* Second Row */}
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Box sx={{ width: '100%' }}>
                  <Image
                    src={illustration.url}
                    alt={illustration.url}
                    width={illustration.width}
                    height={illustration.height}
                    style={{
                      backgroundColor: 'white',
                      boxShadow: theme.shadows[3],
                      width: '100%',
                      height: 'auto',
                      padding: '2vw',
                      border: `10px solid ${theme.palette.primary.main}`,
                      // border: '5px solid white',
                    }}
                  />
                </Box>
              </Grid>

              {/* Third Row */}
              <Grid item container justifyContent="space-between">
                <Grid item>
                  {/* <Typography variant="h6" px="10px" color={theme.palette.secondary.light}>
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(comic.publication_date))}
                  </Typography> */}
                </Grid>
                <Grid item>
                  <Box>
                    <IconButton sx={iconButtonStyles} component="span">
                      <Icon iconName="Twitter" />
                    </IconButton>
                    <IconButton sx={iconButtonStyles} component="span">
                      <Icon iconName="Facebook" />
                    </IconButton>
                    <IconButton sx={iconButtonStyles} component="span">
                      <Icon iconName="Mail" />
                    </IconButton>
                    <IconButton sx={iconButtonStyles} component="span">
                      <Icon iconName="Copy" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      ))}
    </Grid>
  );
};

export default Illustrations;
