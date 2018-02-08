import React from 'react';
import { shallow } from 'enzyme';

import NotFoundPage from '../../components/NotFoundPage';
/**
 * @description test for Body component
 *
 * @returns {null} null
 */
function setup() {
  const wrapper = shallow(<NotFoundPage />);

  return {
    wrapper
  };
}

describe('Test for NotFoundPage component', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('strong').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('.text-center').length).toBe(2);
  });
});
