import React from 'react';
import { shallow } from 'enzyme';

import { SearchPage } from '../../components/SearchPage';

const props = {
  recoverPassword: jest.fn(),
  recipes: [{}, {}],
};

/**
 * @description test for Search component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<SearchPage {...props} />);
  return { shallowWrapper };
}

describe('SearchPage component should', () => {
  it('render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});


describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    const nextProps = {
      recoverPassword: jest.fn(),
      recipes: [
        {
          id: 1,
          name: 'recipe 1',
          description: '',
          User: {
            firstName: 'first',
            lastName: 'last'
          },
        },
        {
          id: 2,
          name: 'recipe 2',
          description: '',
          User: {
            firstName: 'first',
            lastName: 'last'
          },
        }
      ],
      searchErrors: 'false'
    };
    const wrapper = shallow(<SearchPage {...nextProps} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.recipes.length).toEqual(2);
  });
});
