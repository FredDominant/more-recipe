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
  axios({
    method: 'GET',
    url: `/api/v1/users/favourites?page=${page}`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { CurrentPage, Limit, NumberOfItems, Pages, Favourites } = response.data;
      const paginationInfo = { CurrentPage, Limit, NumberOfItems, Pages };
      dispatch(batchActions([
        getFavouritesSuccess(Favourites),
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

