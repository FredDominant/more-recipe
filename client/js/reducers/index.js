import { combineReducers } from 'redux';

import auth from './auth';
import isFetching from './isFetching';
import recipes from './recipes';
import isUploading from './isUploading';
import addRecipe from '../reducers/addRecipe';
import getOneRecipe from '../reducers/getOneRecipe';
// import upvoteReducer from '../reducers/upvoteReducer';
// import signupReducer from './signupReducer';

const reducers = combineReducers({
  auth,
  isFetching,
  recipes,
  isUploading,
  addRecipe,
  getOneRecipe,
  // upvoteReducer
});

export default reducers;
