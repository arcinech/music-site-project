import {select, templates} from '../settings.js';
import {utils} from '../utils.js';
import Songs from './Songs.js';
import AudioPlugin from './AudioPlugin.js';
class Discovery{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;
    this.renderPage();
    this.renderRandomSong(this.songs, this.authors);

    new AudioPlugin(select.discovery.initPlugin);
  }

  renderPage(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.discovery);
    console.log(this.dom.wrapper);
    const generetedHTML = templates.discoveryPage();
    this.dom.wrapper.innerHTML = generetedHTML;
    this.dom.song = this.dom.wrapper.querySelector(select.all.songsWrapper);
  }

  renderRandomSong(songs, authors){
    const randomSong = Math.floor(Math.random()*(this.songs.length + 1));

    this.data = utils.songData(songs[randomSong], authors);

    new Songs(this.data, this.dom.song);
  }

}

export default Discovery;
