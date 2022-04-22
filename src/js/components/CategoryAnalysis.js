class CategoryAnalysis{
  constructor() {
    return this;
  }

  selectByWeight(counter) {
    let total = 0;

    //Total amount of categories played
    Object.values(counter).forEach(function(k) {
      total += k;
    });

    let weightedRandom = Math.floor(Math.random() * total);
    let selected;
    let count = 0;

    //Select category based on weighted random distribution.
    Object.keys(counter).forEach( k => {
      count += counter[k];

      if (count > weightedRandom && !selected) {
        selected = k;
      }
    });

    return selected;
  }

}

export default CategoryAnalysis;
