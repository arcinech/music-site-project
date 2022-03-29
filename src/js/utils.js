export const utils = {};


utils.findAuthor = function(song, authors){
  //return author name based on author id in songs database
  for(let name of authors){
    if(song.author == name.id) return name.author;
  }
};

utils.songData = function(song, authors){
  const data = {};
  data.title = song.title;
  data.author = utils.findAuthor(song, authors);
  data.filename = song.filename;
  data.categories = song.categories;
  data.ranking = song.ranking;

  return data;
};
