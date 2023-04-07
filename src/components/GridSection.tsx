import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// import { useHistory } from 'react-router-dom';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4vw;
  place-items: space-evenly;
  justify-content: center; /* Center Grid Items in the middle of the page */
  margin: 20px 20px;
`;

const GridItem = styled(Link) < { bgColor: string, index: number }>`
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: ${({ index }) => index % 2 ? 'end' : 'start'}; /* Push left column to the right and right column to the left */
  height: 26vw;
  width: 26vw;

  color: inherit;
  text-decoration: none;

  &:hover {
    // Add fade animation here
  }

  @media screen and (max-width: 768px) {
    height: 45vw;
    width: 45vw;
  }
`;

const GridSection: React.FC = () => {
  // const history = useHistory();

  // const handleClick = (path: string) => {
  //   history.push(path);
  // };

  return (
    <Grid>
        {/* <GridItem as={Link} href="/comic" index={1} bgColor="#a0a">Comic 1</GridItem>
        <GridItem as={Link} href="/about" index={2} bgColor="#0aa">About 1</GridItem>
        <GridItem as={Link} href="/comic" index={3} bgColor="#aa0">Comic 2</GridItem>
        <GridItem as={Link} href="/about" index={4} bgColor="#a00">About 2</GridItem> */}
        <GridItem href="/comic" index={1} bgColor="#a0a">Comic 1</GridItem>
        <GridItem href="/about" index={2} bgColor="#0aa">About 1</GridItem>
        <GridItem href="/comic" index={3} bgColor="#aa0">Comic 2</GridItem>
        <GridItem href="/about" index={4} bgColor="#a00">About 2</GridItem>
    </Grid>
  );
};

export default GridSection;


// NOTE: Use this later if you wind up using React Router
/* <GridItem bgColor="#a0a" onClick={() => handleClick('/about')}>About 1</GridItem>
<GridItem bgColor="#0aa" onClick={() => handleClick('/comic')}>Comic 1</GridItem>
<GridItem bgColor="#aa0" onClick={() => handleClick('/about')}>About 2</GridItem>
<GridItem bgColor="#a00" onClick={() => handleClick('/comic')}>Comic 2</GridItem> */