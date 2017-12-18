import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { DELETE_FAVOURITE, DELETE_FAVOURITE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const removeFavouriteSuccess = recipeId => ({
  type: DELETE_FAVOURITE,
  recipeId
});

const removeFavouriteFailure = () => ({
  type: DELETE_FAVOURITE_ERROR
});

const removeFavourite = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log('removing recipe from favourites', recipeId);
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
        unsetFetching()
      ]));
    })
    .catch((error) => {
      console.log('error is', error);
      dispatch(batchActions([
        removeFavouriteFailure(),
        unsetFetching()
      ]));
    });
};
export default removeFavourite;
