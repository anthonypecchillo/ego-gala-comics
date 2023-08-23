import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';
import { fetchComicsByCategory, deleteComic } from '../services/comics';
import { IComic } from '../db/models/Comic';

const StyledComicList = styled.div`
  grid-area: comic-list;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

interface ComicListProps {
  category: string;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  showCMSFeatures?: boolean;
}

const ComicList: React.FC<ComicListProps> = ({
  category,
  currentPage,
  onPageChange,
  showCMSFeatures,
}) => {
  const theme = useTheme();
  const [comics, setComics] = useState<IComic[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleDeleteComic = async (
    event: React.MouseEvent,
    comicId: string,
  ) => {
    const comicToDelete = comics.find((comic) => comic._id === comicId);

    if (comicToDelete) {
      // Delete comic from database
      await deleteComic(comicId);

      // Remove deleted comic from local state
      const updatedComics = comics.filter((comic) => comic._id !== comicId);
      setComics(updatedComics);
    }
  };

  useEffect(() => {
    const fetchCategoryComics = async () => {
      try {
        const { comics: categoryComics, totalPages } =
          await fetchComicsByCategory(category, currentPage);
        setComics(categoryComics);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching category-specific comics:', error);
      }
    };

    fetchCategoryComics();
  }, [category, currentPage]);

  return (
    <StyledComicList>
      <PaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </PaginationWrapper>

      <List>
        {comics.map((comic) => (
          <Link
            href={
              showCMSFeatures
                ? undefined
                : comic.panels.length > 1
                ? `/comic/${comic._id}/001`
                : `/comic/${comic._id}`
            }
            key={comic._id}
            underline="none"
          >
            <ListItem
              button
              disableGutters
              sx={{
                padding: 0,
                backgroundColor: '#fff',
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                borderTop:
                  comics.indexOf(comic) === 0
                    ? `1px solid ${theme.palette.primary.main}`
                    : 'none',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={comic.panels[0].image_url}
                  alt={comic.title}
                  style={{ width: '80px', height: '80px', marginRight: '16px' }}
                />
              </ListItemAvatar>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <ListItemText primary={comic.title} />
                <ListItemText
                  secondary={new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(comic.publication_date))}
                  sx={{ paddingRight: '16px', textAlign: 'right' }}
                />
                {showCMSFeatures && (
                  <Button
                    onClick={(event) => handleDeleteComic(event, comic._id)}
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            </ListItem>
          </Link>
        ))}
      </List>

      <PaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </PaginationWrapper>
    </StyledComicList>
  );
};

export default ComicList;
