import {
  GET_FAVOURITES,
  GET_FAVOURITES_ERROR,
  DELETE_FAVOURITE,
  DELETE_FAVOURITE_ERROR
} from '../../actions/actionTypes';

import getFavourites from '../../reducers/getFavourites';

describe('Test for getFavourites reducer should', () => {
  it('set favourites when action of type GET_FAVOURITES is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_FAVOURITES,
      favourites: [
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
    const newState = getFavourites(initialState, action);
    expect(newState.userFavourites).toEqual(action.favourites);
    expect(newState.getFavouritesError).toEqual(false);
  });

  it('update store correctly when action of type GET_FAVOURITES_ERROR is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_FAVOURITES_ERROR,
    };
    const newState = getFavourites(initialState, action);
    expect(newState.getFavouritesError).toEqual(true);
  });

  it('set favourites when action of type DELETE_FAVOURITE is called', () => {
    const initialState = {
      recipes: { },
      userFavourites: [
        {
          recipeId: 3,
          name: 'recipe 3',
          userId: 1,
        },
        {
          recipeId: 2,
          name: 'recipe 2',
          userId: 1,
        }
      ]
    };
    const action = {
      type: DELETE_FAVOURITE,
      recipeId: 3
    };
    const newState = getFavourites(initialState, action);
    expect(newState.userFavourites.length).toBe(1);
    expect(newState.deleteFavouritesError).toEqual(false);
  });

  it('update store correctly when action of type DELETE_FAVOURITE_ERROR is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: DELETE_FAVOURITE_ERROR,
    };
    const newState = getFavourites(initialState, action);
    expect(newState.deleteFavouritesError).toEqual(true);
  });
});

