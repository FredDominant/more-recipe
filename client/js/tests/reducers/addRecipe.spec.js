import { ADD_RECIPE, RECIPE_ERROR } from '../../actions/actionTypes';
import addRecipe from '../../reducers/addRecipe';


describe('Test for addRecipe reducer should', () => {
  it('set recipe when action of type ADD_RECIPE is called', () => {
    const initialState = {
      recipes: { },
    };
    const action = {
      type: ADD_RECIPE,
      newRecipe: {
        id: 11,
        content: 'test review for test recipe with custom image',
        userId: 3,
      }
    };
    const newState = addRecipe(initialState, action);
    expect(newState.addRecipeSuccess).toEqual('Recipe Added');
    expect(newState.addRecipeErrorMessage).toBeFalsy();
    expect(newState.newRecipe).toEqual(action.newRecipe);
  });

  it('update store correctly when action of type RECIPE_ERROR is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: RECIPE_ERROR,
      addRecipeErrorMessage: 'error'
    };
    const newState = addRecipe(initialState, action);
    expect(newState.addRecipeErrorMessage).toEqual('error');
  });
});
