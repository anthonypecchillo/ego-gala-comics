import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const PageButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  margin: 0 0.25rem;
  padding: 0.5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    background-color: #d0d0d0;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageClick,
}) => {
  return (
    <PaginationWrapper>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PageButton
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageClick(page)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;
