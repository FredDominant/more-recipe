import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { EDIT_RECIPE, EDIT_RECIPE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';
import toaster from '../utils/toaster';
import uploadImage from '..//utils/uploadImage';

/**
 * @description action creator
 *
 * @returns {object} action
 *
 * @param {object} recipe
 */
const updateRecipeSuccess = recipe => ({
  type: EDIT_RECIPE,
  recipe
});

/**
 * @description action creator
 *
 * @returns {object} action
 */
const updateRecipeFail = () => ({
  type: EDIT_RECIPE_ERROR
});

/**
 *
 *
 * @param {object} recipe
 *
 * @param {number} recipeId
 *
 * @param {string} token
 *
 * @param {function} dispatch
 *
 * @returns {promise} axios promise
 */
const updateRecipeRequest = (recipe, recipeId, token, dispatch) => axios({
  method: 'PUT',
  url: `/api/v1/recipes/${recipeId}`,
  headers: {
    'x-access-token': token
  },
  data: recipe
})
  .then((response) => {
    const { Recipe } = response.data;
    dispatch(batchActions([
      updateRecipeSuccess(Recipe),
      unsetFetching()
    ]));
    toaster.toastSuccess('Recipe Updated');
  })
  .catch((error) => {
    const errorMessage = error.response.data.Message;
    dispatch(batchActions([
      updateRecipeFail(),
      unsetFetching()
    ]));
    toaster.toastError(errorMessage);
  });

/**
 * @description checks if image is added, then makes api call
 *
 * @param {object} recipe
 *
 * @param {number} recipeId
 *
 * @returns {promise} Axios promise
 */
const updateRecipe = (recipe, recipeId) => (dispatch) => {
  const { picture, selectedImage } = recipe;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  if (selectedImage) {
    return uploadImage(picture)
      .then((uploadResponse) => {
        const url = uploadResponse.data.secure_url;
        recipe = { ...recipe, picture: url };
        return updateRecipeRequest(recipe, recipeId, token, dispatch);
      })
      .catch(() => {
        const message = 'could not upload image';
        dispatch(batchActions([
          updateRecipeFail(message),
          unsetFetching()
        ]));
        toaster.toastError(message);
      });
  }
  return updateRecipeRequest(recipe, recipeId, token, dispatch);
};

export default updateRecipe;
