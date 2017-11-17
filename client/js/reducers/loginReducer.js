import store from '../store/store';

const loginReducer = (state = store, action) => {
  switch (action.type) {
    case 'Login':
      // do Login stuff;
      state = {
        ...state,
        loginForm: action.payload
      };
      break;
    case 'Logout':
      // do logout stuff;
      state = {
        ...state,
        loginForm: {}
      };
      break;
    default:
      state = {
        ...state
      };
      break;
  }
  return state;
};
export default loginReducer;
