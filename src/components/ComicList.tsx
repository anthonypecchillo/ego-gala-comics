import React, { useState } from 'react';
import styled from 'styled-components';
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
  comics: Array<{
    _id: string;
    title: string;
    publication_date: string;
  }>;
}

const ComicList: React.FC<ComicListProps> = ({ comics }) => {
  const [selectedComic, setSelectedComic] = useState<IComic | null>(null);

  const handleComicClick = async (comicId: string) => {
    try {
      const comic = await fetchComic(comicId);
      setSelectedComic(comic);
    } catch (error) {
      console.error('Error fetching comic:', error);
    }
  };

  return (
    <List>
      {comics.map((comic) => (
        <ListItem key={comic._id} onClick={() => handleComicClick(comic._id)}>
          {comic.title} - {new Date(comic.publication_date).toLocaleDateString()}
        </ListItem>
      ))}
      {/* Render the selected comic if it exists */}
      {selectedComic && (
        <div>
          {/* Render the comic panels */}
          {selectedComic.panels.map((panel) => (
            <img key={panel._id} src={panel.image_url} alt={`Panel ${panel.panel_number}`} />
          ))}
        </div>
      )}
    </List>
  );
};

export default ComicList;
