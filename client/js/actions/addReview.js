import axios from 'axios';

import toaster from '../utils/toaster';

import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE } from '../actions/actionTypes';
/**
 * @returns {object} action
 *
 * @param {object} review
 */
const addReviewSuccess = review => ({
  type: ADD_REVIEW_SUCCESS,
  review
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
const addReviewFailure = message => ({
  type: ADD_REVIEW_FAILURE,
  reviewError: message
});

/**
 * @returns {promise} axios
 *
 * @param {string} reviewContent
 * @param {number} recipeId
 */
const addReview = (reviewContent, recipeId) => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/review`,
    headers: {
      'x-access-token': token
    },
    data: { content: reviewContent }
  })
    .then((response) => {
      dispatch(addReviewSuccess(response.data));
      toaster.toastSuccess('Review added');
    })
    .catch(() => {
      const message = 'unable to add review';
      dispatch(addReviewFailure(message));
      toaster.toastError(message);
    });
};

export default addReview;
