import { settings } from './settings';

const app = {
  initData: function(){
    this.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(songs){
        this.data.songs = songs;
      });
  },

  init: function(){

    this.initData();
  }
};

app.init();
