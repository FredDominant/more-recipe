import axios from 'axios';

import { GET_REVIEW_SUCCESS, GET_REVIEW_FAILURE } from '../actions/actionTypes';
import { setFetching, unsetFetching } from './fetching';

/**
 * @returns {object} action
 *
 * @param {array} review
 */
const getReviewSuccess = review => ({
  type: GET_REVIEW_SUCCESS,
  review
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
const getReviewFailure = message => ({
  type: GET_REVIEW_FAILURE,
  reviewError: message
});

/**
 * @returns {promise} axios promise
 *
 * @param {number} recipeId
 */
const getReviews = recipeId => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes/${recipeId}/review`)
    .then((response) => {
      const { reviews } = response.data;
      dispatch(getReviewSuccess(reviews));
      dispatch(unsetFetching());
    })
    .catch(() => {
      const message = 'an error occurred';
      dispatch(getReviewFailure(message));
      dispatch(unsetFetching());
    });
};

export default getReviews;
