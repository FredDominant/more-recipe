import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { GET_FAVOURITES, GET_FAVOURITES_ERROR } from '../actions/actionTypes';
import { getPageDetails } from '../actions/getAllRecipes';

const getFavouritesSuccess = favourites => ({
  type: GET_FAVOURITES,
  favourites
});

const getFavouritesError = () => ({
  type: GET_FAVOURITES_ERROR
});

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
      dispatch(batchActions([
        getFavouritesSuccess(favourites),
        getPageDetails(paginationInfo),
        unsetFetching()
      ]));
    })
    .catch(() => {
      dispatch(batchActions([
        getFavouritesError(),
        unsetFetching()
      ]));
    });
};
export default getFavourites;

