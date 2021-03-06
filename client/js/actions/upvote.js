import axios from 'axios';

import { UPVOTE_SUCCESS, UPVOTE_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';
import toaster from '../utils/toaster';

/**
 * @returns {object} action
 *
 * @param {object} recipe
 */
const upvoteSuccess = recipe => ({
  type: UPVOTE_SUCCESS,
  recipe
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
const upvoteFail = message => ({
  type: UPVOTE_FAILURE,
  message
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} recipeId
 */
const upvoteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/upvote`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { recipe } = response.data;
      dispatch(upvoteSuccess(recipe));
      dispatch(unsetFetching());
    })
    .catch(() => {
      const message = 'Unable to complete';
      dispatch(upvoteFail(message));
      dispatch(unsetFetching());
      toaster.toastError(message);
    });
};
export default upvoteRecipe;
