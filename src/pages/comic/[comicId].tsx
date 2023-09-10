import React from 'react';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DiaryCalendar from '../../components/DiaryCalendar';
import Icon from '../../components/Icon';
import { IComic } from '../../db/models/Comic';
import { fetchComic } from '../../services/comics';

interface ComicViewerProps {
  comic: IComic;
}

const ComicViewer = ({ comic }: ComicViewerProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const router = useRouter();
  const panelNumber = Number(router.query.panelNumber) || 1;
  const currentPanel = comic.panels.find((panel) => panel.panel_number === panelNumber);

  const iconButtonStyles = {
    color: theme.palette.secondary.light,
    // marginRight: '10px',
    '&:hover': {
      // color: theme.palette.info.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'none',
    },
  };

  return (
    <Grid container justifyContent="center" my={12}>
      <Grid item xs={12}>
        {currentPanel && (
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
            <Grid container px="10px" direction="column">
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
              <Grid item container justifyContent="center" alignItems="center">
                <Box sx={{ width: '100%' }}>
                  <Image
                    src={currentPanel.image_url}
                    alt={`Panel ${currentPanel.panel_number}`}
                    width={640}
                    height={551}
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
        )}
      </Grid>
      <Grid item xs={12}>
        <Container
          maxWidth="xs"
          sx={{
            width: isMobile ? '95vw' : '90vw',
            backgroundColor: theme.palette.primary.light,
            marginTop: '20px',
            padding: '10px 0px 20px 0px',
            boxShadow: theme.shadows[3],
          }}
        >
          <DiaryCalendar />
        </Container>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const comicId = context.params?.comicId as string;
  const panelNumber = context.query.panelNumber as string;

  try {
    const comic = await fetchComic(comicId);

    if (comic.panels.length === 1 && panelNumber) {
      return {
        redirect: {
          destination: `/comic/${comicId}`,
          permanent: false, // Set to false for temporary redirect
        },
      };
    }

    if (comic.panels.length > 1 && !panelNumber) {
      return {
        redirect: {
          destination: `/comic/${comicId}/001`,
          permanent: false, // Set to false for temporary redirect
        },
      };
    }

    return { props: { comic } };
  } catch (error) {
    // console.error('Error fetching comic:', error);
    return { notFound: true };
  }
};

export default ComicViewer;
