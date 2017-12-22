import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { ADD_FAVOURITES, ADD_FAVOURITES_ERROR } from '../actions/actionTypes';

const addFavouriteSuccess = recipe => ({
  type: ADD_FAVOURITES,
  recipe
});

const addFavouriteError = () => ({
  type: ADD_FAVOURITES_ERROR
});

const addFavourite = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/favourite`,
    headers: {
      'x-access-token': token
    }
  })
    .then(() => {
      dispatch(batchActions([
        addFavouriteSuccess(recipeId),
        unsetFetching()
      ]));
    })
    .catch(() => {
      dispatch(batchActions([
        addFavouriteError(),
        unsetFetching()
      ]));
    });
};
export default addFavourite;