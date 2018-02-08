import Validator from 'validator';
import isEmpty from 'lodash.isempty';

const recipeValidator = (recipe) => {
  const errors = {};
  if (Validator.isEmpty(recipe.name)) {
    errors.name = 'Recipe name shouldn\'t be empty';
  }
  if (!Validator.isAlpha(recipe.name.charAt(0))) {
    errors.name = 'Recipe name should be alphabets';
  }
  if (!Validator.isLength(recipe.name, { min: 2, max: 50 })) {
    errors.name = 'Recipe name should be between 2 and 50 characters';
  }
  if (Validator.isEmpty(recipe.description)) {
    errors.description = 'Recipe should have a decription';
  }
  if (!Validator.isAlpha(recipe.description.charAt(0))) {
    errors.description = 'Recipe description should be alphabets';
  }
  if (!Validator.isLength(recipe.description, { min: 5, max: 50 })) {
    errors.description = 'Recipe description should be between 5 and 50 characters';
  }
  if (Validator.isEmpty(recipe.directions)) {
    errors.directions = 'Recipe should have cook directions';
  }
  if (!Validator.isLength(recipe.directions, { min: 5 })) {
    errors.directons = 'This recipe needs directions to cook';
  }
  if (Validator.isEmpty(recipe.ingredients)) {
    errors.ingredients = 'Ingredients should have at least 1 item';
  }
  if (!Validator.isLength(recipe.ingredients, { min: 5 })) {
    errors.ingredients = 'Recipe should have ingredients to cook';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default recipeValidator;
