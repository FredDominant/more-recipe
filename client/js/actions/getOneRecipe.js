import { batchActions } from 'redux-batched-actions';
import axios from 'axios';

import { GET_ONE_RECIPE, GET_ONE_RECIPE_ERROR, GET_FAVOURITE_STATUS } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const getRecipe = recipe => ({
  type: GET_ONE_RECIPE,
  recipe,
});

export const getFavouriteStatus = favouriteStatus => ({
  type: GET_FAVOURITE_STATUS,
  favouriteStatus
});

const getRecipeError = error => ({
  type: GET_ONE_RECIPE_ERROR,
  error
});

const getOneRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  if (token) {
    return axios({
      method: 'GET',
      url: `/api/v1/recipes/${recipeId}`,
      headers: {
        'x-access-token': token
      }
    })
      .then((response) => {
        const { recipe, userFavourited } = response.data;
        dispatch(batchActions([
          getRecipe(recipe),
          getFavouriteStatus(userFavourited),
          unsetFetching()
        ]));
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch(batchActions([
          unsetFetching(),
          getRecipeError(message)
        ]));
      });
  }
  return axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      const { recipe } = response.data;
      dispatch(batchActions([
        getRecipe(recipe),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(batchActions([
        unsetFetching(),
        getRecipeError(message)
      ]));
    });
};
export default getOneRecipe;

