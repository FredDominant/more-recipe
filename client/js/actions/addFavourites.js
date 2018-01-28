import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import toaster from '../utils/toaster';

import { setFetching, unsetFetching } from './fetching';
import { ADD_FAVOURITES, ADD_FAVOURITES_ERROR } from '../actions/actionTypes';
import { getFavouriteStatus } from './getOneRecipe';

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
    .then((response) => {
      const { message, userFavourited } = response.data;
      dispatch(batchActions([
        addFavouriteSuccess(recipeId),
        getFavouriteStatus(userFavourited),
        unsetFetching()
      ]));
      toaster.toastSuccess(message);
    })
    .catch(() => {
      dispatch(batchActions([
        addFavouriteError(),
        unsetFetching()
      ]));
      toaster.toastError('Unable to add to favourites');
    });
};
export default addFavourite;
