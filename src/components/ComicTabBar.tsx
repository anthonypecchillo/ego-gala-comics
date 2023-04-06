import React from 'react';
import styled from 'styled-components';

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1rem;
`;

const Tab = styled.button`
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    background-color: #d0d0d0;
  }
`;

interface ComicTabBarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ComicTabBar: React.FC<ComicTabBarProps> = ({ activeTab, onTabClick }) => {
  return (
    <TabBar>
      {['diary', 'fantology', 'compendium'].map((tab) => (
        <Tab
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => onTabClick(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Tab>
      ))}
    </TabBar>
  );
};

export default ComicTabBar;
