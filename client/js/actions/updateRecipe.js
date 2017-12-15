import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { EDIT_RECIPE, EDIT_RECIPE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const updateRecipeSuccess = recipe => ({
  action: EDIT_RECIPE,
  recipe
});

const updateRecipeFail = () => ({
  action: EDIT_RECIPE_ERROR
});

const updateRecipe = (recipe, recipeId) => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'PUT',
    url: `api/v1/recipes/${recipeId}`,
    headers: {
      'x-access-token': token
    },
    data: {
      recipe
    }
  })
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(batchActions([
        updateRecipeSuccess(Recipe),
        unsetFetching()
      ]));
    })
    .catch(() => {
      dispatch(batchActions([
        updateRecipeFail(),
        unsetFetching()
      ]));
    });
};

export default updateRecipe;
