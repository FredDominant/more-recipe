import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import store from '../../store/store';
import { AddRecipePage } from '../../components/AddRecipePage';
import mockData from '../../mocks/recipes.mock';
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
    expect(shallowWrapper.find('img').length).toBeGreaterThan(0);
    expect(shallowWrapper.find('.form-control').length).toBeGreaterThan(0);
    expect(shallowWrapper.find('#add-recipe-form').length).toBeGreaterThan(0);
    expect(shallowWrapper.find('div').length).toBeGreaterThan(6);
    expect(shallowWrapper.find('input').length).toBe(3);
    expect(shallowWrapper.find('button.btn-primary').length).toBe(1);
    expect(shallowWrapper.find('textarea').length).toBe(2);
  });
});

describe('onChange()', () => {
  it('should set recipe name field when input value changes', () => {
    const event = {
      target: { name: 'name', value: 'My food' }
    };
    const recipeNameInput = shallowWrapper.find('#recipeName');
    event.target.value = 'Awesome recipe';
    recipeNameInput.simulate('change', event);

    expect(shallowWrapper.instance().state.name).toBe('Awesome recipe');
  });
  it('should set recipe description field when input value changes', () => {
    const event = {
      target: { name: 'description', value: 'My description' }
    };
    const recipeDescriptionInput = shallowWrapper.find('#recipeDescription');
    event.target.value = 'My description';
    recipeDescriptionInput.simulate('change', event);

    expect(shallowWrapper.instance().state.description).toBe('My description');
  });
  it('should set recipe directions field when input value changes', () => {
    const event = {
      target: { name: 'directions', value: 'My directions' }
    };
    const recipeDirectionInput = shallowWrapper.find('#recipeDirections');
    event.target.value = 'My directions';
    recipeDirectionInput.simulate('change', event);

    expect(shallowWrapper.instance().state.directions).toBe('My directions');
  });
});
describe('handleSubmit()', () => {
  it('should be clickable', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('.btn-primary');

    form.simulate('submit', event);
  });
  it('should submit for valid recipes', () => {
    const { validRecipe } = mockData;
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState(validRecipe);

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors)
      .toEqual({});
  });
  it('should submit for recipes without images', () => {
    const { recipeWithoutImage } = mockData;
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState(recipeWithoutImage);

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors)
      .toEqual({});
  });
  it('should not submit for invalid recipes', () => {
    const { inValidRecipe } = mockData;
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState(inValidRecipe);

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors)
      .toEqual({});
  });
});
