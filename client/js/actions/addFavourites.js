import axios from 'axios';

import toaster from '../utils/toaster';
import { setFetching, unsetFetching } from './fetching';
import { ADD_FAVOURITES, ADD_FAVOURITES_ERROR } from '../actions/actionTypes';
import { getFavouriteStatus } from './getOneRecipe';

const addFavouriteSuccess = () => ({
  type: ADD_FAVOURITES,
});

const addFavouriteError = () => ({
  type: ADD_FAVOURITES_ERROR
});

const addFavourite = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/favourite`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { message, userFavourited } = response.data;
      dispatch(addFavouriteSuccess());
      dispatch(getFavouriteStatus(userFavourited));
      dispatch(unsetFetching());
      toaster.toastSuccess(message);
    })
    .catch(() => {
      dispatch(addFavouriteError());
      dispatch(unsetFetching());
      toaster.toastError('Unable to add to favourites');
    });
};
export default addFavourite;
