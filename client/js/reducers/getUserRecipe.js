import initialState from '../store/initialState';
import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR
} from '../actions/actionTypes';

const getUserRecipe = (state = initialState.recipe, action) => {
  switch (action.type) {
    case GET_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.recipes,
        getUserRecipeError: false
      };
    case GET_USER_RECIPES_ERROR:
      return {
        ...state,
        userRecipes: [],
        getUserRecipeError: true
      };
    case DELETE_RECIPE:
      return {
        ...state,
        userRecipes: state.userRecipes.filter(recipe => recipe.id !== action.recipeId)
      };
    case DELETE_RECIPE_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default getUserRecipe;
