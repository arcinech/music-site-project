import { select } from '../settings.js';
import AudioPlugin from './AudioPlugin.js';

class Home{
  constructor(songs, authors) {
    this.data = {};
    console.log(this.data[0]);
  }

  // render(data){
  // random song? maximum songs on home page 4?
  //   for(song of data){
  //     if(data[song] < )
  //   }
  // }

  getElements(){
    this.dom = {};
    this.dom.wrapper = document.querySelector(select.containerOf.home);
  }

}

export default Home;
