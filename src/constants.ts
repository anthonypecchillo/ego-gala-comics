export const COMMON = {
  LOGO_TEXT: 'Ego Gala',
};

export const NAVBAR = {
  LOGO_TEXT: COMMON.LOGO_TEXT,
  LINKS: {
    NAVIGATION: [
      { href: '/', text: 'Home', iconName: 'Home' },
      { href: '/comic', text: 'Comics', iconName: 'Comic' },
      { href: '/illustrations', text: 'Illustrations', iconName: 'Illustrations' },
      { href: '/about', text: 'About', iconName: 'About' },
    ],
    SOCIAL: [
      { href: 'https://twitter.com/ego_gala', text: 'Twitter', iconName: 'Twitter' },
      { href: 'https://www.instagram.com/ego_gala/', text: 'Instagram', iconName: 'Instagram' },
      { href: 'https://www.facebook.com/k10.shull', text: 'Facebook', iconName: 'Facebook' },
      { href: 'https://www.reddit.com/user/ego_gala/', text: 'Reddit', iconName: 'Reddit' },
    ],
    STORE: [{ href: 'https://egogala.storenvy.com/', text: 'Shop', iconName: 'Shop' }],
  },
};

export const FOOTER = {
  COPYRIGHT_TEXT: '© 2023 Ego Gala. All rights reserved.',
  LOGO_TEXT: COMMON.LOGO_TEXT,
};
