
import {select} from '../settings.js';
class Discovery{
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

  getElements(element){

    this.dom = {};

    this.dom.wrapper = element;
    this.dom.input = this.dom.wrapper.querySelector(select.search.input);
    this.dom.button = this.dom.wrapper.querySelector(select.search.searchButton);
  }
}
