import React from 'react';
import { shallow } from 'enzyme';

import App from '../../components/App';
/**
 * @description test for Body component
 *
 * @returns {null} null
 */
function setup() {
  const wrapper = shallow(<App />);

  return {
    wrapper
  };
}

describe('Test for App component', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
