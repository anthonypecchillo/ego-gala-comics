import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    {
      name: 'Twitter',
      icon: (
        <TwitterIcon
          style={{
            fontSize: 32,
            color: theme.palette.secondary.main,
          }}
        />
      ),
      url: 'https://twitter.com/ego_gala',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon style={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      url: 'https://www.instagram.com/ego_gala/',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon style={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      url: 'https://www.facebook.com/k10.shull',
    },
    {
      name: 'Reddit',
      icon: <RedditIcon style={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      url: 'https://www.reddit.com/user/ego_gala/',
    },
  ];

  return (
    <Container component="footer" disableGutters maxWidth={false}>
      <Grid
        container
        spacing={2}
        direction="column"
        style={{
          padding: '30px',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        }}
      >
        <Grid item container justifyContent="center">
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: 25 }}>
            Follow Ego Gala
            <hr style={{ width: '75%', margin: '10px auto' }} />
          </Typography>
        </Grid>
        <Grid item container spacing={2} justifyContent="center" sx={{ marginBottom: 3 }}>
          {socialLinks.map((social, index) => (
            <Grid
              item
              container
              xs={isMobile ? 12 : isTablet ? 6 : 3}
              key={index}
              justifyContent="center"
            >
              <Card
                style={{
                  display: 'flex',
                  // backgroundColor: theme.palette.secondary.main,
                  // backgroundColor: '#f7f6fa',
                  backgroundColor: '#e8e6f1',
                  width: 215,
                }}
              >
                <CardActionArea
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    color: '#222',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Avatar
                    style={{
                      width: 55,
                      height: 55,
                      margin: 10,
                      backgroundColor: theme.palette.primary.dark,
                    }}
                  >
                    {social.icon}
                  </Avatar>
                  <CardContent style={{ paddingLeft: 8 }}>
                    <Typography variant="h6">{social.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        item
        style={{
          padding: '24px',
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.secondary.main,
          alignItems: 'center',
        }}
      >
        <Grid item xs={6} sm={6}>
          <Typography variant="h4" align="left">
            Ego Gala
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant={isTablet ? 'body2' : 'body1'} align={isTablet ? 'center' : 'right'}>
            &copy; {new Date().getFullYear()} Ego Gala, All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
