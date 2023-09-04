import React from 'react';

import { useTheme, useMediaQuery, styled } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface ComicTabBarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,

  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: '0px',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 600,
  flex: 1, // Default to equal width on larger screens
  maxWidth: 200,
  minWidth: 120, // Set a fixed minimum width
  textAlign: 'center',
  '&:hover': {
    color: theme.palette.primary.light,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down('sm')]: {
    // Small screen styles
    flex: '1', // Ensure full width on small screens
    minWidth: 'unset', // Remove fixed minimum width on small screens
  },
}));

const ComicTabBar = ({ activeTab, onTabClick }: ComicTabBarProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const tabs = ['diary', 'fantology', 'compendium'];
  const activeTabIndex = tabs.indexOf(activeTab);

  return (
    <StyledTabs
      value={activeTabIndex}
      onChange={(event: React.ChangeEvent<unknown>, newValue: number) => {
        onTabClick(tabs[newValue]);
      }}
      variant={isSmallScreen ? 'fullWidth' : undefined}
      centered={!isSmallScreen}
    >
      {tabs.map((tab) => (
        <StyledTab key={tab} label={tab.charAt(0).toUpperCase() + tab.slice(1)} />
      ))}
    </StyledTabs>
  );
};

export default ComicTabBar;
