import authenticateUser from '../utils/authenticateUser';

const initialState = {
  auth: {
    isAuthenticated: authenticateUser()
  },
  recipe: {
  },
  isFetching: false,
  isUploading: false,
  recipes: {
  }
};
export default initialState;
