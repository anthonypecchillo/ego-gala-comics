import React from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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

interface IconProps {
  iconName: string;
  fontSize?: string;
}

const IconMap: Record<string, React.ElementType> = {
  Menu: MenuIcon,
  Home: HomeIcon,
  Comic: ImportContactsIcon,
  Illustrations: PaletteIcon,
  About: InfoIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Reddit: RedditIcon,
  Shop: ShoppingCartIcon,
};

const Icon = ({ iconName, fontSize }: IconProps) => {
  const IconComponent = IconMap[iconName] || ErrorOutlineIcon;
  return <IconComponent sx={{ fontSize }} />;
};

export default Icon;
