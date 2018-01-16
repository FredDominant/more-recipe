import initialState from '../store/initialState';
import { GET_TOP_RECIPES, GET_TOP_RECIPES_ERROR } from '../actions/actionTypes';

const topRecipes = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_TOP_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
        failure: ''
      };
    case GET_TOP_RECIPES_ERROR:
      return {
        ...state,
        failure: action.message
      };

    default:
      return state;
  }
};

export default topRecipes;
