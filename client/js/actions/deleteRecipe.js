import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { DELETE_RECIPE, DELETE_RECIPE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const deleteRecipeSuccess = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
});

const deleteRecipeError = recipeId => ({
  type: DELETE_RECIPE_ERROR,
  recipeId
});

const deleteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'DELETE',
    url: `api/v1/recipes/${recipeId}`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      console.log('response on delete is', response);
      dispatch(batchActions([
        deleteRecipeSuccess(recipeId),
        unsetFetching()
      ]));
    })
    .catch(() => {
      dispatch(batchActions([
        deleteRecipeError(recipeId),
        unsetFetching()
      ]));
    });
};
export default deleteRecipe;

