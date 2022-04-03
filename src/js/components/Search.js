/* eslint-disable no-unused-vars */

import {select, settings, templates} from '../settings.js';
import { utils } from '../utils.js';
import Songs from './Songs.js';
import AudioPlugin from './AudioPlugin.js';
class Search{
  constructor(songs, authors) {
    this.songs = songs;
    this.authors = authors;
    // console.log(this.data);
    this.renderSearch();
    this.getElements();
    this.initAction();

  }

  getElements(){
    this.dom.songWrapper = this.dom.wrapper.querySelector(select.all.songsWrapper);
    this.dom.searchButton = this.dom.wrapper.querySelector(select.search.searchButton);
    this.dom.searchInput = this.dom.wrapper.querySelector(select.search.input);
    this.dom.searchMessage = this.dom.wrapper.querySelector(select.search.message);
    console.log(this.dom.searchMessage);
  }

  renderSearch(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.search);
    // console.log(this.dom.wrapper);
    const generetedHTML = templates.searchPage();
    // console.log(generetedHTML);
    this.dom.wrapper.innerHTML = generetedHTML;
    // console.log(this.dom.wrapper.innerHTML);
  }

  initAction(){
    const thisSearch = this;
    this.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      utils.clearInnerHTML(thisSearch.dom.songWrapper);
      utils.clearInnerHTML(thisSearch.dom.searchMessage);
      const search = thisSearch.dom.searchInput.value;
      console.log(search);
      if(search){
        utils.printMessage('We found this songs...', thisSearch.dom.searchMessage);
        thisSearch.getData(search);
      } else {
        utils.printMessage('We did no find any songs', thisSearch.dom.searchMessage);
      }


      utils.clearInnerHTML(thisSearch.dom.searchInput);
    });

    window.addEventListener('hashchange', function(){
      if(this.location.hash == '#/search'){
        utils.clearInnerHTML(thisSearch.dom.songWrapper);
        utils.clearInnerHTML(thisSearch.dom.searchMessage);
      }
    });
  }

  getData(searchText){
    const thisSearch = this;
    thisSearch.filteredData = [];

    const urls = {
      songs   : settings.db.url + '/' + settings.db.songs + '?title_like=' + searchText,
      authors : settings.db.url + '/' + settings.db.authors + '?name_like=' + searchText,
    };

    Promise.all([
      fetch(urls.songs),
      fetch(urls.authors)
    ])
      .then(function(allResponses){
        const matchingSongsTitles = allResponses[0];
        const matchingAuthorsNames = allResponses[1];
        return Promise.all([
          matchingSongsTitles.json(),
          matchingAuthorsNames.json(),
        ]);})
      .then(function([matchingSongs, matchingAuthors]){

        let songsByAuthor = [];
        // loop for return list of songs that have found author
        for(let checkAuthor of matchingAuthors) {
          const filter = thisSearch.songs.filter((song) => {
            console.log(song);
            return song.authorId == checkAuthor.id;
          });
          filter.forEach(object => {
            songsByAuthor.push(object);
          });
        }
        return utils.combineArrays(matchingSongs,songsByAuthor);
      })
      .then(function(songList){
        console.log(songList);
        thisSearch.renderSongs(songList);
      });
  }

  renderSongs(songList){

    for(let song of songList){
      this.data = {};
      this.data = utils.songParams(song, this.authors);

      new Songs(this.data, this.dom.songWrapper);
    }

    new AudioPlugin(select.search.initPlugin);

  }
}
export default Search;
