// src/pages/comic.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image'; // Import the Image component
import { IComic } from 'db/models/Comic';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchComic } from '../../services/comics';
import GlobalStyle from '../../styles/GlobalStyle';
import theme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

interface ComicViewerProps {
  comic: IComic;
}

const ComicViewer: React.FC<ComicViewerProps> = ({ comic }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <GlobalStyle />
      <Navbar />
      <div>
        {comic.panels.map((panel) => {
          return (
            <Image
              key={panel._id}
              src={panel.image_url}
              alt={`Panel ${panel.panel_number}`}
              width={panel.width || 600} // Provide the width (use panel.width if available or a default value)
              height={panel.height || 400} // Provide the height (use panel.height if available or a default value)
              // layout="fill"
            />
          )
          })}
      </div>
      <Footer />
      {/* </Router> */}
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
