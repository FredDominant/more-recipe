import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { GET_USER_RECIPES, GET_USER_RECIPES_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const getUserRecipeSuccess = recipes => ({
  type: GET_USER_RECIPES,
  recipes
});

const getUserRecipeFailure = () => ({
  type: GET_USER_RECIPES_ERROR
});

const getUserRecipes = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'GET',
    url: '/api/v1/recipes/user/all',
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { Recipes } = response.data;
      dispatch(batchActions([
        getUserRecipeSuccess(Recipes),
        unsetFetching()
      ]));
    })
    .catch(() => {
      dispatch(batchActions([
        getUserRecipeFailure(),
        unsetFetching()
      ]));
    });
};
export default getUserRecipes;

