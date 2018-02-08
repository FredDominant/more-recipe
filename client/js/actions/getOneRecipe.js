import axios from 'axios';

import { GET_ONE_RECIPE, GET_ONE_RECIPE_ERROR, GET_FAVOURITE_STATUS } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

/**
 * @returns {object} action
 *
 * @param {object} recipe
 */
const getRecipe = recipe => ({
  type: GET_ONE_RECIPE,
  recipe,
});

/**
 * @returns {object} action
 *
 * @param {boolean} favouriteStatus
 */
export const getFavouriteStatus = favouriteStatus => ({
  type: GET_FAVOURITE_STATUS,
  favouriteStatus
});

/**
 * @returns {object} action
 *
 * @param {string} error
 */
const getRecipeError = error => ({
  type: GET_ONE_RECIPE_ERROR,
  error
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} recipeId
 */
const getOneRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token') || global.token;
  dispatch(setFetching());
  if (token) {
    return axios({
      method: 'GET',
      url: `/api/v1/recipes/${recipeId}`,
      headers: {
        'x-access-token': token
      }
    })
      .then((response) => {
        const { recipe, userFavourited } = response.data;
        dispatch(getRecipe(recipe));
        dispatch(getFavouriteStatus(userFavourited));
        dispatch(unsetFetching());
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch(getRecipeError(message));
        dispatch(unsetFetching());
      });
  }
  return axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      const { recipe } = response.data;
      dispatch(getRecipe(recipe));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(getRecipeError(message));
      dispatch(unsetFetching());
    });
};
export default getOneRecipe;

