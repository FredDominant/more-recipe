import axios from 'axios';

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
      console.log('response from server is', response);
      const { Recipe } = response.data;
      console.log('Review in addReview is', Recipe);
      dispatch(addReviewSuccess(Recipe));
    })
    .catch(() => {
      const Message = 'an error occurred';
      dispatch(addReviewFailure(Message));
    });
};

export default addReview;
