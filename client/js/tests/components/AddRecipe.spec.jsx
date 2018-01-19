import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import store from '../../store/store';
import { AddRecipePage } from '../../components/AddRecipePage';
/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
  const props = {
    dispatch: jest.fn(),
    isFetching: false,
    createRecipe: jest.fn(() => Promise.resolve()),
    loading: false
  };
  const shallowWrapper = shallow(<AddRecipePage {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <AddRecipePage {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
};
const { mountedWrapper, shallowWrapper } = setup();
describe('Test for AddRecipePage component', () => {
  it('should render correctly', () => {
    expect(mountedWrapper).toMatchSnapshot();
  });
  it('should contain a form', () => {
  });
});
