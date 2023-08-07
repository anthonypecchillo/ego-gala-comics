import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsletterForm from '../components/NewsletterForm';
import ComicTabBar from '../components/ComicTabBar';
import ComicList from '../components/ComicList';
// import Pagination from '../components/Pagination';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { fetchComicsByCategory } from '../services/comics';
import { IComic } from '../../db/models/Comic';
import { Pagination } from '@mui/material';

const ComicPageGrid = styled.div`
  display: grid;
  grid-gap: 5vw;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr;
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
    padding: 5vw;
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

const Title = styled.h2`
  // Add your styles for Title
`;

const Paragraph = styled.p`
  // Add your styles for Paragraph
`;

const FirstComicButton = styled.button`
  // Add your styles for Button
`;

const ComicPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('diary');
  const [comics, setComics] = useState<IComic[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <ComicTabBar activeTab={activeTab} onTabClick={handleTabClick} />
      <ComicPageGrid>
        <StyledComicList>
          <PaginationWrapper>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </PaginationWrapper>

          <ComicList comics={comics} />

          <PaginationWrapper>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </PaginationWrapper>
        </StyledComicList>

        <StyledContent>
          <Title>Ego Gala Archive</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            rutrum ligula felis, eget lobortis nisi egestas at. Pellentesque
            suscipit convallis enim at suscipit. Proin nec sem sit amet arcu
            consequat viverra.
          </Paragraph>
          <Paragraph>
            Ut consectetur diam ac augue venenatis sagittis. Quisque mauris
            diam, laoreet a quam ac, tincidunt feugiat mi. Fusce maximus non mi
            pretium vulputate.
            <a href="https://www.tavern-wenches.com/settings/">
              Accessibility Settings
            </a>
            .
          </Paragraph>
          <FirstComicButton>FIRST COMIC</FirstComicButton>
          {/* Add Image component */}
        </StyledContent>

        <div>Fun Image</div>
      </ComicPageGrid>
      <Footer />
    </ThemeProvider>
  );
};

export default ComicPage;
