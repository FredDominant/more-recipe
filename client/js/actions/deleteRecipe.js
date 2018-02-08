import axios from 'axios';

import toaster from '../utils/toaster';
import { DELETE_RECIPE, DELETE_RECIPE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

/**
 * @returns {object} action
 *
 * @param {number} recipeId
 */
const deleteRecipeSuccess = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
});

/**
 * @returns {object} action
 *
 * @param {number} recipeId
 */
const deleteRecipeError = recipeId => ({
  type: DELETE_RECIPE_ERROR,
  recipeId
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} recipeId
 */
const deleteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'DELETE',
    url: `/api/v1/recipes/${recipeId}`,
    headers: {
      'x-access-token': token
    }
  })
    .then(() => {
      dispatch(deleteRecipeSuccess(recipeId));
      dispatch(unsetFetching());
      toaster.toastSuccess('Recipe deleted');
    })
    .catch(() => {
      dispatch(deleteRecipeError(recipeId));
      dispatch(unsetFetching());
      toaster.toastError('Unable to delete recipe');
    });
};
export default deleteRecipe;

