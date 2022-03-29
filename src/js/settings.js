export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const select = {
  templateOf: {
    homePage: '#template-home-page',
    discoverPage: '#template-discover-page',
    musicPlayer: '#template-music-player',
    searchPage: '#template-search-page',
  },
  containerOf: {
    pages: '#pages',
    home: '.home',
    search: '.search',
    discovery: '.search'
  },
  nav: {
    links: '.main-nav a',
  },
  home: {
    button: '.btn-home',
  },
  splash: {
    title: '.splash-title',
    subtitle: '.splash-subtitle',
  },
  search: {
    input: 'input',
    searchButton: '.btn-search',
  }

};


export const classNames = {
  pages: {
    active: 'active',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templatesOf.homePage)),
  searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage)),
  discoveryPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage)),
  musicPlayer: Handlebars.compile(document.querySelector(select.templateOf.musicPlayer)),
};
