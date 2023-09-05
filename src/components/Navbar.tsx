import React, { useState } from 'react';

import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import DrawerContent from './DrawerContent';
import Icon from './Icon';
import { NAVBAR } from '../constants';

const Navbar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const appBarStyles = {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 2px 4px rgba(1, 1, 1, 0.4)',
  };

  const logoStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.palette.common.black,
    marginRight: { md: '20px', xs: '0' },
    textAlign: { md: 'left', xs: 'left' },
    flexGrow: { md: '0', xs: '1' },
  };

  const iconButtonStyles = {
    color: theme.palette.common.black,
    marginRight: '10px',
    '&:hover': {
      color: theme.palette.info.main,
      backgroundColor: theme.palette.common.white,
    },
  };

  const navLinkBoxStyles = {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  };

  const navLinkStyles = {
    textDecoration: 'none',
  };

  const navLinkTextStyles = {
    color: '#333',
    marginRight: '12px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.info.main,
    },
  };

  const navAndStoreLinks = [...NAVBAR.LINKS.NAVIGATION, ...NAVBAR.LINKS.STORE];

  return (
    <AppBar position="sticky" sx={appBarStyles}>
      <Toolbar>
        <Typography variant="h6" sx={logoStyles}>
          {NAVBAR.LOGO_TEXT}
        </Typography>
        <Hidden mdUp>
          <IconButton
            sx={iconButtonStyles}
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <Icon iconName="Menu" />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Box sx={navLinkBoxStyles}>
            {navAndStoreLinks.map(({ href, text }) => (
              <Link key={href} href={href} style={navLinkStyles} passHref>
                <Typography variant="body1" sx={navLinkTextStyles}>
                  {text}
                </Typography>
              </Link>
            ))}
          </Box>
          {NAVBAR.LINKS.SOCIAL.map(({ href, iconName }) => (
            <Link key={href} href={href} passHref>
              <IconButton sx={iconButtonStyles} component="span">
                <Icon iconName={iconName} />
              </IconButton>
            </Link>
          ))}
        </Hidden>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerContent onClose={toggleDrawer(false)} />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
