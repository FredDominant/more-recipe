import initialState from '../store/initialState';
import { RECIEVE_AUTH, AUTH_ERROR } from '../actions/actionTypes';

/*
{
  isAuthenticated
  errorMessage
  user
  token
}
*/
const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case RECIEVE_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user,
        token: action.token
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.message
      };
    default:
      return state;
  }
};
export default auth;
