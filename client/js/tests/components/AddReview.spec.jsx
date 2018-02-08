import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import store from '../../store/store';

import { AddReview } from '../../components/AddReview';

const props = {
  postReview: jest.fn(),
  recipeId: 1
};
/**
 * @description test for Body component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<AddReview {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <AddReview {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );
  return {
    shallowWrapper,
    mountedWrapper
  };
}

describe('Test for AddReview component', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });
});

describe('onChange()', () => {
  it('should set comment field when input value changes', () => {
    const event = {
      target: { name: 'content', value: 'some comment' }
    };
    const { shallowWrapper } = setup();
    const commentInputField = shallowWrapper.find('.form-control');
    commentInputField.simulate('change', event);
    expect(shallowWrapper.instance().state.content).toBe('some comment');
  });
});

describe('handleSubmit()', () => {
  it('should not work if form value is empty', () => {
    sinon.spy(AddReview.prototype, 'handleSubmit');
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('#review-form');
    const addReviewProps = jest.spyOn(shallowWrapper.instance().props, 'postReview');
    form.simulate('submit', event);
    expect(addReviewProps).not.toBeCalled();
  });

  it('should dispatch if form value is not empty', () => {
    const wrapper = shallow(<AddReview {...props} />);

    const event = {
      preventDefault: jest.fn(),
      target: {
        content: 'abcde'
      }
    };

    const form = wrapper.find('#review-form');
    form.simulate('submit', event);
    wrapper.setState({ content: 'yesysysy' });
    wrapper.instance().handleSubmit(event);
    expect(AddReview.prototype.handleSubmit.calledOnce).toEqual(true);
  });
});
