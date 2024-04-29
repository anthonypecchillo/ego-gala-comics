import React, { useCallback, useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { IIllustration } from '../db/models/Illustration';
import { fetchAllIllustrations } from '../services/illustrations';

const Illustrations = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [illustrations, setIllustrations] = useState<IIllustration[]>([]);
  const router = useRouter();
  const { query } = router;
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IIllustration | null>(null);

  const handleOpen = useCallback(
    (illustration: IIllustration) => {
      setSelectedImage(illustration);
      setOpen(true);
      router.push(
        {
          pathname: '/illustrations',
          query: { id: illustration._id },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const handleClose = () => {
    setOpen(false);
    router.push(
      {
        pathname: '/illustrations',
        query: {},
      },
      undefined,
      { shallow: true },
    );
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

  // Open modal if query params exist
  useEffect(() => {
    if (query.id && illustrations.length > 0) {
      const illustrationToOpen = illustrations.find((ill) => ill._id === query.id);
      if (illustrationToOpen) {
        handleOpen(illustrationToOpen);
      }
    }
  }, [query.id, illustrations, handleOpen]);

  return (
    <Box my={12}>
      <Container
        maxWidth="sm"
        sx={{
          width: isMobile ? '95vw' : '90vw',
          backgroundColor: 'white',
          marginY: '20px',
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

      <Grid container spacing={4} justifyContent="center" sx={{ px: isMobile ? 1 : 2 }}>
        {illustrations.map((illustration) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={illustration.url}
            onClick={() => handleOpen(illustration)}
          >
            <Container
              maxWidth="md"
              sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.light,
                marginTop: '20px',
                padding: '20px',
                boxShadow: theme.shadows[3],
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <Box>
                <Image
                  src={illustration.url}
                  alt="Illustration"
                  quality={100}
                  width={illustration.width}
                  height={illustration.height}
                  layout="responsive"
                  style={{
                    backgroundColor: 'white',
                    boxShadow: theme.shadows[3],
                    width: '100%',
                    height: '100%',
                    padding: '20px',
                    border: `10px solid ${theme.palette.primary.main}`,
                  }}
                />
              </Box>
            </Container>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Selected Image */}
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <Container
          maxWidth="md"
          sx={{
            position: 'absolute',
            top: '50vh',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90vw' : '40vw',
            backgroundColor: theme.palette.primary.light,
            padding: '20px',
            boxShadow: theme.shadows[3],
          }}
        >
          {selectedImage && (
            <Box>
              <Image
                src={selectedImage.url}
                alt="Illustration"
                quality={100}
                width={selectedImage.width}
                height={selectedImage.height}
                layout="responsive"
                style={{
                  backgroundColor: 'white',
                  boxShadow: theme.shadows[3],
                  width: '100%',
                  height: '100%',
                  padding: '20px',
                  border: `10px solid ${theme.palette.primary.main}`,
                }}
              />
            </Box>
          )}
        </Container>
      </Modal>
    </Box>
  );
};

export default Illustrations;
