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
      const { Reviews } = response.data;
      console.log('reviews in action is', Reviews);
      dispatch(batchActions([
        getReviewSuccess(Reviews),
        unsetFetching()
      ]));
    })
    .catch(() => {
      const Message = 'an error occurred';
      dispatch(batchActions([
        getReviewFailure(Message),
        unsetFetching()
      ]));
    });
};

export default getReviews;
