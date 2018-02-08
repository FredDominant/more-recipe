import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR
} from '../../actions/actionTypes';

import getUserRecipe from '../../reducers/getUserRecipe';

describe('Test for getUserRecipe reducer should', () => {
  it('set recipe when action of type GET_USER_RECIPES is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: GET_USER_RECIPES,
      recipes: [
        {
          id: 3,
          name: 'recipe 3',
          userId: 1,
        },
        {
          id: 2,
          name: 'recipe 2',
          userId: 1,
        }
      ]
    };
    const newState = getUserRecipe(initialState, action);
    expect(newState.userRecipes).toEqual(action.recipes);
    expect(newState.getUserRecipeError).toEqual(false);
  });

  it('update store correctly when action of type GET_USER_RECIPES_ERROR is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: GET_USER_RECIPES_ERROR,
      addRecipeErrorMessage: 'error'
    };
    const newState = getUserRecipe(initialState, action);
    expect(newState.userRecipes).toEqual([]);
    expect(newState.getUserRecipeError).toEqual(true);
  });

  it('update store correctly when action of type DELETE_RECIPE_ERROR is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: DELETE_RECIPE_ERROR,
      addRecipeErrorMessage: 'error'
    };
    const newState = getUserRecipe(initialState, action);
    expect(newState).toBeTruthy();
  });

  it('set recipe when action of type DELETE_RECIPE is called', () => {
    const initialState = {
      recipes: { },
      userRecipes: [
        {
          id: 3,
          name: 'recipe 3',
          userId: 1,
        },
        {
          id: 2,
          name: 'recipe 2',
          userId: 1,
        }
      ]
    };
    const action = {
      type: DELETE_RECIPE,
      recipeId: 3,
      recipes: [
        {
          id: 3,
          name: 'recipe 3',
          userId: 1
        },
        {
          id: 2,
          name: 'recipe 2',
          userId: 1,
        }
      ]
    };
    const newState = getUserRecipe(initialState, action);
    expect((newState.userRecipes).length).toEqual(1);
  });
});
