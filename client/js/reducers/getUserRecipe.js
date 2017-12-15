import initialState from '../store/initialState';
import { GET_USER_RECIPES, GET_USER_RECIPES_ERROR } from '../actions/actionTypes';

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
        getUserRecipe: true
      };
    default:
      return state;
  }
};
export default getUserRecipe;
