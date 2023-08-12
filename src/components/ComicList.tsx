import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Link,
  Box,
  useTheme,
} from '@mui/material';
import { IComic } from '../../db/models/Comic';

interface ComicListProps {
  comics: IComic[];
}

const ComicList: React.FC<ComicListProps> = ({ comics }) => {
  const theme = useTheme();

  return (
    <List>
      {comics.map((comic) => (
        <Link
          href={
            comic.panels.length > 1
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
              backgroundColor: '#e8e8e8',
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
                secondary={new Date(
                  comic.publication_date,
                ).toLocaleDateString()}
                align="right"
                style={{ paddingRight: '10px' }}
              />
            </Box>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default ComicList;
