import {select, templates, counter} from '../settings.js';
import {utils} from '../utils.js';
import Songs from './Songs.js';
import AudioPlugin from './AudioPlugin.js';
class Discovery{
  constructor(songs) {

    this.songs = songs;
    this.renderPage();
    this.renderRandomSong();
    this.initEvent();
  }

  renderPage(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.discovery);

    const generetedHTML = templates.discoveryPage();

    this.dom.wrapper.innerHTML = generetedHTML;
    this.dom.song = this.dom.wrapper.querySelector(select.all.songsWrapper);
  }

  mostPopular(counter){
    const maxObj = function(obj){
      const mappedValues = Math.max(...Object.values(obj));
      const asArray = Object.entries(obj);

      const categories = asArray.filter(([key, value]) => {
        if(value == mappedValues){
          return [key,value];
        }
      } );

      const category = Object.keys(Object.fromEntries(categories));
      return category;
    };

    const popular = maxObj(counter);
    const randomPopularCategory = Math.floor(Math.random()*popular.length);

    return popular[randomPopularCategory];
  }


  renderRandomSong(){
    // remove previous random song

    this.dom.song.innerHTML = '';

    let songList = this.songs;
    let randomSong = Math.floor(Math.random()*this.songs.length);

    // randomly select song from random maximum used equal categories
    if (Object.keys(counter).length > 0){
      const filter = this.mostPopular(counter);
      songList = utils.filterSongs(filter, this.songs);
      randomSong = Math.floor(Math.random()*songList.length);
    }

    this.data = utils.songParams(songList[randomSong]);

    new Songs(this.data, this.dom.song);
    new AudioPlugin(select.discovery.initPlugin);
  }

  initEvent(){
    const thisDiscovery = this;

    window.addEventListener('hashchange', function(){
      if(this.location.hash == '#/discover') thisDiscovery.renderRandomSong();
    });
  }

}

export default Discovery;
