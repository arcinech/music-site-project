
import {select, settings} from '../settings.js';
class Search{
  constructor(data, element) {
    this.data = data;

  }

  renderSongs(data){

  }

  filterSongs(searchText, data){

    for(let song of data){
      if(song.title.includes(searchText)){
        this.renderSongs(data);
      }
    }
  }
  initSearch(){

  }

  getData(searchText){
    this.data = {};

    const urls = {
      songs   : settings.db.url + '/' + settings.db.songs,
      authors : settings.db.url + '/' + settings.db.authors,
    };


    fetch(urls)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(songs){
        this.filterSongs(searchText, songs);
      });
  }

  getElements(element){

    this.dom = {};

    this.dom.wrapper = element;
    this.dom.input = this.dom.wrapper.querySelector(select.search.input);
    this.dom.button = this.dom.wrapper.querySelector(select.search.searchButton);
  }
}
