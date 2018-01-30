import axios from 'axios';

import { setFetching, unsetFetching } from '../actions/fetching';
import { ADD_RECIPE, RECIPE_ERROR } from '../actions/actionTypes';
import toaster from '../utils/toaster';
import uploadImage from '../utils/uploadImage';

/**
 * @description action creator. dispatched if no error
 *
 * @param {object} recipe
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
 * @param {string} token
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
    dispatch(createRecipe(response.data));
    dispatch(unsetFetching());
    toaster.toastSuccess('Recipe added');
  })
  .catch((error) => {
    const { message } = error.response.data;
    dispatch(recipeError(message));
    dispatch(unsetFetching());
    toaster.toastError(message);
  });

/**
 * @description checks if image was selected from component and uploads depending on condition
 *
 * @param {object} recipe
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
        dispatch(recipeError(message));
        dispatch(unsetFetching());
        toaster.toastError(message);
      });
  }
  const { name, description, directions, ingredients } = recipe;
  // const noImageRecipe = {
  //   name: recipe.name,
  //   description: recipe.description,
  //   directions: recipe.directions,
  //   ingredients: recipe.ingredients
  // };
  const noImageRecipe = { name, description, directions, ingredients };
  return addRecipeRequest(noImageRecipe, token, dispatch);
};
export default addRecipe;
