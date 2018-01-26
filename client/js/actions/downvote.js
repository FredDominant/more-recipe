import axios from 'axios';
import toastr from 'toastr';
import { batchActions } from 'redux-batched-actions';

import { DOWNVOTE_SUCCESS, DOWNVOTE_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';

const downvoteSuccess = recipe => ({
  type: DOWNVOTE_SUCCESS,
  recipe
});

const downvoteFail = message => ({
  type: DOWNVOTE_FAILURE,
  message
});

const downvoteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/downvote`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(batchActions([
        downvoteSuccess(Recipe),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const { Message } = error;
      dispatch(downvoteFail(Message));
      toastr.options = {
        closeButton: true
      };
      toastr.error('Unable to downvote!');
    });
};
export default downvoteRecipe;
