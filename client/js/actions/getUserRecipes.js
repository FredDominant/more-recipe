import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { getPageDetails } from '../actions/getAllRecipes';

import { GET_USER_RECIPES, GET_USER_RECIPES_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const getUserRecipeSuccess = recipes => ({
  type: GET_USER_RECIPES,
  recipes
});

const getUserRecipeFailure = () => ({
  type: GET_USER_RECIPES_ERROR
});

const getUserRecipes = page => (dispatch) => {
  page = page || 1;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'GET',
    url: `/api/v1/recipes/user/all?page=${page}`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { CurrentPage, Limit, NumberOfItems, Pages } = response.data;
      const paginationInfo = { CurrentPage, Limit, NumberOfItems, Pages };
      const { Recipes } = response.data;
      dispatch(batchActions([
        getUserRecipeSuccess(Recipes),
        getPageDetails(paginationInfo),
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

