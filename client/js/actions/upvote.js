import axios from 'axios';

import { UPVOTE_SUCCESS, UPVOTE_FAILURE } from '../actions/actionTypes';

const upvoteSuccess = recipe => ({
  type: UPVOTE_SUCCESS,
  recipe
});

const upvoteFail = message => ({
  type: UPVOTE_FAILURE,
  message
});

// return axios.post(`/api/v1/recipes/${recipeId}/upvote`)
const upvoteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/upvote`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      console.log('response on upvote is', response.data.Recipe);
      const { Recipe } = response.data;
      dispatch(upvoteSuccess(Recipe));
    })
    .catch((error) => {
      const { Message } = error;
      dispatch(upvoteFail(Message));
    });
};
export default upvoteRecipe;
