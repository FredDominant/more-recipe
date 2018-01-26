import axios from 'axios';
import toaster from '../utils/toaster';

import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE } from '../actions/actionTypes';

const addReviewSuccess = review => ({
  type: ADD_REVIEW_SUCCESS,
  review
});

const addReviewFailure = message => ({
  type: ADD_REVIEW_FAILURE,
  reviewError: message
});

const addReview = (review, recipeId) => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/review`,
    headers: {
      'x-access-token': token
    },
    data: { content: review }
  })
    .then((response) => {
      const Review = response.data;
      dispatch(addReviewSuccess(Review));
      toaster.toastSuccess('Review added');
    })
    .catch(() => {
      const Message = 'unable to add review';
      dispatch(addReviewFailure(Message));
      toaster.toastError(Message);
    });
};

export default addReview;
