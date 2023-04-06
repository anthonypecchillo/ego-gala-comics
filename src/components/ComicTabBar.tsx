import React from 'react';
import styled from 'styled-components';

// const TabBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   background-color: #f5f5f5;
//   padding: 1rem;
// `;

// const Tab = styled.button`
//   background-color: #f5f5f5;
//   border: none;
//   cursor: pointer;
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   font-weight: bold;

//   &:hover {
//     background-color: #e0e0e0;
//   }

//   &.active {
//     background-color: #d0d0d0;
//   }
// `;

// const Tab = styled.div<{ isActive: boolean }>`
//   padding: 10px 20px;
//   cursor: pointer;
//   background-color: ${({ isActive, theme }) => (isActive ? theme.colors.darkGrey : 'transparent')};
//   color: ${({ theme }) => theme.colors.text};
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.hoverGrey};
//   }

//   // Added this style to stretch the tab to cover the whole vertical space
//   align-self: stretch;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// Update the ComicTabBar styled-component
const TabBar = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #f5f5f5;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 65px;
`;

// Update the Tab styled-component
const Tab = styled.div<{ isActive: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.darkGrey : 'transparent')};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.darkGrey : theme.colors.hoverGrey)};
  }

  // Updated styles for the Tab
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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
          // className={activeTab === tab ? 'active' : ''}
          isActive={activeTab === tab}
          onClick={() => onTabClick(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Tab>
      ))}
    </TabBar>
  );
};

export default ComicTabBar;
