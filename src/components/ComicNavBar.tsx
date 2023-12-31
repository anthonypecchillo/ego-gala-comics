import React, { useEffect } from 'react';

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';

interface ComicNavBarProps {
  comicId: string;
  panelNumber: number;
  maxPanelNumber: number;
}

const ComicNavBar = ({ comicId, panelNumber, maxPanelNumber }: ComicNavBarProps) => {
  const router = useRouter();

  // Prefetch the neighboring pages
  useEffect(() => {
    if (panelNumber > 1) {
      router.prefetch(`/comic/${comicId}/${String(panelNumber - 1).padStart(3, '0')}`);
    }
    if (panelNumber < maxPanelNumber) {
      router.prefetch(`/comic/${comicId}/${String(panelNumber + 1).padStart(3, '0')}`);
    }
  }, [comicId, panelNumber, maxPanelNumber, router]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (page === 1) {
      router.push(`/comic/${comicId}/001`);
    } else if (page === maxPanelNumber) {
      router.push(`/comic/${comicId}/${String(maxPanelNumber).padStart(3, '0')}`);
    } else {
      router.push(`/comic/${comicId}/${String(page).padStart(3, '0')}`);
    }
  };

  return (
    <Pagination
      count={maxPanelNumber}
      page={panelNumber}
      onChange={handlePageChange}
      color="secondary"
      // variant="outlined"
      siblingCount={0}
      boundaryCount={2}
      showFirstButton
      showLastButton
      sx={{
        ul: {
          justifyContent: 'center',
        },
      }}
    />
  );
};

export default ComicNavBar;
