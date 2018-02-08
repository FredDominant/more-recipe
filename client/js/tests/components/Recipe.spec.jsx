import React from 'react';
import { shallow } from 'enzyme';

import { Recipe } from '../../components/Recipe';


describe('SearchPage component should', () => {
  it('render correctly', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {},
      authenticated: false,
      fetching: false,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const shallowWrapper = shallow(<Recipe {...props} />);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('render loading gif is recipe is being fetched', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {},
      authenticated: false,
      fetching: true,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const shallowWrapper = shallow(<Recipe {...props} />);
    shallowWrapper.setState({
      recipe: {
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      }
    });
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('render loading gif is recipe is being fetched', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {},
      authenticated: false,
      fetching: false,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const shallowWrapper = shallow(<Recipe {...props} />);
    shallowWrapper.setState({
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      }
    });
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('handleUpvote()', () => {
  it('should work for authenticated users', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      },
      authenticated: true,
      fetching: false,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const shallowWrapper = shallow(<Recipe {...props} />);
    shallowWrapper.setState({
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      }
    });
    const upvoteButton = shallowWrapper.find('#upvote');
    upvoteButton.simulate('click');
    expect(shallowWrapper.instance().props.upvoteRecipe).toBeCalled();
  });
});

describe('handleDownvote()', () => {
  it('should work for authenticated users', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      },
      authenticated: true,
      fetching: false,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const shallowWrapper = shallow(<Recipe {...props} />);
    shallowWrapper.setState({
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      }
    });
    const upvoteButton = shallowWrapper.find('#downvote');
    upvoteButton.simulate('click');
    expect(shallowWrapper.instance().props.downvoteRecipe).toBeCalled();
  });
});


describe('handleFavourite()', () => {
  it('should work for authenticated users', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      },
      authenticated: true,
      fetching: false,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const shallowWrapper = shallow(<Recipe {...props} />);
    shallowWrapper.setState({
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction'
      }
    });
    const upvoteButton = shallowWrapper.find('#favourite');
    upvoteButton.simulate('click');
    expect(shallowWrapper.instance().props.favourite).toBeCalled();
  });
});


describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    const props = {
      getRecipeDetails: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      favourite: jest.fn(),
      recipe: {
        id: 1,
        name: 'name',
        description: 'description',
        ingredients: 'ingredient, ingredient',
        directions: 'direction',
        Reviews: [],
        User: {}
      },
      authenticated: true,
      fetching: false,
      favourited: false,
      match: {
        params: {
          recipeId: 1
        }
      },
    };
    const wrapper = shallow(<Recipe {...props} />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.recipe).toEqual(props.recipe);
  });
});
