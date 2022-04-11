export const utils = {};

utils.songParams = function(song){
  const params = {};
  params.title = song.title;
  params.author = song.author.name;
  params.filename = song.filename;
  params.categoriesClass = [...song.categories].map(element => element.toLowerCase());
  params.categories = song.categories.join(', ');
  params.ranking = song.ranking;

  return params;
};

utils.combineArrays = function(arrayOne, arrayTwo){

  let array = [...arrayOne, ...arrayTwo];

  //double loop for finding all duplicates of objects based on id

  for (let i = 0; i < array.length; i++){
    for(let j = i+1; j < array.length; j++){
      if(array[i].id == array[j].id){
        array.splice(j,1);
      }
    }
  }

  return array;
};

utils.printMessage = function(msg, element){
  console.log(msg,  element);
  let div = document.createElement('div');
  div.textContent = msg;
  element.appendChild(div);
  console.log(div);
};

utils.clearInnerHTML= function(element){
  element.innerHTML = '';
};

utils.firstLetterUpperCase = function(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
};

utils.filterSongs = function(filter, songs){
  let songList = [];
  for(let song of songs){
    if(song.categories.includes(filter)){
      songList.push(song);
    }
  }
  return songList;
};

