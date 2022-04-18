import {select, templates} from '../settings.js';
import {utils} from '../utils.js';
import Song from './Song.js';
import AudioPlugin from './AudioPlugin.js';
class Discovery{
  constructor(songs, analysedCategory) {

    this.songs = songs;
    this.renderPage();
    this.renderRandomSong(analysedCategory);
    // this.initEvent();
  }

  renderPage(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.discovery);

    const generetedHTML = templates.discoveryPage();

    this.dom.wrapper.innerHTML = generetedHTML;
    this.dom.song = this.dom.wrapper.querySelector(select.all.songsWrapper);

    this.dom.title = this.dom.wrapper.querySelector(select.discovery.title);

    this.dom.title.textContent = this.dom.title.textContent.toUpperCase();
  }

  renderRandomSong(analysedCategory = null){
    // remove previous random song
    console.log(analysedCategory);
    this.dom.song.innerHTML = '';

    let songList = utils.filterSongs(analysedCategory, this.songs);
    let randomSong = Math.floor(Math.random()*songList.length);

    this.data = utils.songParams(songList[randomSong]);

    new Song(this.data, this.dom.song);
    new AudioPlugin(select.discovery.initPlugin);
  }
}

export default Discovery;
