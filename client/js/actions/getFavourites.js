import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { GET_FAVOURITES, GET_FAVOURITES_ERROR } from '../actions/actionTypes';

const getFavouritesSuccess = favourites => ({
  type: GET_FAVOURITES,
  favourites
});

const getFavouritesError = () => ({
  type: GET_FAVOURITES_ERROR
});

const getFavourites = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    methiod: 'GET',
    url: '/api/v1/users/favourites',
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { Favourites } = response.data;
      dispatch(batchActions([
        getFavouritesSuccess(Favourites),
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

