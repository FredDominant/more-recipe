import authenticateUser from '../utils/authenticateUser';

const initialState = {
  auth: {
    isAuthenticated: authenticateUser(),
    user: {
      firstname: 'Guest'
    }
  },
  recipe: {
  },
  isFetching: false,
  isUploading: false,
  recipes: {
  },
  user: {

  }
};
export default initialState;
