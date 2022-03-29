import { select, templates } from '../settings.js';
import AudioPlugin from './AudioPlugin.js';
import Songs from './Songs.js';
import { utils } from '../utils.js';

class Home{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;
    console.log(authors);
    this.renderHome();
    this.getElements();
    this.renderSongs();

    new AudioPlugin(select.home.initPlugin);
  }

  renderHome(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.homePage);
    console.log(this.dom.wrapper);
    const generetedHTML = templates.homePage();
    console.log(generetedHTML);
    this.dom.wrapper.innerHTML = generetedHTML;
    console.log(this.dom.wrapper.innerHTML);
  }

  getElements(){
    this.dom.homeSongs = this.dom.wrapper.querySelector(select.home.song);
    this.dom.songWrapper = this.dom.wrapper.querySelector(select.all.songsWrapper);
  }

  renderSongs(){
    for(let song of this.songs){

      this.data = utils.songData(song, this.authors);

      new Songs(this.data, this.dom.songWrapper);
    }

  }

}

export default Home;
