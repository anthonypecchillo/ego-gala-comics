import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ComicForm from '../components/cms/ComicForm';
import ComicTabBar from '../components/ComicTabBar';
import ComicList from '@/components/ComicList';

const CMS: React.FC = () => {
  const [activeCMSTab, setActiveCMSTab] = React.useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState('diary');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCMSTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setActiveCMSTab(newValue);
  };

  const handleCategoryTabClick = (category: string) => {
    setActiveCategoryTab(category);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, my: 5, mx: 'auto', maxWidth: 'md' }}>
      <Tabs value={activeCMSTab} onChange={handleCMSTabClick}>
        <Tab label="Create" />
        <Tab label="Delete" />
      </Tabs>
      {activeCMSTab === 0 && (
        <Box width="60%">
          <h1>Create a Comic</h1>
          <ComicForm />
        </Box>
      )}
      {activeCMSTab === 1 && (
        <Box width="60%">
          <h1>Delete a Comic</h1>
          <ComicTabBar
            activeTab={activeCategoryTab}
            onTabClick={handleCategoryTabClick}
          />
          <ComicList
            category={activeCategoryTab}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            showCMSFeatures
          />
        </Box>
      )}
    </Paper>
  );
};

export default CMS;
