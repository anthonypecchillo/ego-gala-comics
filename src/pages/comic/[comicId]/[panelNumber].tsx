import React from 'react';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ComicNavbar from '../../../components/ComicNavBar';
import { IComic } from '../../../db/models/Comic';
import { fetchComic } from '../../../services/comics';

interface ComicViewerProps {
  comic: IComic;
  // panelNumber: number;
}

const ComicViewer = ({ comic }: ComicViewerProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const router = useRouter();
  const panelNumber = Number(router.query.panelNumber) || 1;
  const currentPanel = comic.panels.find((panel) => panel.panel_number === panelNumber);

  return (
    <Box my={12}>
      {currentPanel && (
        <Container
          maxWidth="md"
          sx={{
            width: isMobile ? '95vw' : '90vw',
            backgroundColor: theme.palette.primary.light,
            marginTop: '20px',
            padding: '24px 0px 24px 0px',
            boxShadow: theme.shadows[3],
          }}
        >
          <Grid container>
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
