import React from 'react';
import { shallow } from 'enzyme';

import Body from '../../components/Body';
/**
 * @description test for Body component
 *
 * @returns {null} null
 */
function setup() {
  const wrapper = shallow(<Body />);
  return {
    wrapper
  };
}

describe('Test for Body component', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
