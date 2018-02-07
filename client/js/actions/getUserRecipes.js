import axios from 'axios';

import { getPageDetails } from '../actions/getAllRecipes';
import { GET_USER_RECIPES, GET_USER_RECIPES_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

/**
 * @returns {object} action
 *
 * @param {array} recipes
 */
const getUserRecipeSuccess = recipes => ({
  type: GET_USER_RECIPES,
  recipes
});

/**
 * @returns {object} action
 *
 */
const getUserRecipeFailure = () => ({
  type: GET_USER_RECIPES_ERROR
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} page
 */
const getUserRecipes = page => (dispatch) => {
  page = page || 1;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'GET',
    url: `/api/v1/recipes/user/all?page=${page}`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { currentPage, limit, numberOfItems, pages, recipes } = response.data;
      const paginationInfo = { currentPage, limit, numberOfItems, pages };
      dispatch(getUserRecipeSuccess(recipes));
      dispatch(getPageDetails(paginationInfo));
      dispatch(unsetFetching());
    })
    .catch(() => {
      dispatch(getUserRecipeFailure());
      dispatch(unsetFetching());
    });
};
export default getUserRecipes;

