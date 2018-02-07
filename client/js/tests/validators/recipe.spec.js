import recipeValidator from '../../validation/recipeValidator';

describe('Test for recipe validator should', () => {
  it('work', () => {
    const invalidRecipe = {
      name: '',
      description: '',
      directions: '',
      ingredients: ''
    };
    expect(recipeValidator(invalidRecipe).errors).toBeTruthy();
    expect(recipeValidator(invalidRecipe).isValid).toEqual(false);
  });
});
