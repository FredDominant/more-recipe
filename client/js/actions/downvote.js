import axios from 'axios';

import { DOWNVOTE_SUCCESS, DOWNVOTE_FAILURE } from '../actions/actionTypes';

const downvoteSuccess = recipe => ({
  type: DOWNVOTE_SUCCESS,
  recipe
});

const downvoteFail = message => ({
  type: DOWNVOTE_FAILURE,
  message
});

// return axios.post(`/api/v1/recipes/${recipeId}/upvote`)
const downvoteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/downvote`,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      console.log('response on downvote is', response.data.Recipe);
      const { Recipe } = response.data;
      dispatch(downvoteSuccess(Recipe));
    })
    .catch((error) => {
      const { Message } = error;
      dispatch(downvoteFail(Message));
    });
};
export default downvoteRecipe;
