import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from '../actions/fetching';
import { ADD_RECIPE, RECIPE_ERROR } from '../actions/actionTypes';
import toaster from '../utils/toaster';
import uploadImage from '../utils/uploadImage';

/**
 * @description action creator. dispatched if no error
 *
 * @param {any} recipe
 *
 * @returns {object} action
 */
const createRecipe = recipe => ({
  type: ADD_RECIPE,
  newRecipe: recipe
});

/**
 * @description action creater, dispatched when error occurs
 *
 * @param {string} message
 *
 * @returns {object} action
 */
const recipeError = message => ({
  type: RECIPE_ERROR,
  addRecipeErrorMessage: message
});

/**
 * @description makes api call to server and dispatches to redux store
 *
 * @param {object} recipe
 *
 * @param {string} token
 *
 * @param {function} dispatch
 *
 * @returns {promise} axios promise
 */
const addRecipeRequest = (recipe, token, dispatch) => axios({
  method: 'POST',
  url: '/api/v1/recipes',
  headers: {
    'x-access-token': token
  },
  data: recipe
})
  .then((response) => {
    dispatch(batchActions([
      createRecipe(response.data),
      unsetFetching()
    ]));
    toaster.toastSuccess('Recipe added');
  })
  .catch((error) => {
    const message = error.response.data.Message;
    dispatch(batchActions([
      recipeError(message),
      unsetFetching()
    ]));
    toaster.toastError(message);
  });

/**
 * @description checks if image was selected from component and uploads depending on condition
 *
 * @param {object} recipe
 *
 * @returns {promise} axios promise
 */
const addRecipe = recipe => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  const { picture } = recipe;
  if (picture !== '/images/noImage.png') {
    return uploadImage(picture)
      .then((uploadResponse) => {
        const recipeUrl = uploadResponse.data.secure_url;
        recipe = { ...recipe, picture: recipeUrl };
        return addRecipeRequest(recipe, token, dispatch);
      })
      .catch(() => {
        const message = 'unable to upload image';
        dispatch(batchActions([
          recipeError(message),
          unsetFetching()
        ]));
        toaster.toastError(message);
      });
  }
  recipe = { ...recipe, picture: null };
  return addRecipeRequest(recipe, token, dispatch);
};
export default addRecipe;
