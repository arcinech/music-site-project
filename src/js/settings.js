export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
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
    homePage: '.home-page',
    search: '.search-page',
    discovery: '.discover'
  },
  all: {
    songsWrapper: '.songs',
  },
  nav: {
    links: '.main-nav a',
  },
  home: {
    songs: '#home-song',
    button: '.btn-home',
    initPlugin: '.home-page .player'
  },
  discovery: {
    initPlugin: '.discover .player'
  },
  splash: {
    title: '.splash-title',
    subtitle: '.splash-subtitle',
  },
  search: {
    input: 'input[name="search-bar"]',
    searchButton: '.btn-search',
    initPlugin: '.search-page .player',
    message: '.search-message',
  }

};


export const classNames = {
  pages: {
    active: 'active',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage).innerHTML),
  discoveryPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage).innerHTML),
  musicPlayer: Handlebars.compile(document.querySelector(select.templateOf.musicPlayer).innerHTML),
};
