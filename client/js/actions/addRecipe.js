import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import toastr from 'toastr';

import { uploading, stopUploading } from './uploading';
import { ADD_RECIPE, RECIPE_ERROR } from '../actions/actionTypes';

const createRecipe = recipe => ({
  type: ADD_RECIPE,
  newRecipe: recipe
});

const recipeError = message => ({
  type: RECIPE_ERROR,
  addRecipeErrorMessage: message
});

const addRecipe = recipe => (dispatch) => {
  console.log('recipe in action is', recipe);
  const { name, ingredients, directions, description, recipeImage } = recipe;
  dispatch(uploading());
  const token = localStorage.getItem('token');
  axios({
    method: 'POST',
    url: '/api/v1/recipes',
    headers: {
      'x-access-token': token
    },
    data: { name, ingredients, directions, description, picture: recipeImage }
  })
    .then((response) => {
      dispatch(batchActions([
        createRecipe(response.data),
        stopUploading()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.success('Recipe added');
    })
    .catch((error) => {
      const message = error.response.data.Message;
      dispatch(batchActions([
        recipeError(message),
        stopUploading()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.error(message);
    });
};
export default addRecipe;
