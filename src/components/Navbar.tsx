import React, { useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import InfoIcon from '@mui/icons-material/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import PaletteIcon from '@mui/icons-material/Palette';
import RedditIcon from '@mui/icons-material/Reddit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import theme from '../styles/theme';

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  align-items: center;
  @media (min-width: 900px) {
    &:hover {
      color: ${theme.palette.info.main};
    }
  }
  @media (max-width: 899px) {
    display: flex;
    margin-right: 0;
  }
`;

const Navbar = () => {
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

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: '200px' }}
    >
      <List subheader={<ListSubheader component="div">Navigation</ListSubheader>}>
        <ListItem>
          <NavLink href="/">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink href="/comic">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Comics" />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink href="/illustrations">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Illustrations" />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink href="/about">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </NavLink>
        </ListItem>
      </List>

      <List subheader={<ListSubheader component="div">Social Media</ListSubheader>}>
        <ListItem>
          <NavLink href="https://twitter.com/ego_gala" target="_blank" rel="noopener noreferrer">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            href="https://www.instagram.com/ego_gala/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <InstagramIcon />
            </ListItemIcon>
            <ListItemText primary="Instagram" />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            href="https://www.facebook.com/k10.shull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <FacebookIcon />
            </ListItemIcon>
            <ListItemText primary="Facebook" />
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            href="https://www.reddit.com/user/ego_gala/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <RedditIcon />
            </ListItemIcon>
            <ListItemText primary="Reddit" />
          </NavLink>
        </ListItem>
      </List>

      <List subheader={<ListSubheader component="div">Store</ListSubheader>}>
        <ListItem>
          <NavLink href="https://egogala.storenvy.com/">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <ShoppingCartIcon />
              {/* <ShoppingBasketIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Shop" />
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(1, 1, 1, 0.4)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginRight: {
              md: '20px',
              xs: '0',
            },
            textAlign: {
              md: 'left',
              // xs: 'center',
              xs: 'left',
            },
            flexGrow: {
              md: '0',
              xs: '1',
            },
          }}
        >
          Ego Gala
        </Typography>

        <Hidden mdUp>
          <IconButton
            sx={{
              color: '#333',
              '&:hover': {
                color: theme.palette.info.main,
                backgroundColor: '#fff',
              },
            }}
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Hidden mdDown>
          <div style={{ flexGrow: 1 }}>
            <NavLink href="/" style={{ marginRight: 12 }}>
              Home
            </NavLink>
            <NavLink href="/comic" style={{ marginRight: 12 }}>
              Comics
            </NavLink>
            <NavLink href="/illustrations" style={{ marginRight: 12 }}>
              Illustrations
            </NavLink>
            <NavLink
              href="https://egogala.storenvy.com/"
              style={{ marginRight: 12 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop
            </NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
          <NavLink href="https://twitter.com/ego_gala" target="_blank" rel="noopener noreferrer">
            <IconButton
              sx={{
                color: '#333',
                '@media (min-width: 900px)': {
                  '&:hover': {
                    color: theme.palette.info.main,
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              <TwitterIcon sx={{ marginRight: '10px' }} />
            </IconButton>
          </NavLink>
          <NavLink
            href="https://www.instagram.com/ego_gala/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              sx={{
                color: '#333',
                '@media (min-width: 900px)': {
                  '&:hover': {
                    color: theme.palette.info.main,
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              <InstagramIcon sx={{ marginRight: '10px' }} />
            </IconButton>
          </NavLink>
          <NavLink
            href="https://www.facebook.com/k10.shull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              sx={{
                color: '#333',
                '@media (min-width: 900px)': {
                  '&:hover': {
                    color: theme.palette.info.main,
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              <FacebookIcon sx={{ marginRight: '10px' }} />
            </IconButton>
          </NavLink>
          <NavLink
            href="https://www.reddit.com/user/ego_gala/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              sx={{
                color: '#333',
                '@media (min-width: 900px)': {
                  '&:hover': {
                    color: theme.palette.info.main,
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              <RedditIcon sx={{ marginRight: '10px' }} />
            </IconButton>
          </NavLink>
        </Hidden>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
