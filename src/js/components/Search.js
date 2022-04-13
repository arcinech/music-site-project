/* eslint-disable no-unused-vars */

import {select, templates} from '../settings.js';
import { utils } from '../utils.js';
import Song from './Songs.js';
import AudioPlugin from './AudioPlugin.js';

class Search{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;

    this.renderSearch();
    this.getElements();
    this.initAction();

  }

  getElements(){
    this.dom.songWrapper = this.dom.wrapper.querySelector(select.all.songsWrapper);
    this.dom.searchButton = this.dom.wrapper.querySelector(select.search.searchButton);
    this.dom.searchInput = this.dom.wrapper.querySelector(select.search.input);
    this.dom.searchMessage = this.dom.wrapper.querySelector(select.search.message);
    this.dom.select = this.dom.wrapper.querySelector('select');

    this.dom.searchButton.textContent = this.dom.searchButton.textContent.toUpperCase();

  }

  renderSearch(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.search);
    //
    const options={};
    for(let category of this.categoryList()){

      options[category] = {};
      options[category].label = category;
    }

    const generetedHTML = templates.searchPage(options);
    //
    this.dom.wrapper.innerHTML = generetedHTML;
    //
  }

  searchMessage(count){
    const thisSearch = this;
    console.log('count', thisSearch.dom.searchMessage);
    if (count > 1){
      utils.printMessage(`We have found ${count} songs...`, thisSearch.dom.searchMessage);
    } else if (count == 1) {
      utils.printMessage(`We have found 1 song...`, thisSearch.dom.searchMessage);
    } else {
      utils.printMessage(`We haven't found any song...`, thisSearch.dom.searchMessage);
    }

  }
  initAction(){
    const thisSearch = this;
    //press search button when pressing enter
    this.dom.searchInput.addEventListener('keypress', function(event) {
      if (event.which === 13) {
        event.preventDefault();
        thisSearch.dom.searchButton.click();
      }
    });

    this.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      const search = thisSearch.dom.searchInput.value;

      utils.clearInnerHTML(thisSearch.dom.searchMessage);
      thisSearch.initSearch(search);
      utils.clearInnerHTML(thisSearch.dom.searchInput);
    });

    window.addEventListener('hashchange', function(){
      if(this.location.hash == '#/search'){
        utils.clearInnerHTML(thisSearch.dom.songWrapper);
        utils.clearInnerHTML(thisSearch.dom.searchMessage);
      }
    });

  }
  filterSongs(filter){
    let songList = [];
    for(let song of this.songs){
      if(song.categories.includes(filter)){
        songList.push(song);
      }
    }
    return songList;
  }


  initSearch(searchText){
    const thisSearch =  this;

    const selectedCategory = this.dom.select.value;
    let songList = [];

    if (selectedCategory){
      songList = utils.filterSongs(selectedCategory, thisSearch.songs);
    } else songList = thisSearch.songs;

    songList = this.filterSongByString(searchText, songList);

    this.searchMessage(songList.length);
    thisSearch.renderSongs(songList);
  }

  filterSongByString(searchText, songList){
    let filterByAutor = [];
    let filterByTitle = [];
    if (searchText){
      for(let song of songList){
        if(song.author.name.toUpperCase().includes(searchText.toUpperCase())){
          filterByAutor.push(song);
        }
        if(song.title.toUpperCase().includes(searchText.toUpperCase())){
          filterByTitle.push(song);
        }
      }
      return utils.combineArrays(filterByAutor,filterByTitle);
    }
    return songList;
  }

  categoryList() {
    const categoryList = [];
    for(let song of this.songs){
      song.categories.map(element => categoryList.push(element));
    }

    return categoryList;
  }

  renderSongs(songList){
    utils.clearInnerHTML(this.dom.songWrapper);

    for(let song of songList){
      this.data = {};
      this.data = utils.songParams(song);


      new Song(this.data, this.dom.songWrapper);
    }

    new AudioPlugin(select.search.initPlugin);

  }
}
export default Search;
