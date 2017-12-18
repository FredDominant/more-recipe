import initialState from '../store/initialState';
import {
  GET_FAVOURITES,
  GET_FAVOURITES_ERROR,
  DELETE_FAVOURITE,
  DELETE_FAVOURITE_ERROR
} from '../actions/actionTypes';

const getFavourites = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_FAVOURITES:
      return {
        ...state,
        userFavourites: action.favourites,
        getFavouritesError: false
      };
    case GET_FAVOURITES_ERROR:
      return {
        ...state,
        getFavouritesError: true
      };
    case DELETE_FAVOURITE:
      return {
        ...state,
        userFavourites: state.userFavourites.filter(recipe => recipe.recipeId !== action.recipeId),
        deleteFavouritesError: false
      };
    case DELETE_FAVOURITE_ERROR:
      return {
        ...state,
        deleteFavouritesError: true
      };
    default:
      return state;
  }
};
export default getFavourites;
