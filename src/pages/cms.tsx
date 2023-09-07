import React, { useState } from 'react';

import ComicList from '@/components/ComicList';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import ComicForm from '../components/cms/ComicForm';
import ComicTabBar from '../components/ComicTabBar';

const CMS = () => {
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, my: 12, mx: 'auto', maxWidth: 'sm' }}>
      <Tabs value={activeCMSTab} onChange={handleCMSTabClick}>
        <Tab label="Create" />
        <Tab label="Delete" />
      </Tabs>
      {activeCMSTab === 0 && (
        <Box width="98%" mx="auto">
          {/* <center>
            <h1>✍️ Create a Comic ✨</h1>
          </center> */}
          <br />
          <br />
          <ComicForm />
        </Box>
      )}
      {activeCMSTab === 1 && (
        <Box width="100%">
          {/* <center>
            <h1>🤦‍♀️ Delete a Comic 🗑️</h1>
          </center> */}
          <br />
          <br />
          <ComicTabBar activeTab={activeCategoryTab} onTabClick={handleCategoryTabClick} />
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
