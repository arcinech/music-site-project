class Songs{
  constructor(authors, song) {
    const thisSong = this;
    this.data = {};
    //this.author is reference to autor in autor db with id from songs db.author
    this.data.author = authors[song.author.id].author;
    this.data.song = song.title;
    this.data.filename = song.title;

    console.log(thisSong.data);
  }

}

export default Songs;
