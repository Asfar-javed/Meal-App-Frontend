

export const Complexity = {
    SIMPLE: 'simple',
    CHALLENGING: 'challenging',
    HARD: 'hard',
  };
  
  export const Affordability = {
    AFFORDABLE: 'affordable',
    PRICEY: 'pricey',
    LUXURIOUS: 'luxurious',
  };
  
  export class Meal {
    constructor({
      id,
      categories,
      title,
      imageUrl,
      ingredients,
      steps,
      duration,
      complexity,
      affordability,
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian,
    }) {
      this.id = id;
      this.categories = categories;
      this.title = title;
      this.imageUrl = imageUrl;
      this.ingredients = ingredients;
      this.steps = steps;
      this.duration = duration;
      this.complexity = complexity;
      this.affordability = affordability;
      this.isGlutenFree = isGlutenFree;
      this.isLactoseFree = isLactoseFree;
      this.isVegan = isVegan;
      this.isVegetarian = isVegetarian;
    }
  }
  