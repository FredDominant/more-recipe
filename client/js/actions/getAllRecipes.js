import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { GET_ALL_RECIPES, GET_ALL_RECIPES_ERROR } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

export const allRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

export const allRecipesError = message => ({
  type: GET_ALL_RECIPES_ERROR,
  message
});

const getAllRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('/api/v1/recipes')
    .then((response) => {
      const { Recipes } = response.data;
      dispatch(batchActions([
        allRecipes(Recipes),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const message = error.response.data.Message;
      dispatch(batchActions([
        allRecipesError(message),
        unsetFetching()
      ]));
    });
};
export default getAllRecipes;
