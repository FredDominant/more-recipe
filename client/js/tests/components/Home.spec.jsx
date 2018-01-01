import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../store/store';
import Home from '../../components/Home';
/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
  const props = {
    dispatch: jest.fn(),
    isFetching: false
  };
  const shallowWrapper = shallow(<Home {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Home {...props} />
      </BrowserRouter>
    </Provider>
  );

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
};

describe('Test for Home component', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });
});
