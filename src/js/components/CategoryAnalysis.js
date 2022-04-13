class CategoryAnalysis{
  constructor(params) {
    return {popularCategory : this.mostPopular(params)};
  }
  mostPopular(counter){
    const maxObj = function(obj){
      const mappedValues = Math.max(...Object.values(obj));
      const asArray = Object.entries(obj);

      const categories = asArray.filter(([key, value]) => {
        if(value == mappedValues){
          return [key,value];
        }
      } );

      const category = Object.keys(Object.fromEntries(categories));
      return category;
    };

    const popular = maxObj(counter);
    const randomPopularCategory = Math.floor(Math.random()*popular.length);

    return popular[randomPopularCategory];
  }

}

export default CategoryAnalysis;
