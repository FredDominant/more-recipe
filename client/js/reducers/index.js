import { combineReducers } from 'redux';

import auth from './auth';
import isFetching from './isFetching';
import recipes from './allRecipes';
import isUploading from './isUploading';
import addRecipe from './addRecipe';
import getOneRecipe from './getOneRecipe';
import currentUserProfile from './currentUserProfile';
import getUserRecipe from './getUserRecipe';
import getFavourites from './getFavourites';
import pageInfo from './pageInfo';
import topRecipes from './topRecipes';

const reducers = combineReducers({
  auth,
  isFetching,
  recipes,
  topRecipes,
  addRecipe,
  getOneRecipe,
  getUserRecipe,
  getFavourites,
  isUploading,
  currentUserProfile,
  pageInfo
});

export default reducers;
