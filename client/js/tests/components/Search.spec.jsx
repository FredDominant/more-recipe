import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import store from '../../store/store';

import { Search } from '../../components/Search';

const props = {
  search: jest.fn(),
};

/**
 * @description test for Search component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<Search {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Search {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );
  return {
    shallowWrapper,
    mountedWrapper
  };
}
describe('Search component', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });

  describe('onChange', () => {
    it('should set form value', () => {
      const event = {
        target: { name: 'searchParam', value: 'recipes' }
      };
      const { shallowWrapper } = setup();
      const searchField = shallowWrapper.find('#search-box');
      searchField.simulate('change', event);
      expect(shallowWrapper.instance().state.searchParam).toBe('recipes');
    });
  });

  describe('onFocus should', () => {
    it('redirect to another page', () => {
      sinon.spy(Search.prototype, 'onFocus');
      const { shallowWrapper } = setup();
      const searchField = shallowWrapper.find('#search-box');
      searchField.simulate('focus');
      expect(Search.prototype.onFocus.calledOnce).toEqual(true);
    });
  });

  describe('handleSubmit()', () => {
    it('to work if called', () => {
      const wrapper = shallow(<Search {...props} />);
      sinon.spy(Search.prototype, 'handleSubmit');
      const event = {
        preventDefault: jest.fn()
      };
      const form = wrapper.find('form');
      wrapper.setState({ serachParam: 'recipes' });
      form.simulate('submit', event);
      wrapper.instance().handleSubmit(event);
      const search = jest.spyOn(wrapper.instance().props, 'search');
      expect(search).toBeCalled();
      expect(Search.prototype.handleSubmit.calledOnce).toEqual(false);
    });
  });
});
