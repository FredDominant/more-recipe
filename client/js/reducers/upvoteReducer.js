import { UPVOTE_SUCCESS, UPVOTE_FAILURE } from '../actions/actionTypes';
import initialState from '../store/initialState';

const upvoteReducer = (state = initialState.recipe.singleRecipe, action) => {
  switch (action.type) {
    case UPVOTE_SUCCESS:
      return {
        ...state,
        upvote: action.upvote,
        downvote: action.downvote
      };
    case UPVOTE_FAILURE:
      return {
        ...state,
        success: action.success,
        message: action.message
      };
    default:
      return state;
  }
};

export default upvoteReducer;

