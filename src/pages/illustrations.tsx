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
    <Box my={12}>
      {/* Sub-Component: IllustrationsHeader */}
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
        <Typography variant="body1" color={theme.palette.secondary.contrastText} textAlign="center">
          Below you will find an assortment of illustrations I have created that are not bound to
          any particular comic collection.
        </Typography>
        <br />
        <Typography variant="body1" color={theme.palette.secondary.contrastText} textAlign="center">
          I hope you enjoy them!
        </Typography>
      </Container>

      {/* Sub-Component: IllustrationsList */}
      <Grid container justifyContent="center" alignItems="center" direction="column">
        {illustrations.map((illustration) => (
          // Sub-Sub-Component: IllustrationsListItem
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
                      quality={100}
                      width={illustration.width}
                      height={illustration.height}
                      style={{
                        backgroundColor: 'white',
                        boxShadow: theme.shadows[3],
                        width: '100%',
                        height: 'auto',
                        padding: '20px',
                        border: `10px solid ${theme.palette.primary.main}`,
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
                    {/* Sub-Component: SocialShareLinkList */}
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
    </Box>
  );
};

export default Illustrations;
