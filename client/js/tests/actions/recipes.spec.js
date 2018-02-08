import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import mockData from '../mocks/response.mock';
import getAllRecipes from '../../actions/getAllRecipes';
import getTopRecipes from '../../actions/getTopRecipes';
import search from '../../actions/search';
import addFavourite from '../../actions/addFavourites';
import getFavourites from '../../actions/getFavourites';
import upvote from '../../actions/upvote';
import downvote from '../../actions/downvote';
import getOneRecipe from '../../actions/getOneRecipe';
import getReviews from '../../actions/getReviews';
import addReview from '../../actions/addReview';
import deleteRecipe from '../../actions/deleteRecipe';
import getUserRecipes from '../../actions/getUserRecipes';
import removeFavourite from '../../actions/removeFavourite';

import {
  GET_ALL_RECIPES,
  GET_ALL_RECIPES_ERROR,
  SET_FETCHING,
  UNSET_FETCHING,
  SEARCH_RECIPES,
  SEARCH_RECIPES_ERROR,
  GET_TOP_RECIPES,
  GET_TOP_RECIPES_ERROR,
  GET_PAGE_DETAILS,
  ADD_FAVOURITES,
  ADD_FAVOURITES_ERROR,
  GET_FAVOURITES,
  GET_FAVOURITES_ERROR,
  GET_FAVOURITE_STATUS,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  GET_ONE_RECIPE,
  GET_ONE_RECIPE_ERROR,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR,
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  DELETE_FAVOURITE,
  DELETE_FAVOURITE_ERROR
} from '../../actions/actionTypes';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Test for recipes actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('to get all recipes should', () => {
    it('dispatch correctly provided no error', () => {
      const { allRecipes } = mockData;
      moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
        status: 200,
        response: allRecipes
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_ALL_RECIPES,
          recipes: allRecipes.recipes
        },
        {
          type: GET_PAGE_DETAILS,
          details: { currentPage: 1, limit: 6, numberOfItems: 3, pages: 1 }
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});

      return store.dispatch(getAllRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_ALL_RECIPES_ERROR,
          message: 'error'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});

      return store.dispatch(getAllRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to get Top recipes should', () => {
    it('dispatch correctly provided no error', () => {
      const { allRecipes } = mockData;
      moxios.stubRequest('/api/v1/recipes?sort=up&order=des', {
        status: 200,
        response: {
          recipes: allRecipes.recipes
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_TOP_RECIPES,
          recipes: allRecipes.recipes
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(getTopRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest('/api/v1/recipes?sort=up&order=des', {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_TOP_RECIPES_ERROR,
          message: 'error'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});

      return store.dispatch(getTopRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to search recipes should', () => {
    it('dispatch correctly provided no error', () => {
      const { allRecipes } = mockData;
      moxios.stubRequest(`/api/v1/search?page=${1}`, {
        status: 200,
        response: allRecipes
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: SEARCH_RECIPES,
          recipes: allRecipes.recipes
        },
        {
          type: GET_PAGE_DETAILS,
          details: { currentPage: 1, limit: 6, numberOfItems: 3, pages: 1 }
        },
        { type: UNSET_FETCHING }];

      const store = mockStore({});

      return store.dispatch(search('re'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/search?page=${1}`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: SEARCH_RECIPES_ERROR,
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});

      return store.dispatch(search('re', 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to add recipes to favourites should', () => {
    it('dispatch correctly provided no error', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}/favourite`, {
        status: 201,
        response: {
          message: 'Added to favourite',
          userFavourited: true
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: ADD_FAVOURITES },
        { type: GET_FAVOURITE_STATUS, favouriteStatus: true },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(addFavourite(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}/favourite`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: ADD_FAVOURITES_ERROR,
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(addFavourite(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to get all users favourites should', () => {
    it('dispatch correctly provided no error', () => {
      const { allRecipes } = mockData;
      moxios.stubRequest(`/api/v1/users/favourites?page=${1}`, {
        status: 201,
        response: allRecipes
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: GET_FAVOURITES, favourites: allRecipes.recipes },
        {
          type: GET_PAGE_DETAILS,
          details: { currentPage: 1, limit: 6, numberOfItems: 3, pages: 1 }
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(getFavourites())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/users/favourites?page=${1}`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_FAVOURITES_ERROR,
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(getFavourites(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to upvote recipe should', () => {
    it('dispatch correctly provided no error', () => {
      const { singleRecipe } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/upvote`, {
        status: 201,
        response: {
          recipe: singleRecipe
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: UPVOTE_SUCCESS, recipe: singleRecipe },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(upvote(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}/upvote`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: UPVOTE_FAILURE,
          message: 'Unable to complete'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(upvote(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to downvote recipe should', () => {
    it('dispatch correctly provided no error', () => {
      const { singleRecipe } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/downvote`, {
        status: 201,
        response: {
          recipe: singleRecipe
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: DOWNVOTE_SUCCESS, recipe: singleRecipe },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(downvote(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}/downvote`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: DOWNVOTE_FAILURE,
          message: 'Unable to complete'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(downvote(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to view a single recipe should', () => {
    it('dispatch correctly if no token is provided', () => {
      const { singleRecipe } = mockData;
      global.token = null;
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 200,
        response: {
          recipe: singleRecipe,
          userFavourited: false
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: GET_ONE_RECIPE, recipe: singleRecipe },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(getOneRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_ONE_RECIPE_ERROR,
          error: 'error'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(getOneRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if token is provided', () => {
      const { singleRecipe } = mockData;
      global.token = 'hjaerhguipewruihagfbjhagfvibweihrafiuh';
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 200,
        response: {
          recipe: singleRecipe,
          userFavourited: false
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: GET_ONE_RECIPE, recipe: singleRecipe },
        { type: GET_FAVOURITE_STATUS, favouriteStatus: false },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(getOneRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request with token fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_ONE_RECIPE_ERROR,
          error: 'error'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(getOneRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to view reviews of a recipe should', () => {
    it('dispatch correctly provided no error', () => {
      const { reviews } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/review`, {
        status: 200,
        response: {
          reviews: reviews.reviews
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: GET_REVIEW_SUCCESS, review: reviews.reviews },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(getReviews(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}/review`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_REVIEW_FAILURE,
          reviewError: 'an error occurred'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(getReviews(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to add reviews to a recipe should', () => {
    it('dispatch correctly provided no error', () => {
      const { singleReview } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/review`, {
        status: 201,
        response: singleReview
      });
      const expectedActions = [
        { type: ADD_REVIEW_SUCCESS,
          review: singleReview
        },
      ];

      const store = mockStore({});

      return store.dispatch(addReview(singleReview.content, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
        });
    });
    it('dispatch correctly if request fails', () => {
      const { singleReview } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/review`, {
        status: 500,
      });
      const expectedActions = [
        {
          type: ADD_REVIEW_FAILURE,
          reviewError: 'unable to add review'
        }];
      const store = mockStore({});
      return store.dispatch(addReview(singleReview.content, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(1);
        });
    });
  });

  describe('to delete recipe should', () => {
    it('dispatch correctly provided no error', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 200,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: DELETE_RECIPE,
          recipeId: 1
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(deleteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: DELETE_RECIPE_ERROR,
          recipeId: 1
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(deleteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to get all recipes by user should', () => {
    it('dispatch correctly provided no error', () => {
      const { allRecipes } = mockData;
      moxios.stubRequest(`/api/v1/recipes/user/all?page=${1}`, {
        status: 200,
        response: allRecipes
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_USER_RECIPES,
          recipes: allRecipes.recipes
        },
        {
          type: GET_PAGE_DETAILS,
          details: {
            currentPage: 1,
            limit: 6,
            numberOfItems: 3,
            pages: 1
          }
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(getUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/recipes/user/all?page=${1}`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: GET_USER_RECIPES_ERROR,
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(getUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('to remove a recipe from user\'s favourites should', () => {
    it('dispatch correctly provided no error', () => {
      moxios.stubRequest(`/api/v1/favourites/${1}/delete`, {
        status: 200,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: DELETE_FAVOURITE,
          recipeId: 1
        },
        {
          type: GET_FAVOURITE_STATUS,
          favouriteStatus: false
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});

      return store.dispatch(removeFavourite(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(4);
        });
    });
    it('dispatch correctly if request fails', () => {
      moxios.stubRequest(`/api/v1/favourites/${1}/delete`, {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: DELETE_FAVOURITE_ERROR,
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(removeFavourite(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });
});

