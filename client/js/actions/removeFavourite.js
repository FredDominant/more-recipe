import axios from 'axios';

import { DELETE_FAVOURITE, DELETE_FAVOURITE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';
import { getFavouriteStatus } from './getOneRecipe';
import toaster from '../utils/toaster';

/**
 * @returns {object} action
 *
 * @param {number} recipeId
 */
const removeFavouriteSuccess = recipeId => ({
  type: DELETE_FAVOURITE,
  recipeId
});

/**
 * @returns {object} action
 *
 */
const removeFavouriteFailure = () => ({
  type: DELETE_FAVOURITE_ERROR
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} recipeId
 */
const removeFavourite = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'DELETE',
    url: `/api/v1/favourites/${recipeId}/delete`,
    headers: {
      'x-access-token': token
    }
  })
    .then(() => {
      dispatch(removeFavouriteSuccess(recipeId));
      dispatch(getFavouriteStatus(false));
      dispatch(unsetFetching());
      toaster.toastSuccess('Removed!');
    })
    .catch(() => {
      dispatch(removeFavouriteFailure());
      dispatch(unsetFetching());
      toaster.toastError('Unable to complete');
    });
};
export default removeFavourite;
