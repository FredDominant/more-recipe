import {
  GET_ONE_RECIPE,
  GET_ONE_RECIPE_ERROR,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  EDIT_RECIPE,
  EDIT_RECIPE_ERROR,
  GET_FAVOURITE_STATUS
} from '../../actions/actionTypes';
import getOneRecipe from '../../reducers/getOneRecipe';

describe('Test for getOneRecipe reducer should', () => {
  it('set recipe when action of type GET_ONE_RECIPE is called', () => {
    const initialState = {
      recipe: { },
      review: []
    };
    const action = {
      type: GET_ONE_RECIPE,
      recipe: {
        id: 3,
        name: 'recipe 3',
        userId: 1,
      }
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.singleRecipe).toEqual(action.recipe);
    expect(newState.errorMessage).toEqual('');
    expect(newState.reviews).toEqual([]);
  });

  it('update store correctly when action of type GET_ONE_RECIPE_ERROR is called', () => {
    const initialState = {
      recipe: { },
    };
    const action = {
      type: GET_ONE_RECIPE_ERROR,
      message: 'error'
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.errorMessage).toEqual(true);
    expect(newState.singleRecipe).toEqual(null);
  });

  it('set recipe when action of type UPVOTE_SUCCESS is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: UPVOTE_SUCCESS,
      recipe:
        {
          id: 3,
          name: 'recipe 3',
          userId: 1,
          upvote: 3,
          description: 'dsfdsgdsf',
          ingredients: 'vfsgrdfasddgsszd',
          directions: 'dfgsagdsfas',
        }
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.singleRecipe).toEqual(action.recipe);
    expect(newState.errorMessage).toEqual('');
    expect(newState.singleRecipe.upvote).toEqual(3);
  });

  it('update store correctly when action of type UPVOTE_FAILURE is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: UPVOTE_FAILURE,
      message: 'error'
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.errorMessage).toEqual('error');
  });

  it('set recipe when action of type DOWNVOTE_SUCCESS is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: DOWNVOTE_SUCCESS,
      recipe:
        {
          id: 3,
          name: 'recipe 3',
          userId: 1,
          downvote: 3,
          description: 'dsfdsgdsf',
          ingredients: 'vfsgrdfasddgsszd',
          directions: 'dfgsagdsfas',
        }
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.singleRecipe).toEqual(action.recipe);
    expect(newState.errorMessage).toEqual('');
    expect(newState.singleRecipe.downvote).toEqual(3);
  });

  it('update store correctly when action of type DOWNVOTE_FAILURE is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: DOWNVOTE_FAILURE,
      message: 'error'
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.errorMessage).toEqual('error');
  });

  it('set recipe when action of type GET_REVIEW_SUCCESS is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: GET_REVIEW_SUCCESS,
      review: [
        {
          id: 3,
          content: 'review'
        },
        {
          id: 2,
          content: 'reviewwww'
        }
      ]
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.reviews).toEqual(action.review);
    expect(newState.reviewError).toEqual('');
  });

  it('update store correctly when action of type GET_REVIEW_FAILURE is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: GET_REVIEW_FAILURE,
      message: 'error'
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.reviewError).toEqual('error');
  });

  it('set recipe when action of type ADD_REVIEW_SUCCESS is called', () => {
    const initialState = {
      recipe: { },
      reviews: []
    };
    const action = {
      type: ADD_REVIEW_SUCCESS,
      review:
        {
          id: 3,
          content: 'some content'
        }
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.reviews).toEqual([action.review]);
    expect(newState.reviews.length).toBe(1);
  });

  it('update store correctly when action of type ADD_REVIEW_FAILURE is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: ADD_REVIEW_FAILURE,
      message: 'error'
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.addReviewError).toEqual('error');
  });

  it('set recipe when action of type EDIT_RECIPE is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: EDIT_RECIPE,
      recipe:
        {
          id: 3,
          name: 'recipe 3',
          userId: 1,
        }
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.singleRecipe).toEqual(action.recipe);
    expect(newState.editRecipeSuccess).toEqual('Recipe Updated');
  });

  it('update store correctly when action of type EDIT_RECIPE_ERROR is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: EDIT_RECIPE_ERROR,
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.editRecipeError).toEqual('Unable to update recipe');
  });

  it('update store correctly when action of type GET_FAVOURITE_STATUS is called', () => {
    const initialState = {
      recipe: { }
    };
    const action = {
      type: GET_FAVOURITE_STATUS,
      favouriteStatus: true
    };
    const newState = getOneRecipe(initialState, action);
    expect(newState.favourited).toEqual(true);
  });
});

