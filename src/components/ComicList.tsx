import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { fetchComic } from '../services/comics';
import { IComic } from 'db/models/Comic';

const List = styled.ul`
  grid-area: comic-list;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
`;

interface ComicListProps {
  comics: IComic[];
}

const ComicList: React.FC<ComicListProps> = ({ comics }) => {
  // const [selectedComic, setSelectedComic] = useState<IComic | null>(null);

  // const handleComicClick = async (comicId: string) => {
  //   try {
  //     const comic = await fetchComic(comicId);
  //     setSelectedComic(comic);
  //   } catch (error) {
  //     console.error('Error fetching comic:', error);
  //   }
  // };

  return (
    <List>
      {comics.map((comic) => (
        <Link href={`/comic/${comic._id}`} key={comic._id}>
          <ListItem>
            {comic.title} - {new Date(comic.publication_date).toLocaleDateString()}
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default ComicList;
