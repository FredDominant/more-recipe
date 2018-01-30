import axios from 'axios';
import { getPageDetails } from '../actions/getAllRecipes';

import { setFetching, unsetFetching } from './fetching';
import { SEARCH_RECIPES, SEARCH_RECIPES_ERROR } from '../actions/actionTypes';

/**
 * @returns {object} action
 *
 * @param {array} recipes
 */
const searchSuccess = recipes => ({
  type: SEARCH_RECIPES,
  recipes
});

/**
 * @returns {object} action
 *
 */
const searchFailure = () => ({
  type: SEARCH_RECIPES_ERROR
});

/**
 * @returns {object} action
 *
 * @param {string} searchParams
 * @param {string} page
 */
const search = (searchParams, page) => (dispatch) => {
  page = page || 1;
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/search?page=${page}`,
    data: {
      search: searchParams
    }
  })
    .then((response) => {
      const { currentPage, limit, numberOfItems, pages, recipe } = response.data;
      const paginationInfo = { currentPage, limit, numberOfItems, pages };
      dispatch(searchSuccess(recipe));
      dispatch(getPageDetails(paginationInfo));
      dispatch(unsetFetching());
    })
    .catch(() => {
      dispatch(searchFailure());
      dispatch(unsetFetching());
    });
};
export default search;
