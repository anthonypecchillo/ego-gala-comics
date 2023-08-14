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
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(1, 1, 1, 0.4);
`;

const NavLink = styled.a`
  color: #333;
  margin-right: 10px;
  text-decoration: none;
  align-items: center;
  @media (min-width: 900px) {
    &:hover {
      color: #73e10a;
    }
  }
  @media (max-width: 899px) {
    display: flex;
    margin-right: 0;
  }
`;

const StyledIcon = styled(IconButton)`
  color: #333;
  @media (min-width: 900px) {
    &:hover {
      color: #73e10a;
      background-color: #fff;
    }
  }
`;

const StyledMenuIcon = styled(StyledIcon)`
  color: #333;
`;

const CompanyName = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  @media (max-width: 899px) {
    margin-right: 0;
    text-align: center;
    flex-grow: 1;
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
    <StyledAppBar position="sticky">
      <Toolbar>
        <Hidden mdUp>
          <StyledMenuIcon
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </StyledMenuIcon>
        </Hidden>
        <CompanyName variant="h6">Ego Gala</CompanyName>
        <Hidden mdDown>
          <div style={{ flexGrow: 1 }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/comic">Comic</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
          <StyledIcon
            edge="end"
            href="https://twitter.com/ego_gala"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon sx={{ marginRight: '10px' }} />
          </StyledIcon>
          <StyledIcon
            edge="end"
            href="https://www.instagram.com/ego_gala/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon sx={{ marginRight: '10px' }} />
          </StyledIcon>
          <StyledIcon
            edge="end"
            href="https://www.facebook.com/k10.shull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon sx={{ marginRight: '10px' }} />
          </StyledIcon>
          <StyledIcon
            edge="end"
            href="https://www.reddit.com/user/ego_gala/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RedditIcon sx={{ marginRight: '10px' }} />
          </StyledIcon>
        </Hidden>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar;
