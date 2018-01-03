import axios from 'axios';
import toastr from 'toastr';
import { batchActions } from 'redux-batched-actions';

import { EDIT_RECIPE, EDIT_RECIPE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const updateRecipeSuccess = recipe => ({
  type: EDIT_RECIPE,
  recipe
});

const updateRecipeFail = () => ({
  type: EDIT_RECIPE_ERROR
});

const updateRecipe = (recipe, recipeId) => (dispatch) => {
  const { name, description, directions, ingredients, picture } = recipe;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'PUT',
    url: `/api/v1/recipes/${recipeId}`,
    headers: {
      'x-access-token': token
    },
    data: {
      name, description, directions, picture, ingredients
    }
  })
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(batchActions([
        updateRecipeSuccess(Recipe),
        unsetFetching()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.success('Recipe updated');
    })
    .catch(() => {
      dispatch(batchActions([
        updateRecipeFail(),
        unsetFetching()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.error('Unable to update recipe');
    });
};

export default updateRecipe;
