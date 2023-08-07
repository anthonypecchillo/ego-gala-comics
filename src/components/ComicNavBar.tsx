import React, { useEffect } from 'react';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface ComicNavBarProps {
  comicId: string;
  panelNumber: number;
  maxPanelNumber: number;
}

const ComicNavBar: React.FC<ComicNavBarProps> = ({
  comicId,
  panelNumber,
  maxPanelNumber,
}) => {
  const router = useRouter();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    if (page === 1) {
      router.push(`/comic/${comicId}/001`);
    } else if (page === maxPanelNumber) {
      router.push(
        `/comic/${comicId}/${String(maxPanelNumber).padStart(3, '0')}`,
      );
    } else {
      router.push(`/comic/${comicId}/${String(page).padStart(3, '0')}`);
    }
  };

  return (
    <NavWrapper>
      <Pagination
        count={maxPanelNumber}
        page={panelNumber}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        siblingCount={0}
        boundaryCount={1}
        showFirstButton
        showLastButton
      />
    </NavWrapper>
  );
};

export default ComicNavBar;

// import React from 'react';
// import Link from 'next/link';
// import styled from 'styled-components';

// const NavWrapper = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 1rem;
//   background-color: ${({ theme }) => theme.colors.background};
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: ${({ theme }) => theme.colors.primary};
//   font-size: 1.2rem;
//   cursor: pointer;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;

// const PageNumber = styled.span`
//   font-size: 1.2rem;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;

// interface ComicNavBarProps {
//   comicId: string;
//   panelNumber: number;
//   maxPanelNumber: number;
// }

// const ComicNavBar: React.FC<ComicNavBarProps> = ({
//   comicId,
//   panelNumber,
//   maxPanelNumber,
// }) => {
//   const isFirstPanel = panelNumber === 1;
//   const isLastPanel = panelNumber === maxPanelNumber;

//   console.log('isFirstPanel', isFirstPanel);
//   console.log('isLastPanel', isLastPanel);

//   return (
//     <NavWrapper>
//       <StyledLink
//         href={`/comic/${comicId}/001`}
//         aria-label="First panel"
//         tabIndex={isFirstPanel ? -1 : 0}
//       >
//         {isFirstPanel ? '<< First' : '<<'}
//       </StyledLink>
//       <StyledLink
//         href={`/comic/${comicId}/${String(panelNumber - 1).padStart(3, '0')}`}
//         aria-label="Previous panel"
//         tabIndex={isFirstPanel ? -1 : 0}
//       >
//         {isFirstPanel ? '< Prev' : '<'}
//       </StyledLink>
//       <PageNumber>Page {panelNumber}</PageNumber>
//       <StyledLink
//         href={`/comic/${comicId}/${String(panelNumber + 1).padStart(3, '0')}`}
//         aria-label="Next panel"
//         tabIndex={isLastPanel ? -1 : 0}
//       >
//         {isLastPanel ? 'Next >' : '>'}
//       </StyledLink>
//       <StyledLink
//         href={`/comic/${comicId}/${String(maxPanelNumber).padStart(3, '0')}`}
//         aria-label="Last panel"
//         tabIndex={isLastPanel ? -1 : 0}
//       >
//         {isLastPanel ? 'Last >>' : '>>'}
//       </StyledLink>
//     </NavWrapper>
//   );
// };

// export default ComicNavBar;
