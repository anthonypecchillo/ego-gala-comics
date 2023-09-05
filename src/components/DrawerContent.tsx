import React from 'react';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from 'next/link';

import Icon from './Icon';
import { NAVBAR } from '../constants';

interface DrawerContentProps {
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const DrawerContent = ({ onClose }: DrawerContentProps) => {
  const theme = useTheme();

  const linkStyles = {
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      '& .MuiListItemIcon-root': {
        color: theme.palette.info.main,
      },
      '& .MuiListItemText-root': {
        color: theme.palette.info.main,
      },
    },
  };

  const boxStyles = {
    width: '200px',
  };

  const iconStyles = {
    minWidth: '40px',
  };

  const linkCategories = [
    { title: 'Navigation', links: NAVBAR.LINKS.NAVIGATION },
    { title: 'Social Media', links: NAVBAR.LINKS.SOCIAL },
    { title: 'Store', links: NAVBAR.LINKS.STORE },
  ];

  return (
    <Box role="presentation" onClick={onClose} onKeyDown={onClose} sx={boxStyles}>
      {linkCategories.map((category) => (
        <List
          key={category.title}
          subheader={<ListSubheader component="div">{category.title}</ListSubheader>}
        >
          {category.links.map(({ href, iconName, text }) => (
            <ListItem key={href} component={Link} href={href} sx={linkStyles}>
              <ListItemIcon sx={iconStyles}>
                <Icon iconName={iconName} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      ))}
    </Box>
  );
};

export default DrawerContent;
