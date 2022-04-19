class AudioPlugin{
  constructor(element){
    this.initPlugin(element);
  }

  initPlugin(element){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: element, // inits Green Audio Player on each audio container that has class "element"
      stopOthersOnPlay: true
    });
  }
}

export default AudioPlugin;
