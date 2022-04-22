import { settings, select, classNames } from './settings.js';
import Home from './components/home.js';
import Discovery from './components/Discovery.js';
import Search from './components/Search.js';

const app = {

  initSplash: function(){
    this.splashTitle = document.querySelector(select.splash.title);
    this.splashSubtitle = document.querySelector(select.splash.subtitle);
    console.log(this.splashSubtitle, this.splashTitle);

    this.splashTitle.textContent = this.splashTitle.textContent.toUpperCase();
    this.splashSubtitle.textContent = this.splashSubtitle.textContent.toUpperCase();
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    for (let links of thisApp.navLinks){
      links.textContent = links.textContent.toUpperCase();
    }
    const idFromHash = window.location.hash.replace('#/', '');
    //

    let pageMatchingHash = thisApp.pages[0].id;

    for(const page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }

  },
  initData: function(){
    const thisApp = this;
    thisApp.songData = {};
    thisApp.authorData = {};

    const urls = {
      songs:    settings.db.url + '/' + settings.db.songs + '?_expand=author',
      authors:  settings.db.url + '/' + settings.db.authors
    };

    Promise.all([
      fetch(urls.songs),
      fetch(urls.authors),
    ])
      .then(function(allResponses){
        const songResponses = allResponses[0];
        const authorsResponses = allResponses[1];
        return Promise.all([
          songResponses.json(),
          authorsResponses.json(),
        ]);
      })
      .then(function([songs, authors]){
        thisApp.songs = songs;
        thisApp.authors = authors;

        thisApp.initHome();
        thisApp.initSearch();
        thisApp.initDiscovery();
      });
  },

  activatePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle(
        classNames.pages.active,
        page.id == pageId
      );
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.pages.active,
        link.getAttribute('href')  == '#' + pageId
      );
    }
  },

  initHome: function(){
    new Home(this.songs, this.authors);

  },

  initDiscovery: function(){
    new Discovery(this.songs);

  },

  initSearch: function(){
    new Search(this.songs, this.authors);
  },

  init: function(){
    const thisApp = this;

    thisApp.initSplash();
    thisApp.initData();
    thisApp.initPages();
  }
};

app.init();
