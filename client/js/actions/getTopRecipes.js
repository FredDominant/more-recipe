import axios from 'axios';

import { setFetching, unsetFetching } from './fetching';
import { GET_TOP_RECIPES, GET_TOP_RECIPES_ERROR } from './actionTypes';

/**
 * @returns {object} action
 *
 * @param {array} recipes
 */
const getTopRecipesSuccess = recipes => ({
  type: GET_TOP_RECIPES,
  recipes
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
const getTopRecipesError = message => ({
  type: GET_TOP_RECIPES_ERROR,
  message
});

/**
 * @returns {promise} axios promise
 *
 */
const getTopRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('/api/v1/recipes?sort=up&order=des')
    .then((response) => {
      dispatch(getTopRecipesSuccess(response.data.recipes));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(getTopRecipesError(message));
      dispatch(unsetFetching());
    });
};
export default getTopRecipes;
