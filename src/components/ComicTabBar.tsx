import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface ComicTabBarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ComicTabBar: React.FC<ComicTabBarProps> = ({ activeTab, onTabClick }) => {
  // FIXME: This could be better...
  // Determine the index of the active tab
  const tabs = ['diary', 'fantology', 'compendium'];
  const activeTabIndex = tabs.indexOf(activeTab);

  return (
    <Tabs
      value={activeTabIndex}
      onChange={(event, newValue) => onTabClick(tabs[newValue])}
      variant="fullWidth"
    >
      {tabs.map((tab) => (
        <Tab key={tab} label={tab.charAt(0).toUpperCase() + tab.slice(1)} />
      ))}
    </Tabs>
  );
};

export default ComicTabBar;
