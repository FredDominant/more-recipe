import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import store from '../../store/store';

import { UserRecipePage } from '../../components/UserRecipePage';


/**
 * @description test for Body component
 *
 * @returns {null} null
 */


describe('UserRecipePage component', () => {
  it('should render correctly', () => {
    const props = {
      getAllUserRecipes: jest.fn(),
      fetching: false,
      pageInfo: {},
      deleteRecipe: jest.fn(),
      userRecipes: [{}, {}]
    };
    const shallowWrapper = shallow(<UserRecipePage {...props} store={store} />);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render loading gif is recipes are being fetched correctly', () => {
    const newProps = {
      getAllUserRecipes: jest.fn(),
      fetching: true,
      pageInfo: {},
      deleteRecipe: jest.fn(),
      userRecipes: []
    };
    const shallowWrapper = shallow(<UserRecipePage {...newProps} store={store} />);
    expect(shallowWrapper.find('.loading-icon-container').length).toEqual(1);
  });

  it('should render correctly if there are no recipes', () => {
    const newProps = {
      getAllUserRecipes: jest.fn(),
      fetching: false,
      pageInfo: {},
      deleteRecipe: jest.fn(),
      userRecipes: []
    };
    const shallowWrapper = shallow(<UserRecipePage {...newProps} store={store} />);
    expect(shallowWrapper.find('h3').length).toEqual(1);
  });
});

describe('onPageChange', () => {
  it('should work correctly', () => {
    sinon.spy(UserRecipePage.prototype, 'onPageChange');
    const props = {
      getAllUserRecipes: jest.fn(),
      fetching: false,
      pageInfo: {},
      deleteRecipe: jest.fn(),
      userRecipes: [{}, {}]
    };
    const selected = {
      current: 1
    };
    const shallowWrapper = shallow(<UserRecipePage {...props} store={store} />);
    shallowWrapper.instance().onPageChange(selected);
    expect(shallowWrapper.instance().props.getAllUserRecipes).toBeCalled();
  });
});
