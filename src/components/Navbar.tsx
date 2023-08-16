import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from 'next/link';
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

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
      <List
        subheader={<ListSubheader component="div">Navigation</ListSubheader>}
      >
        <ListItem button>
          <NavLink href="/">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink href="/comic">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Comic" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink href="/about">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </NavLink>
        </ListItem>
      </List>
      <List
        subheader={<ListSubheader component="div">Social Media</ListSubheader>}
      >
        <ListItem button>
          <NavLink href="https://twitter.com/ego_gala">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink href="https://www.instagram.com/ego_gala/">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <InstagramIcon />
            </ListItemIcon>
            <ListItemText primary="Instagram" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink href="https://www.facebook.com/k10.shull">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <FacebookIcon />
            </ListItemIcon>
            <ListItemText primary="Facebook" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <NavLink href="https://www.reddit.com/user/ego_gala/">
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <RedditIcon />
            </ListItemIcon>
            <ListItemText primary="Reddit" />
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

        <Typography variant="h6" sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          marginRight: {
            md: '20px',
            sm: '0',
          },
          textAlign: {
            md: 'left',
            sm: 'center',
          },
          flexGrow: {
            md: '0',
            sm: '1',
          },
        }}>
          Ego Gala
        </Typography>
        <Hidden mdDown>
          <div style={{ flexGrow: 1 }}>
            <NavLink href="/" style={{ marginRight: 10}}>Home</NavLink>
            <NavLink href="/comic" style={{ marginRight: 10}}>Comic</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
          <NavLink
            href="https://twitter.com/ego_gala"
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
