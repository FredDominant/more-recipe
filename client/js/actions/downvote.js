import axios from 'axios';

import { DOWNVOTE_SUCCESS, DOWNVOTE_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';
import toaster from '../utils/toaster';

/**
 * @returns {object} action
 *
 * @param {object} recipe
 */
const downvoteSuccess = recipe => ({
  type: DOWNVOTE_SUCCESS,
  recipe
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
const downvoteFail = message => ({
  type: DOWNVOTE_FAILURE,
  message
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} recipeId
 */
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
      dispatch(downvoteSuccess(recipe));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error;
      dispatch(downvoteFail(message));
      toaster.toastError('Unable to complete');
    });
};
export default downvoteRecipe;
