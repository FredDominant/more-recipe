import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { GET_TOP_RECIPES, GET_TOP_RECIPES_ERROR } from './actionTypes';

const getTopRecipesSuccess = recipes => ({
  type: GET_TOP_RECIPES,
  recipes
});

const getTopRecipesError = message => ({
  type: GET_TOP_RECIPES_ERROR,
  message
});

const getTopRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('/api/v1/recipes?sort=up&order=des')
    .then((response) => {
      dispatch(batchActions([
        getTopRecipesSuccess(response.data.Recipes),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const message = error.response.data.Message;
      dispatch(batchActions([
        getTopRecipesError(message),
        unsetFetching()
      ]));
    });
};
export default getTopRecipes;
