import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import store from '../../store/store';
import { AddRecipePage } from '../../components/AddRecipePage';
import mockData from '../mocks/recipes.mock';

const props = {
  dispatch: jest.fn(),
  isFetching: false,
  createRecipe: jest.fn(() => Promise.resolve()),
  loading: false,
  errorMessage: 'error',
  allRecipes: []
};

const state = {
  name: '',
  description: '',
  ingredients: '',
  directions: '',
  isUploading: false,
  picture: '/images/noImage.png',
  errors: {},
  addRecipeError: '',
  uploadImageError: ''
};
/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
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
describe('Test for AddRecipePage component', () => {
  const { mountedWrapper, shallowWrapper } = setup();
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
    sinon.spy(AddRecipePage.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'name', value: 'My food' }
    };
    const recipeNameInput = shallowWrapper.find('#recipeName');
    event.target.value = 'Awesome recipe';
    recipeNameInput.simulate('change', event);

    expect(shallowWrapper.instance().state.name).toBe('Awesome recipe');
  });

  it('should set recipe description field when input value changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'description', value: 'My description' }
    };
    const recipeDescriptionInput = shallowWrapper.find('#recipeDescription');
    event.target.value = 'My description';
    recipeDescriptionInput.simulate('change', event);

    expect(shallowWrapper.instance().state.description).toBe('My description');
  });

  it('should set recipe directions field when input value changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'directions', value: 'My directions' }
    };
    const recipeDirectionInput = shallowWrapper.find('#recipeDirections');
    event.target.value = 'My directions';
    recipeDirectionInput.simulate('change', event);

    expect(shallowWrapper.instance().state.directions).toBe('My directions');
  });
});

describe('onUpload()', () => {
  beforeEach(() => {
    global.FileReader = () => ({
      readAsDataURL: () => {},
      onload: e => e
    });
    global.reader = {
      onload: () => {}
    };
  });

  it('should select an image when clicked', () => {
    const { shallowWrapper } = setup();
    const event = mockData.uploadImage;
    const action = shallowWrapper.instance();
    action.onUpload(event);
    action.setState({
      recipeImage: event.target.files
    });
    expect(action.state.recipeImage).toBe(event.target.files);
  });
});

describe('handleSubmit()', () => {
  it('should be clickable', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('.btn-primary');
    form.simulate('submit', event);
  });

  it('should submit for valid recipes', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState({
      name: 'randon name',
      description: 'description',
      ingredients: 'ingredients, ingredients, ingredients',
      directions: 'some directionsssss',
      picture: '/images/noImage.png',
    });

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors)
      .toEqual({});
  });

  it('should not submit for invalid recipes', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState({
      name: '',
      description: '',
      ingredients: '',
      directions: '',
    });
    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors).not.toEqual({});
  });

  it('should submit for recipes without images', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState({
      name: 'randon name',
      description: 'description',
      ingredients: 'ingredients, ingredients, ingredients',
      directions: 'some directionsssss',
    });

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors)
      .toEqual({});
  });

  it('should not submit for invalid recipes', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState({
      name: '',
      description: 'description',
      ingredients: 'ingredients, ingredients, ingredients',
      directions: 'some directionsssss',
      picture: '/images/noImage.png',
    });

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors).not
      .toEqual({});
  });
});

describe('handleSelectImage()', () => {
  it('should be called when image is clicked', () => {
    const { shallowWrapper } = setup();
    const selectImage = shallowWrapper.find('.recipe-image');
    selectImage.simulate('click');
  });
});

describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    const wrapper = shallow(<AddRecipePage {...props} />);
    wrapper.setState(state);
    wrapper.instance().componentWillReceiveProps(props);
    expect(AddRecipePage.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });
});

