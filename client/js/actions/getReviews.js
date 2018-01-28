import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { GET_REVIEW_SUCCESS, GET_REVIEW_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';

const getReviewSuccess = review => ({
  type: GET_REVIEW_SUCCESS,
  review
});

const getReviewFailure = message => ({
  type: GET_REVIEW_FAILURE,
  reviewError: message
});

const getReviews = recipeId => (dispatch) => {
  dispatch(setFetching());
  axios.get(`/api/v1/recipes/${recipeId}/review`)
    .then((response) => {
      const { reviews } = response.data;
      dispatch(batchActions([
        getReviewSuccess(reviews),
        unsetFetching()
      ]));
    })
    .catch(() => {
      const message = 'an error occurred';
      dispatch(batchActions([
        getReviewFailure(message),
        unsetFetching()
      ]));
    });
};

export default getReviews;
