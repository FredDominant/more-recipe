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
        const { Recipe, userFavourited } = response.data;
        console.log(response.data);
        dispatch(batchActions([
          getRecipe(Recipe),
          getFavouriteStatus(userFavourited),
          unsetFetching()
        ]));
      })
      .catch((error) => {
        const errorMessage = error.response.data.Message;
        dispatch(batchActions([
          unsetFetching(),
          getRecipeError(errorMessage)
        ]));
      });
  }
  return axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(batchActions([
        getRecipe(Recipe),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const errorMessage = error.response.data.Message;
      dispatch(batchActions([
        unsetFetching(),
        getRecipeError(errorMessage)
      ]));
    });
};
export default getOneRecipe;

