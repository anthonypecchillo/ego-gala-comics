import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Image from 'next/image'; // Import the Image component
import { IComic } from 'db/models/Comic';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchComic } from '../../services/comics';
import GlobalStyle from '../../styles/GlobalStyle';
import theme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

const ComicPanel = styled.div`
  display: grid;
  grid-template-columns: minmax(90vw, 600px);
  justify-content: center;
  padding-top: 40px;
`;

const ComicImage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 66.67%; // 66.67% for sspect ratio 3:2

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
}

const ComicViewer: React.FC<ComicViewerProps> = ({ comic }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <ComicPanel>
        {comic.panels.map((panel) => (
          <ComicImage key={panel._id}>
            <Image
              src={panel.image_url}
              alt={`Panel ${panel.panel_number}`}
              fill
            />
          </ComicImage>
        ))}
      </ComicPanel>
      <Footer />
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const comicId = context.query.comicId as string;
  try {
    const comic = await fetchComic(comicId);
    return { props: { comic } };
  } catch (error) {
    console.error('Error fetching comic:', error);
    return { notFound: true };
  }
};

export default ComicViewer;
