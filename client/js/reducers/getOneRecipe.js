import initialState from '../store/initialState';
import {
  GET_ONE_RECIPE,
  GET_ONE_RECIPE_ERROR,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE
} from '../actions/actionTypes';

const getOneRecipe = (state = initialState.recipe, action) => {
  switch (action.type) {
    case GET_ONE_RECIPE:
      return {
        ...state,
        singleRecipe: action.recipe,
        errorMessage: ''
      };
    case GET_ONE_RECIPE_ERROR:
      return {
        ...state,
        singleRecipe: null,
        errorMessage: action.error
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
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        singleRecipe: action.review
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state.singleRecipe,
        addReviewError: action.message
      };
    default:
      return state;
  }
};
export default getOneRecipe;
