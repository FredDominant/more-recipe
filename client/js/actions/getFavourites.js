import axios from 'axios';

import { setFetching, unsetFetching } from './fetching';
import { GET_FAVOURITES, GET_FAVOURITES_ERROR } from '../actions/actionTypes';
import { getPageDetails } from '../actions/getAllRecipes';

/**
 * @returns {object} action
 *
 * @param {array} favourites
 */
const getFavouritesSuccess = favourites => ({
  type: GET_FAVOURITES,
  favourites
});

/**
 *
 * @returns {object} action
 *
 */
const getFavouritesError = () => ({
  type: GET_FAVOURITES_ERROR
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} page
 */
const getFavourites = page => (dispatch) => {
  page = page || 1;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'GET',
    url: `/api/v1/users/favourites?page=${page}`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { currentPage, limit, numberOfItems, pages, favourites } = response.data;
      const paginationInfo = { currentPage, limit, numberOfItems, pages };
      dispatch(getFavouritesSuccess(favourites));
      dispatch(getPageDetails(paginationInfo));
      dispatch(unsetFetching());
    })
    .catch(() => {
      dispatch(getFavouritesError());
      dispatch(unsetFetching());
    });
};
export default getFavourites;

