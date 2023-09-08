import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DrawerContent from './DrawerContent';
import Icon from './Icon';
import { NAVBAR } from '../constants';

const Navbar = () => {
  const router = useRouter();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  const isHome = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Only apply the effect on the home page
      if (!isHome) {
        return;
      }

      // Check if the page is scrolled
      const offset = window.scrollY;
      const maxOffset = 64; // Height of scrollable area
      const calculatedOpacity = Math.min(offset / maxOffset, 1);
      setScrollOpacity(calculatedOpacity);

      if (offset > 64) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome, isScrolled]);

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
    backgroundColor: isHome ? `rgba(25, 46, 70, ${scrollOpacity})` : theme.palette.primary.dark,
    marginBottom: 0,
    position: 'fixed',
  };

  const logoStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.palette.secondary.light,
    marginRight: { md: '20px', xs: '0' },
    textAlign: { md: 'left', xs: 'left' },
    flexGrow: { md: '0', xs: '1' },
  };

  const iconButtonStyles = {
    color: theme.palette.secondary.light,
    marginRight: '10px',
    '&:hover': {
      // color: theme.palette.info.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'none',
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
    color: theme.palette.secondary.light,
    marginRight: '12px',
    cursor: 'pointer',
    '&:hover': {
      // color: theme.palette.info.main,
      color: theme.palette.secondary.main,
    },
  };

  const navAndStoreLinks = [...NAVBAR.LINKS.NAVIGATION, ...NAVBAR.LINKS.STORE];

  return (
    <AppBar elevation={isHome && !isScrolled ? 0 : 4} position="sticky" sx={appBarStyles}>
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '.MuiDrawer-paper': {
            backgroundColor: theme.palette.primary.light,
          },
        }}
      >
        <DrawerContent onClose={toggleDrawer(false)} />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
