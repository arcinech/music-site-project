import { select, templates } from '../settings.js';
import AudioPlugin from './AudioPlugin.js';
import Songs from './Songs.js';
import { utils } from '../utils.js';

class Home{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;

    this.renderHome();
    this.getElements();
    this.renderSongs(this.songs);
    this.categoryFilterParam(this.songs);
    new AudioPlugin(select.home.initPlugin);
    this.initAction();
  }

  renderHome(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.homePage);
    // console.log(this.dom.wrapper);
    const generetedHTML = templates.homePage();
    // console.log(generetedHTML);
    this.dom.wrapper.innerHTML = generetedHTML;
    // console.log(this.dom.wrapper.innerHTML);
  }

  getElements(){
    this.dom.songWrapper = this.dom.wrapper.querySelector(select.all.songsWrapper);
    this.dom.categoriesWrapper = this.dom.wrapper.querySelector(select.home.categoriesWrapper);
    this.dom.homeCategories = this.dom.wrapper.querySelector(select.containerOf.homeCategories);
  }

  renderSongs(data){

    for(let song of data){
      this.data = utils.songParams(song, this.authors);
      console.log(this.data);

      new Songs(this.data, this.dom.songWrapper);
    }

  }

  categoryFilterParam(songs){
    this.data.filter = [];

    //All objects with key cattegory should have value saved as array
    for(let song of songs){
      song.categories.map(element => this.data.filter.push(element));
    }
    //new set for unique only results
    this.data.filter = [...new  Set(this.data.filter)];
    // console.log(this.dom.wrapper);
    const generetedHTML = templates.categoryFilter(this.data.filter);
    console.log(generetedHTML);
    // console.log(generetedHTML);
    this.dom.homeCategories.innerHTML = generetedHTML;
    this.dom.categories = this.dom.wrapper.querySelectorAll(select.home.filterLinks);
    console.log(this.dom.categories);
  }

  initAction(){
    for (const category of this.dom.categories){
      category.addEventListener('click', function(event){
        event.preventDefault();
        const thisClick = this;
        //stop all green audio players
        // eslint-disable-next-line no-undef
        GreenAudioPlayer.stopOtherPlayers();
        // const category = this.getAttribute('href').replace('#','').toLowerCase();
        // if(this.classList.include(className.)){
        //   ;
        // }

      });
    }
  }
}

export default Home;
