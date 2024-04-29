export const COMMON = {
  LOGO_TEXT: 'K. Shull',
  SOCIAL_LINKS: [
    { href: 'https://twitter.com/ego_gala', text: 'Twitter', iconName: 'Twitter' },
    { href: 'https://www.instagram.com/ego_gala/', text: 'Instagram', iconName: 'Instagram' },
    { href: 'https://www.facebook.com/k10.shull', text: 'Facebook', iconName: 'Facebook' },
    { href: 'https://www.reddit.com/user/ego_gala/', text: 'Reddit', iconName: 'Reddit' },
  ],
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
    SOCIAL: COMMON.SOCIAL_LINKS,
    STORE: [{ href: 'https://egogala.storenvy.com/', text: 'Shop', iconName: 'Shop' }],
  },
};

export const FOOTER = {
  COPYRIGHT_TEXT: `© ${new Date().getFullYear()} ${COMMON.LOGO_TEXT}, All Rights Reserved`,
  LOGO_TEXT: COMMON.LOGO_TEXT,
  LINKS: {
    SOCIAL: COMMON.SOCIAL_LINKS,
  },
  SOCIAL_HEADING: 'Follow Ego Gala',
};
