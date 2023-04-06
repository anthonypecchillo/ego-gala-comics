import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
`;

interface ComicListProps {
  comics: Array<{
    _id: string;
    title: string;
    publication_date: string;
  }>;
}

const ComicList: React.FC<ComicListProps> = ({ comics }) => {
  return (
    <List>
      {comics.map((comic) => (
        <ListItem key={comic._id}>
          {comic.title} - {new Date(comic.publication_date).toLocaleDateString()}
        </ListItem>
      ))}
    </List>
  );
};

export default ComicList;
