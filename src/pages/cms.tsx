import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import ComicForm from '../components/cms/ComicForm';

const CMS: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, my: 2, mx: 'auto', maxWidth: 'md' }}>
      <h1>CMS</h1>
      <ComicForm onSubmit={(comic) => console.log(comic)} />
    </Paper>
  );
};

export default CMS;
