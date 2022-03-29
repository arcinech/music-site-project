import { settings, select, classNames } from './settings.js';
import Home from './components/home.js';
import Songs from './components/Songs.js';

const app = {
  initData: function(){
    const thisApp = this;
    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(songs){
        console.log(thisApp);
        thisApp.data.songs = songs;

        thisApp.initHome(thisApp.data.songs);
        thisApp.initSearch(thisApp.data)
      });
  },
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    console.log(idFromHash);

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
    const thisApp = this;

    for(let songData in thisApp.data.songs){
      new Songs(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
    }
  },

  initPlugin: function(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  },

  initSearch: function(){
    const searchWrapper = document.querySelector(select.containerOf.search);
    new Search(searchWrapper);
  },

  init: function(){
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.initPlugin();
  }
};

app.init();
