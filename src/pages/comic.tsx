import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ComicTabBar from '../components/ComicTabBar';
import ComicList from '../components/ComicList';
import { fetchComicsByCategory } from '../services/comics';
import { IComic } from '../db/models/Comic';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import { fetchEarliestDiaryComicId } from '../services/comics';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../styles/theme';

const ComicPageGrid = styled.div`
  display: grid;
  grid-gap: 5vw;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'comic-list content'
    'comic-list .';
  padding: 5vw;

  @media (max-width: 768px) {
    grid-gap: 5vw;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      'content'
      'comic-list';
    // padding: 5vw;
  }

  @media (max-width: 480px) {
    // Add your styles for mobile view
  }
`;

const StyledComicList = styled.div`
  grid-area: comic-list;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const StyledContent = styled.div`
  grid-area: content;
`;

const ComicPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('diary');
  const [comics, setComics] = useState<IComic[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCategoryComics = async () => {
      try {
        const { comics: categoryComics, totalPages } =
          await fetchComicsByCategory(activeTab, currentPage);
        setComics(categoryComics);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching category-specific comics:', error);
      }
    };

    fetchCategoryComics();
  }, [activeTab, currentPage]);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const goToEarliestDiaryComic = async () => {
    try {
      const id = await fetchEarliestDiaryComicId();
      router.push(`/comic/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          position: 'sticky',
          top: isMobile ? 56 : 64,
          zIndex: 1100,
        }}
      >
        <ComicTabBar activeTab={activeTab} onTabClick={handleTabClick} />
      </Paper>
      <ComicPageGrid>
        <StyledComicList>
          <PaginationWrapper>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </PaginationWrapper>

          <ComicList comics={comics} />

          <PaginationWrapper>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </PaginationWrapper>
        </StyledComicList>

        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Ego Gala Archive
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            rutrum ligula felis, eget lobortis nisi egestas at. Pellentesque
            suscipit convallis enim at suscipit. Proin nec sem sit amet arcu
            consequat viverra.
          </Typography>
          <Typography variant="body1" paragraph>
            Ut consectetur diam ac augue venenatis sagittis. Quisque mauris
            diam, laoreet a quam ac, tincidunt feugiat mi. Fusce maximus non mi
            pretium vulputate.{' '}
            <a href="https://example.com">Accessibility Settings</a>.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={goToEarliestDiaryComic}
          >
            FIRST COMIC
          </Button>
        </StyledContent>

        <Hidden smDown>
          <Image
            alt="Fun image"
            src="/fun_image.png"
            width={284}
            height={393}
            layout="responsive"
            style={{
              margin: '0 auto',
              paddingBottom: 70,
              width: '100%',
              maxWidth: 325,
              position: 'relative',
            }}
          />
        </Hidden>
      </ComicPageGrid>
    </>
  );
};

export default ComicPage;
