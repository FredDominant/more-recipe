import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { getPageDetails } from '../actions/getAllRecipes';

import { setFetching, unsetFetching } from './fetching';
import { SEARCH_RECIPES, SEARCH_RECIPES_ERROR } from '../actions/actionTypes';

const searchSuccess = recipes => ({
  type: SEARCH_RECIPES,
  recipes
});

const searchFailure = () => ({
  type: SEARCH_RECIPES_ERROR
});

const search = (searchParams, page) => (dispatch) => {
  page = page || 1;
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/search?page=${page}`,
    data: {
      search: searchParams
    }
  })
    .then((response) => {
      const { CurrentPage, Limit, NumberOfItems, Pages, Recipe } = response.data;
      const paginationInfo = { CurrentPage, Limit, NumberOfItems, Pages };
      dispatch(batchActions([
        searchSuccess(Recipe),
        getPageDetails(paginationInfo),
        unsetFetching()
      ]));
    })
    .catch(() => {
      dispatch(batchActions([
        searchFailure(),
        unsetFetching()
      ]));
    });
};
export default search;
