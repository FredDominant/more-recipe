import { combineReducers } from 'redux';

import auth from './auth';
import isFetching from './isFetching';
import allRecipes from './allRecipes';
import isUploading from './isUploading';
import addRecipe from '../reducers/addRecipe';
// import signupReducer from './signupReducer';

const reducers = combineReducers({
  auth,
  isFetching,
  allRecipes,
  isUploading,
  addRecipe
});

export default reducers;
