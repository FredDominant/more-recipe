import React from 'react';
import { shallow } from 'enzyme';

import ViewReviews from '../../components/ViewReviews';
/**
 * @description test for Body component
 *
 * @returns {null} null
 */
function setup() {
  const wrapper = shallow(<ViewReviews />);

  return {
    wrapper
  };
}

describe('Test for ViewReviews component', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBeGreaterThan(0);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.reviewer-name').length).toBe(1);
    expect(wrapper.find('#reviewer-image').length).toBe(1);
    expect(wrapper.find('.reviewer-image').length).toBe(1);
    expect(wrapper.find('small').length).toBe(3);
    expect(wrapper.find('#review-date').length).toBe(1);
    expect(wrapper.find('.row').length).toBe(1);
  });
});
