class Songs{
  constructor(id, data) {
    const thisSong = this;

    thisSong.id = id;
    thisSong.data = data;

    console.log(thisSong.data);
  }

}

export default Songs;
