import axios from 'axios';
import toastr from 'toastr';
import { batchActions } from 'redux-batched-actions';

import { UPVOTE_SUCCESS, UPVOTE_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';

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
  dispatch(setFetching());
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/upvote`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(batchActions([
        upvoteSuccess(Recipe),
        unsetFetching()
      ]));
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
