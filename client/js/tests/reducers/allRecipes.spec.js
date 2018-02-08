import { GET_ALL_RECIPES, GET_ALL_RECIPES_ERROR, SEARCH_RECIPES, SEARCH_RECIPES_ERROR } from '../../actions/actionTypes';
import allRecipes from '../../reducers/allRecipes';


describe('Test for addRecipe reducer should', () => {
  it('set recipe when action of type GET_ALL_RECIPES is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_ALL_RECIPES,
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
    const newState = allRecipes(initialState, action);
    expect(newState.allRecipes).toEqual(action.recipes);
    expect(newState.failure).toEqual('');
  });

  it('update store correctly when action of type GET_ALL_RECIPES_ERROR is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_ALL_RECIPES_ERROR,
      message: 'error'
    };
    const newState = allRecipes(initialState, action);
    expect(newState.failure).toEqual('error');
  });

  it('set recipe when action of type SEARCH_RECIPES is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: SEARCH_RECIPES,
      recipes: [
        {
          id: 3,
          name: 'recipe 3',
          userId: 1,
          description: 'dsfdsgdsf',
          ingredients: 'vfsgrdfasddgsszd',
          directions: 'dfgsagdsfas',
        },
        {
          id: 2,
          name: 'recipe 2',
          userId: 1,
          description: 'dsfdsgdsf',
          ingredients: 'vfsgrdfasddgsszd',
          directions: 'dfgsagdsfas',
        }
      ]
    };
    const newState = allRecipes(initialState, action);
    expect(newState.allRecipes).toEqual(action.recipes);
    expect(newState.failure).toEqual('');
  });

  it('update store correctly when action of type SEARCH_RECIPES_ERROR is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: SEARCH_RECIPES_ERROR,
      addRecipeErrorMessage: 'error'
    };
    const newState = allRecipes(initialState, action);
    expect(newState.failure).toEqual('failed');
    expect(newState.allRecipes).toEqual([]);
  });
});

