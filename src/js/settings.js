export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const select = {
  containerOf: {
    pages: '#pages',
  },
  nav: {
    links: '.main-nav a',
  },
};


export const classNames = {
  pages: {
    active: 'active',
  },
};
