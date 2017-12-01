import { ADD_RECIPE, RECIPE_ERROR } from '../actions/actionTypes';
import initialState from '../store/initialState';

const addRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        addRecipeErrorMessage: null,
        newRecipe: action.newRecipe
      };
    case RECIPE_ERROR:
      return {
        ...state,
        addRecipeErrorMessage: action.addRecipeErrorMessage
      };
    default:
      return state;
  }
};
export default addRecipe;
