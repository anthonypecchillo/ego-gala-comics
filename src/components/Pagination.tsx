import React from 'react';

import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageClick }: PaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageClick(page);
  };

  return (
    <MuiPagination count={totalPages} page={currentPage} onChange={handleChange} color="primary" />
  );
};

export default Pagination;
