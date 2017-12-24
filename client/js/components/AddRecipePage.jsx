import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import uploadImage from '../utils/uploadImage';
import recipeValidator from '../validation/recipeValidator';
import addRecipe from '../actions/addRecipe';
import Navbar from '../components/Navbar';
/**
 *
 *
 * @class AddRecipePage
 * @extends {React.Component}
 */
class AddRecipePage extends React.Component {
/**
 * Creates an instance of AddRecipePage.
 * @param {any} props
 * @memberof AddRecipePage
 */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredients: '',
      directions: '',
      recipeImage: '',
      errors: {},
      addRecipeError: '',
      uploadImageError: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  /**
 * @description component lifecycle method
 * @returns {null} null
 * @param {nextProp} nextProp object from store
 * @memberof AddRecipe
 */
  componentWillReceiveProps(nextProp) {
    console.log('nextProp is:', nextProp);
    this.setState({ addRecipeError: nextProp.errorMessage });
  }

  /**
 *
 * @returns {null} null
 * @param {any} event
 * @memberof AddRecipe
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
*
* @returns {null} null
* @param {any} event
* @memberof AddRecipe
*/
  onUpload(event) {
    // const image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ recipeImage: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    // this.setState({ recipeImage: image });
  }
  /**
*
* @returns {null} null
* @memberof AddRecipe
*/
  isValid() {
    const { errors, isValid } = recipeValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
 *
 * @returns {null} null
 * @memberof AddRecipe
 */
  addNewRecipe() {
    const { recipeImage, name, description, directions, ingredients } = this.state;
    console.log(this.state);
    if (recipeImage.length && this.isValid()) {
      return uploadImage(recipeImage)
        .then((response) => {
          const recipeUrl = response.data.secure_url;
          this.setState({ recipeImage: recipeUrl });
          this.props.createRecipe(this.state);
          console.log('image url is', recipeUrl);
          console.log('done uploading', recipeImage);
        })
        .catch((error) => {
          console.log('upload error is....');
          this.setState({ uploadImageError: error.error.message });
        });
    }
    console.log('adding recipe without image');
    this.props.createRecipe({ name, directions, ingredients, description });
    console.log('added recipe without image');
  }
  /**
*
* @returns {null} null
* @param {any} event
* @memberof AddRecipe
*/
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.addNewRecipe();
    }
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof AddRecipePage
   */
  render() {
    const errors = this.state.errors;
    if (this.props.errorMessage) {
      toastr.options = {
        closeButton: true
      };
      toastr.error(this.props.errorMessage, 'Unable to add new Recipe');
      console.log('toast error');
    }
    if (this.props.addRecipeSuccess && !this.props.errorMessage) {
      toastr.options = {
        closeButton: true
      };
      toastr.success('Recipe Added');
      console.log('toast success');
    }
    return (
      <div className="container-fluid">
        <Navbar />
        <div id="add-recipe-form" className="container">
          {/* <div className="container error-body">
            {this.state.uploadImageError && <div className="alert alert-dismissible alert-danger" role="alert">{'Error while uploading image'}</div>}
            {errors.name && <div className="alert alert-dismissible alert-danger" role="alert">{errors.name}</div>}
            {errors.description && <div className="alert alert-dismissible alert-danger" role="alert">{errors.description}</div>}
            {errors.ingredients && <div className="alert alert-dismissible alert-danger" role="alert">{errors.ingredients}</div>}
            {errors.directions && <div className="alert alert-dismissible alert-danger" role="alert">{errors.directions}</div>}
          </div> */}
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <div className="recipe-image">
                  <img className="img-thumbnail" src={this.state.recipeImage} alt="" srcSet="" />
                </div>
                <br />
                <label htmlFor="upload" className="file-upload__label">upload image</label>
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={this.onUpload}
                />
              </div>
              <div className="col-sm-8">
                <div className="form-group">
                  <label htmlFor="recipeName">Recipe Name</label>
                  <input
                    type="text"
                    id="recipeName"
                    className="form-control"
                    placeholder="Michael's Awesome Sauce"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && <small className="form-text text-muted">
                    <span className="error-text"> {errors.name} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <label htmlFor="recipeDescription">Recipe Description</label>
                  <input
                    type="text"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="An awesome sauce by Michael"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && <small className="form-text text-muted">
                    <span className="error-text"> {errors.description} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <label htmlFor="recipeDirections">Recipe Directions</label>
                  <textarea
                    type="text"
                    rows="5"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="Michael's Awesome Sauce"
                    name="directions"
                    value={this.state.directions}
                    onChange={this.onChange}
                  />
                  {errors.directions && <small className="form-text text-muted">
                    <span className="error-text"> {errors.directions} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <label htmlFor="recipeingredients">Ingredients</label>
                  <textarea
                    type="text"
                    rows="5"
                    id="recipeIngredients"
                    className="form-control"
                    placeholder="Michael's Ingredient list"
                    name="ingredients"
                    value={this.state.ingredients}
                    onChange={this.onChange}
                  />
                  {errors.ingredients && <small className="form-text text-muted">
                    <span className="error-text"> {errors.ingredients} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <button className="btn btn-primary">Create Recipe</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errorMessage: state.addRecipe.addRecipeErrorMessage,
  addRecipeSuccess: state.addRecipe.addRecipeSuccess
});

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(addRecipe(recipe))
});

AddRecipePage.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  addRecipeSuccess: PropTypes.string
};
AddRecipePage.defaultProps = {
  errorMessage: null,
  addRecipeSuccess: null
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipePage);

