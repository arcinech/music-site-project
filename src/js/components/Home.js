import { select, templates, classNames } from '../settings.js';
import AudioPlugin from './AudioPlugin.js';
import Song from './Songs.js';
import { utils } from '../utils.js';

class Home{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;

    this.renderHome();
    this.getElements();
    this.renderSongs(this.songs);
    this.renderCategories(this.songs);
    this.initAction();
  }

  renderHome(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.homePage);

    const generetedHTML = templates.homePage();

    this.dom.wrapper.innerHTML = generetedHTML;

  }

  getElements(){
    this.dom.songWrapper = this.dom.wrapper.querySelector(select.all.songsWrapper);
    this.dom.categoriesWrapper = this.dom.wrapper.querySelector(select.home.categoriesWrapper);
    this.dom.homeCategories = this.dom.wrapper.querySelector(select.containerOf.homeCategories);
    this.dom.joinButton = this.dom.wrapper.querySelector(select.home.joinButton);

    this.dom.joinButton.textContent = this.dom.joinButton.textContent.toUpperCase();
  }

  renderSongs(data){
    this.dom.songWrapper.innerHTML = '';
    for(let song of data){
      this.data = utils.songParams(song);


      new Song(this.data, this.dom.songWrapper);
    }
    new AudioPlugin(select.home.initPlugin);
  }

  renderCategories(songs){
    this.data.filter = [];

    //All objects with key cattegory should have value saved as array
    for(let song of songs){
      song.categories.map(element => this.data.filter.push(element));
    }
    //new set for unique only results
    this.data.filter = [...new  Set(this.data.filter)];

    const generetedHTML = templates.categoryFilter(this.data.filter);


    this.dom.homeCategories.innerHTML = generetedHTML;
    this.dom.categories = this.dom.wrapper.querySelectorAll(select.home.filterLinks);

  }

  initAction(){
    const thisHome = this;
    for (const category of this.dom.categories){
      category.addEventListener('click', function(event){
        event.preventDefault();
        const thisClick = event.target;
        //stop all green audio players using GreenAudioPlayer method
        // eslint-disable-next-line no-undef
        GreenAudioPlayer.stopOtherPlayers();
        const category = thisClick.getAttribute(select.all.href).replace('#','');
        if(thisClick.classList.contains(classNames.home.filterSelected)){
          thisClick.classList.remove(classNames.home.filterSelected);
          thisHome.renderSongs(thisHome.songs);
        } else {
          for(const links of thisHome.dom.categories){
            links.classList.remove(classNames.home.filterSelected);
          }
          thisClick.classList.add(classNames.home.filterSelected);

          thisHome.renderSongs(thisHome.filterSongs(category));
        }

      });
    }


  }

  filterSongs(filter){
    let songList = [];
    const normalizedFilter = utils.firstLetterUpperCase(filter);
    for(let song of this.songs){
      if(song.categories.includes(normalizedFilter)){
        songList.push(song);
      }
    }
    return songList;
  }
}



export default Home;
