import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { DOWNVOTE_SUCCESS, DOWNVOTE_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';
import toaster from '../utils/toaster';

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
      const { recipe } = response.data;
      dispatch(batchActions([
        downvoteSuccess(recipe),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const { message } = error;
      dispatch(downvoteFail(message));
      toaster.toastError('Unable to complete');
    });
};
export default downvoteRecipe;
