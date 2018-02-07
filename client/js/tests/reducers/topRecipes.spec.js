import { GET_TOP_RECIPES, GET_TOP_RECIPES_ERROR } from '../../actions/actionTypes';
import topRecipes from '../../reducers/topRecipes';

describe('Test for topRecipes reducer should', () => {
  it('set top recipes when action of type GET_TOP_RECIPES is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_TOP_RECIPES,
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
    const newState = topRecipes(initialState, action);
    expect(newState.recipes).toEqual(action.recipes);
    expect(newState.failure).toEqual('');
  });

  it('update store correctly when action of type GET_TOP_RECIPES_ERROR is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_TOP_RECIPES_ERROR,
      message: 'error'
    };
    const newState = topRecipes(initialState, action);
    expect(newState.failure).toEqual('error');
    expect(newState.recipes).toEqual({});
  });
});

