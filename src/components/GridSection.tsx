import React from 'react';

import Link from 'next/link';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 4vw;
  place-items: space-evenly;
  justify-content: center; /* Center Grid Items in the middle of the page */
  margin: 40px 20px 55px 20px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 5vw;
  }
`;

const GridItem = styled(Link)<{ bgcolor: string; index: number }>`
  background-color: ${({ bgcolor }) => bgcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  height: 28vw;
  width: 28vw;

  color: inherit;
  text-decoration: none;

  &:hover {
    // Add fade animation here
  }

  @media screen and (max-width: 600px) {
    height: 90vw;
    width: 90vw;
  }
`;

const GridSection = () => {
  return (
    <Grid>
      <GridItem href="/comic" index={1} bgcolor="#B4ABD0">
        Comics
      </GridItem>
      <GridItem href="/illustrations" index={2} bgcolor="#B4ABD0">
        Illustrations
      </GridItem>
      <GridItem href="/about" index={4} bgcolor="#B4ABD0">
        About
      </GridItem>
    </Grid>
  );
};

export default GridSection;
