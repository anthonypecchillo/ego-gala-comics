import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsletterForm from '../components/NewsletterForm';
import ComicTabBar from '../components/ComicTabBar';
import ComicList from '../components/ComicList';
import Pagination from '../components/Pagination';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { fetchComicsByCategory } from '../services/comics';
import { IComic } from '../../db/models/Comic';

import data from '../../db/seedData.json';

const ComicPageGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr;
  grid-gap: 5vw;
  padding: 5vw;

  @media (max-width: 768px) {
    // Add your styles for tablet view
  }

  @media (max-width: 480px) {
    // Add your styles for mobile view
  }
`;

// TODO: Add other styled components for Title, Paragraph, Button, and Image
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
        const categoryComics = await fetchComicsByCategory(activeTab);
        setComics(categoryComics);
      } catch (error) {
        console.error('Error fetching category-specific comics:', error);
      }
    };

    fetchCategoryComics();
  }, [activeTab]);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <GlobalStyle />
      <Navbar />
      <ComicTabBar activeTab={activeTab} onTabClick={handleTabClick} />
      <ComicPageGrid>
        <div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageClick={setCurrentPage} />
          <ComicList comics={comics} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageClick={setCurrentPage} />
        </div>
        {/* Add other components for Title, Paragraph, Button, and Image */}
        <div>
          <Title>Ego Gala's Archive</Title>
          <Paragraph>
            Join in on the adventurous characters of Ego Gala&apos;s universe as they navigate the chaotic world of superheroes and villains. These characters are not your average sidekicks, they have stories to tell and quests to embark upon. Watch as they stumble through time trying to maintain their sanity and the balance of the force. That&apos;s right, and you might even get a chance to meet Douglas Funny himself. (You might even see...THE BEATS!)
          </Paragraph>
          <Paragraph>
            I&apos;m too high to be witty right now, but this paragraph should provide the user with some guidance on how to actually do something with the site they&apos;d otherwise overlook. For instance, to take a page out of Tavern Wenches&apos; book, you could prompt the user to set their [Accessibility Settings](https://www.tavern-wenches.com/settings/).
          </Paragraph>
          <FirstComicButton>FIRST COMIC</FirstComicButton>
          {/* Add Image component */}
        </div>
      </ComicPageGrid>
      <NewsletterForm />
      <Footer />
      {/* </Router> */}
    </ThemeProvider>
  );
};

export default ComicPage;