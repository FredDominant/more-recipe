import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { GET_ALL_RECIPES, GET_ALL_RECIPES_ERROR, GET_PAGE_DETAILS } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

export const allRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes,
});

export const getPageDetails = details => ({
  type: GET_PAGE_DETAILS,
  details
});

export const allRecipesError = message => ({
  type: GET_ALL_RECIPES_ERROR,
  message
});

const getAllRecipes = page => (dispatch) => {
  page = page || 1;
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes?page=${page}`)
    .then((response) => {
      const { CurrentPage, Limit, NumberOfItems, Pages, Recipes } = response.data;
      const paginationInfo = { CurrentPage, Limit, NumberOfItems, Pages };
      dispatch(batchActions([
        allRecipes(Recipes),
        getPageDetails(paginationInfo),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const message = error.response.data.Message;
      dispatch(batchActions([
        allRecipesError(message),
        unsetFetching()
      ]));
    });
};
export default getAllRecipes;
