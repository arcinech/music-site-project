import {select, templates} from '../settings.js';
import {utils} from '../utils.js';
import Songs from './Songs.js';
import AudioPlugin from './AudioPlugin.js';
class Discovery{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;
    this.renderPage();
    this.renderRandomSong(songs, authors);
    this.initEvent(this.songs, this.authors);
  }

  renderPage(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.discovery);

    const generetedHTML = templates.discoveryPage();

    this.dom.wrapper.innerHTML = generetedHTML;
    this.dom.song = this.dom.wrapper.querySelector(select.all.songsWrapper);
  }

  renderRandomSong(songs, authors){
    // remove previous random song
    this.dom.song.innerHTML = '';
    const randomSong = Math.floor(Math.random()*this.songs.length);
    this.data = utils.songParams(songs[randomSong], authors);

    new Songs(this.data, this.dom.song);
    new AudioPlugin(select.discovery.initPlugin);
  }

  initEvent(songs, authors){
    const thisDiscovery = this;

    window.addEventListener('hashchange', function(){
      if(this.location.hash == '#/discover') thisDiscovery.renderRandomSong(songs, authors);
    });
  }

}

export default Discovery;
