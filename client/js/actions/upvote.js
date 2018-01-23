import axios from 'axios';
import toastr from 'toastr';

import { UPVOTE_SUCCESS, UPVOTE_FAILURE } from '../actions/actionTypes';

const upvoteSuccess = recipe => ({
  type: UPVOTE_SUCCESS,
  recipe
});

const upvoteFail = message => ({
  type: UPVOTE_FAILURE,
  message
});

const upvoteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/upvote`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(upvoteSuccess(Recipe));
    })
    .catch((error) => {
      const { Message } = error;
      dispatch(upvoteFail(Message));
      toastr.options = {
        closeButton: true
      };
      toastr.error('Unable to upvote recipe');
    });
};
export default upvoteRecipe;
