import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import toastr from 'toastr';

import { DELETE_FAVOURITE, DELETE_FAVOURITE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';
import { getFavouriteStatus } from './getOneRecipe';

const removeFavouriteSuccess = recipeId => ({
  type: DELETE_FAVOURITE,
  recipeId
});

const removeFavouriteFailure = () => ({
  type: DELETE_FAVOURITE_ERROR
});

const removeFavourite = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'DELETE',
    url: `/api/v1/favourites/${recipeId}/delete`,
    headers: {
      'x-access-token': token
    }
  })
    .then(() => {
      dispatch(batchActions([
        removeFavouriteSuccess(recipeId),
        getFavouriteStatus(false),
        unsetFetching()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.success('Recipe deleted');
    })
    .catch(() => {
      dispatch(batchActions([
        removeFavouriteFailure(),
        unsetFetching()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.error('Unable to delete recipe');
    });
};
export default removeFavourite;
