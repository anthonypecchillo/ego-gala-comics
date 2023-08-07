import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Facebook, Twitter, Instagram, Reddit } from '@mui/icons-material';
import styled from 'styled-components';

const SocialBox = styled.a`
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  justify-items: center;
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const SocialAvatar = styled(Avatar)`
  width: 55px;
  height: 55px;
  margin-right: 10px;
`;

const Footer: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter style={{ fontSize: 32 }} />,
      url: 'https://twitter.com/ego_gala',
    },
    {
      name: 'Instagram',
      icon: <Instagram style={{ fontSize: 32 }} />,
      url: 'https://www.instagram.com/ego_gala/',
    },
    {
      name: 'Facebook',
      icon: <Facebook style={{ fontSize: 32 }} />,
      url: 'https://www.facebook.com/k10.shull',
    },
    {
      name: 'Reddit',
      icon: <Reddit style={{ fontSize: 32 }} />,
      url: 'https://www.reddit.com/user/ego_gala/',
    },
  ];

  return (
    <Container
      component="footer"
      disableGutters
      style={{ backgroundColor: '#222' }}
    >
      <Grid
        container
        spacing={5}
        direction="column"
        style={{ padding: '45px', backgroundColor: '#555', color: '#fff' }}
      >
        <Grid item container justifyContent="center">
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
            Follow Ego Gala
            <hr style={{ width: '75%', margin: '10px auto' }} />
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          justifyContent="center"
          style={{ margin: '0 10px' }}
        >
          {socialLinks.map((social, index) => (
            <Grid item xs={isTablet ? 6 : 3} key={index}>
              <SocialBox href={social.url}>
                <SocialAvatar>{social.icon}</SocialAvatar>
                <Typography variant="h5">{social.name}</Typography>
              </SocialBox>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        item
        style={{
          padding: '24px',
          backgroundColor: '#111',
          color: '#fff',
          alignItems: 'center',
        }}
      >
        <Grid item xs={6} sm={6}>
          <Typography variant="h4" align="left">
            Ego Gala
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography
            variant={isTablet ? 'body2' : 'body1'}
            align={isTablet ? 'center' : 'right'}
          >
            &copy; {new Date().getFullYear()} Ego Gala, All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
