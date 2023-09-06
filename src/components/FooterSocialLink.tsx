import React from 'react';

import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Icon from './Icon';

interface FooterSocialLinkProps {
  href: string;
  iconName: string;
  text: string;
}

const FooterSocialLink = ({ href, iconName, text }: FooterSocialLinkProps) => {
  const theme = useTheme();

  const cardStyles = {
    display: 'flex',
    backgroundColor: theme.palette.primary.light,
    width: '215px',
  };

  const cardActionAreaStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  };

  const avatarStyles = {
    width: '55px',
    height: '55px',
    margin: '10px',
    backgroundColor: theme.palette.primary.dark,
  };

  const cardContentStyles = {
    paddingLeft: '8px',
  };

  return (
    <Grid item container xs={12} sm={6} md={3} key={href} justifyContent="center">
      <Card sx={cardStyles}>
        <CardActionArea
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={cardActionAreaStyles}
        >
          <Avatar sx={avatarStyles}>
            <Icon iconName={iconName} fontSize="32px" />
          </Avatar>
          <CardContent sx={cardContentStyles}>
            <Typography variant="h6">{text}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default FooterSocialLink;
