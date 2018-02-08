import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import store from '../../store/store';

import { Favourites } from '../../components/Favourites';


/**
 * @description test for Favourites component
 *
 * @returns {null} null
 */


describe('UserRecipePage component', () => {
  sinon.spy(Favourites.prototype, 'componentWillReceiveProps');

  it('should render correctly', () => {
    const props = {
      getAllFavourites: jest.fn(),
      fetching: false,
      pageInfo: {},
      removeFromFavourite: jest.fn(),
      favourites: [
        {
          id: 1,
          Recipe: {
            picture: 'randomw.jpg',
            upvote: 1,
            downvote: 1,
            name: 'recipe 1',
            description: 'recipe 1',
            favourites: 1,
            User: {
              firstName: '',
              lastName: ''
            }
          },
        },
        {
          id: 2,
          Recipe: {
            picture: 'random.jpg',
            upvote: 1,
            downvote: 1,
            name: 'recipe 2',
            description: 'recipe 2',
            favourites: 1,
            User: {
              firstName: '',
              lastName: ''
            }
          },
        }
      ]
    };
    const shallowWrapper = shallow(<Favourites {...props} store={store} />);
    shallowWrapper.setState({
      userFavourites: props.favourites
    });
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render correctly if request is fetching', () => {
    const props = {
      getAllFavourites: jest.fn(),
      fetching: true,
      pageInfo: {},
      removeFromFavourite: jest.fn(),
      favourites: [{}, {}]
    };
    const shallowWrapper = shallow(<Favourites {...props} store={store} />);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render correctly if there are no favourite recipes', () => {
    const props = {
      getAllFavourites: jest.fn(),
      fetching: true,
      pageInfo: {},
      removeFromFavourite: jest.fn(),
      favourites: []
    };
    const shallowWrapper = shallow(<Favourites {...props} store={store} />);
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    const props = {
      favourites: [],
      getAllFavourites: jest.fn(),
      fetching: true,
      pageInfo: {},
      removeFromFavourite: jest.fn(),
    };
    const wrapper = shallow(<Favourites {...props} />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(Favourites.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });
});

describe('onPageChange', () => {
  it('should work correctly', () => {
    sinon.spy(Favourites.prototype, 'onPageChange');
    const props = {
      favourites: [],
      getAllFavourites: jest.fn(),
      fetching: true,
      pageInfo: {},
      removeFromFavourite: jest.fn(),
    };
    const selected = {
      current: 1
    };
    const shallowWrapper = shallow(<Favourites {...props} store={store} />);
    shallowWrapper.instance().onPageChange(selected);
    expect(shallowWrapper.instance().props.getAllFavourites).toBeCalled();
  });
});
