import initialState from '../store/initialState';
import {
  GET_ONE_RECIPE,
  GET_ONE_RECIPE_ERROR,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  EDIT_RECIPE,
  EDIT_RECIPE_ERROR,
  GET_FAVOURITE_STATUS
} from '../actions/actionTypes';

const getOneRecipe = (state = initialState.recipe, action) => {
  switch (action.type) {
    case GET_ONE_RECIPE:
      return {
        ...state,
        singleRecipe: action.recipe,
        errorMessage: '',
        reviews: []
      };
    case GET_ONE_RECIPE_ERROR:
      return {
        ...state,
        singleRecipe: null,
        errorMessage: true,
        reviews: []
      };
    case GET_FAVOURITE_STATUS:
      return {
        ...state,
        favourited: action.favouriteStatus,
      };
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: action.review,
        reviewError: ''
      };
    case GET_REVIEW_FAILURE:
      return {
        ...state,
        reviewError: action.message
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.review]
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        addReviewError: action.message
      };
    case UPVOTE_SUCCESS:
      return {
        ...state,
        singleRecipe: action.recipe,
        errorMessage: ''
      };
    case UPVOTE_FAILURE:
      return {
        ...state,
        errorMessage: action.message
      };
    case DOWNVOTE_SUCCESS:
      return {
        ...state,
        singleRecipe: action.recipe,
        errorMessage: ''
      };
    case DOWNVOTE_FAILURE:
      return {
        ...state,
        errorMessage: action.message
      };

    case EDIT_RECIPE:
      return {
        ...state,
        singleRecipe: action.recipe,
        editRecipeSuccess: 'Recipe Updated'
      };
    case EDIT_RECIPE_ERROR:
      return {
        ...state,
        editRecipeError: 'Unable to update recipe'
      };
    default:
      return state;
  }
};
export default getOneRecipe;
