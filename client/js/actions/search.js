import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { SEARCH_RECIPES, SEARCH_RECIPES_ERROR } from '../actions/actionTypes';

const searchSuccess = recipes => ({
  type: SEARCH_RECIPES,
  recipes
});

const searchFailure = () => ({
  type: SEARCH_RECIPES_ERROR
});

const search = searchParams => (dispatch) => {
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: '/api/v1/search',
    data: {
      search: searchParams
    }
  })
    .then((response) => {
      const { Recipe } = response.data;
      dispatch(batchActions([
        searchSuccess(Recipe),
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
