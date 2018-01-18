import axios from 'axios';
import toastr from 'toastr';

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
      console.log('Reviews from server is', Review);
      dispatch(addReviewSuccess(Review));
      toastr.options = {
        closeButton: true
      };
      toastr.success('Review added');
    })
    .catch(() => {
      const Message = 'an error occurred';
      dispatch(addReviewFailure(Message));
      toastr.options = {
        closeButton: true
      };
      toastr.error('unable to add review');
    });
};

export default addReview;
