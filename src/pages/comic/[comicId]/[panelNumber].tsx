import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { IComic } from '../../../db/models/Comic';
import { fetchComic } from '../../../services/comics';
import ComicNavbar from '../../../components/ComicNavBar';

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

const ComicViewer: React.FC<ComicViewerProps> = ({ comic, panelNumber }) => {
  const currentPanel = comic.panels.find(
    (panel) => panel.panel_number === panelNumber,
  );

  if (!currentPanel) {
    return <div>TODO: Fallback UI</div>;
  }

  return (
    <>
      <ComicNavbar
        comicId={comic._id}
        panelNumber={panelNumber}
        maxPanelNumber={comic.panels.length}
      />
      <ComicPanel>
        <ComicImage key={currentPanel._id}>
          <Image
            src={currentPanel.image_url}
            alt={`Panel ${currentPanel?.panel_number}`}
            fill
          />
        </ComicImage>
      </ComicPanel>
    </>
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
