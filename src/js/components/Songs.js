import { templates } from '../settings.js';

class Songs{
  constructor(data, element) {
    this.data = data;
    this.renderSong(element);
  }

  renderSong(element){

    const generetedHTML = templates.musicPlayer(this.data);

    element.innerHTML = element.innerHTML + generetedHTML;
  }

}

export default Songs;
