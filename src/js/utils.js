export const utils = {};


utils.findAuthor = function(song, authors){
  //return author name based on author id in songs database
  return authors.find(element => element.id == song.authorId).name;
};

utils.songParams = function(song, authors){
  const params = {};
  params.title = song.title;
  params.author = utils.findAuthor(song, authors);
  params.filename = song.filename;
  params.categories = song.categories.join(', ');
  params.ranking = song.ranking;

  return params;
};

utils.combineArrays = function(arrayOne, arrayTwo){
  console.log(arrayOne, arrayTwo);
  let array = [...arrayOne, ...arrayTwo];

  //double loop for finding all duplicates of objects based on id

  for (let i = 0; i < array.length; i++){
    for(let j = i+1; j < array.length; j++){
      if(array[i].id == array[j].id){
        array.splice(j,1);
      }
    }
  }
  console.log(array);
  return array;
};

utils.printMessage = function(msg, element){
  let div = document.createElement('div');
  div.innerHTML = msg;
  console.log(element);
  element.appendChild(div);
};

utils.clearInnerHTML= function(element){
  element.innerHTML = '';
};
