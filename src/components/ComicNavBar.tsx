import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 64px;
  // background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 600px) {
    padding-top: 56px;
  }
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

  // Prefetch the neighboring pages
  useEffect(() => {
    if (panelNumber > 1) {
      router.prefetch(
        `/comic/${comicId}/${String(panelNumber - 1).padStart(3, '0')}`,
      );
    }
    if (panelNumber < maxPanelNumber) {
      router.prefetch(
        `/comic/${comicId}/${String(panelNumber + 1).padStart(3, '0')}`,
      );
    }
  }, [comicId, panelNumber, maxPanelNumber, router]);

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
