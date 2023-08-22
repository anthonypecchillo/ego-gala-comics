import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ComicForm from '../components/cms/ComicForm';

const CMS: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, my: 5, mx: 'auto', maxWidth: 'md' }}>
      <h1>Create a Comic</h1>
      <Box width="60%">
        <ComicForm onSubmit={(comic) => console.log(comic)} />
      </Box>
    </Paper>
  );
};

export default CMS;
