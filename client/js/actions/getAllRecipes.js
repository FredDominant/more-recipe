import axios from 'axios';

import { GET_ALL_RECIPES, GET_ALL_RECIPES_ERROR, GET_PAGE_DETAILS } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

/**
 * @returns {object} action
 *
 * @param {array} recipes
 */
export const allRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes,
});

/**
 * @returns {object} action
 *
 * @param {object} details
 */
export const getPageDetails = details => ({
  type: GET_PAGE_DETAILS,
  details
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
export const allRecipesError = message => ({
  type: GET_ALL_RECIPES_ERROR,
  message
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} page
 */
const getAllRecipes = page => (dispatch) => {
  page = page || 1;
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes?page=${page}`)
    .then((response) => {
      const { currentPage, limit, numberOfItems, pages, recipes } = response.data;
      const paginationInfo = { currentPage, limit, numberOfItems, pages };
      dispatch(allRecipes(recipes));
      dispatch(getPageDetails(paginationInfo));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(allRecipesError(message));
      dispatch(unsetFetching());
    });
};
export default getAllRecipes;
