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
import styled from 'styled-components';

import ComicNavbar from '../../../components/ComicNavBar';
import Icon from '../../../components/Icon';
import { IComic } from '../../../db/models/Comic';
import { fetchComic } from '../../../services/comics';

const ComicViewerContainer = styled.div`
  min-height: 65vh;
  margin-bottom: 60px;
`;

const ComicPanel = styled.div`
  display: grid;
  grid-template-columns: minmax(90vw, 600px);
  justify-content: center;
  padding-top: 40px;
`;

const ComicImage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 66.67%; // 66.67% for aspect ratio 3:2

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 600px;
    object-fit: contain;
  }
`;

interface ComicViewerProps {
  comic: IComic;
  panelNumber: number;
}

const ComicViewer = ({ comic /*panelNumber*/ }: ComicViewerProps) => {
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
    <Box my={12}>
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
          <Grid container px="10px">
            {/* First Row */}
            <Grid item container py="5px" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" px="10px" color={theme.palette.secondary.light}>
                  {/* {comic.category === 'diary' ? 'Diary Comic' : comic.title} */}
                  K. Shull
                </Typography>
              </Grid>
              {/* <Grid item>
                <ComicNavbar
                  comicId={comic._id}
                  panelNumber={panelNumber}
                  maxPanelNumber={comic.panels.length}
                />
              </Grid> */}
              {/* <Grid item>
                <Typography variant="h6" px="10px" color={theme.palette.secondary.light}>
                  K.Shull
                </Typography>
              </Grid> */}
            </Grid>
            {/* <Grid item container justifyContent="center">
              <ComicNavbar
                comicId={comic._id}
                panelNumber={panelNumber}
                maxPanelNumber={comic.panels.length}
              />
            </Grid> */}

            {/* Second Row */}
            <Grid item container justifyContent="center" alignItems="center">
              <Box
                sx={{
                  backgroundColor: 'white',
                  boxShadow: theme.shadows[3],
                  width: '100%',
                  height: 'auto',
                  padding: '2vw',
                  border: `10px solid ${theme.palette.primary.main}`,
                  alignItems: 'center',
                }}
              >
                <ComicNavbar
                  comicId={comic._id}
                  panelNumber={panelNumber}
                  maxPanelNumber={comic.panels.length}
                />
                <Image
                  src={currentPanel.image_url}
                  alt={`Panel ${currentPanel.panel_number}`}
                  quality={100}
                  width={640}
                  height={551}
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 'auto',
                    padding: '10px 0px 10px 0px',
                  }}
                />
                <ComicNavbar
                  comicId={comic._id}
                  panelNumber={panelNumber}
                  maxPanelNumber={comic.panels.length}
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
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const comicId = context.query.comicId as string;
  const panelNumber = context.query.panelNumber as string;

  try {
    const comic = await fetchComic(comicId);

    if (comic.panels.length > 1 && !panelNumber) {
      return {
        redirect: {
          destination: `/comic/${comicId}/001`,
          permanent: false,
        },
      };
    }

    if (comic.panels.length === 1 && panelNumber) {
      return {
        redirect: {
          destination: `/comic/${comicId}`,
          permanent: false,
        },
      };
    }

    const panel = comic.panels[Number(panelNumber) - 1];
    if (!panel) {
      return { notFound: true };
    }

    return { props: { comic, panelNumber: Number(panelNumber) } };
  } catch (error) {
    // console.error('Error fetching comic:', error);
    return { notFound: true };
  }
};

export default ComicViewer;
