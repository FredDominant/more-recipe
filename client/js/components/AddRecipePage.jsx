import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import toastr from 'toastr';

import uploadImage from '../utils/uploadImage';
import recipeValidator from '../validation/recipeValidator';
import addRecipe from '../actions/addRecipe';
/**
 *
 * @class AddRecipePage
 *
 * @extends {React.Component}
 */
export class AddRecipePage extends React.Component {
/**
 * @description Creates an instance of AddRecipePage.
 *
 * @param {any} props
 *
 * @memberof AddRecipePage
 */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredients: '',
      directions: '',
      isUploading: false,
      recipeImage: '/images/noImage.png',
      errors: {},
      addRecipeError: '',
      uploadImageError: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }
  /**
 * @description component lifecycle method
 *
 * @returns {null} null
 *
 * @param {nextProp} nextProp object from store
 *
 * @memberof AddRecipe
 */
  componentWillReceiveProps(nextProp) {
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
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ recipeImage: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
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
 *
 * @memberof AddRecipe
 */
  addNewRecipe() {
    const { recipeImage, name, description, directions, ingredients } = this.state;
    if (recipeImage !== '/images/noImage.png') {
      this.setState({ isUploading: true });
      return uploadImage(recipeImage)
        .then((response) => {
          const recipeUrl = response.data.secure_url;
          console.log('recipe url is', recipeUrl);
          this.setState({ recipeImage: recipeUrl, isUploading: false });
          this.props.createRecipe(this.state);
        })
        .catch(() => {
          this.setState({ isUploading: false, uploadImageError: 'Could not upload image. Recipe not added' });
          toastr.options = {
            closeButton: true
          };
          toastr.error(this.state.uploadImageError);
        });
    }
    console.log('jumped to this place');
    this.props.createRecipe({ name, directions, ingredients, description });
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
   * @memberof AddRecipePage
   *
   * @returns {null} null
   */
  handleSelectImage() {
    $('input[type=file]').click();
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof AddRecipePage
   */
  render() {
    const { errors, recipeImage, name, description, directions, ingredients } = this.state;
    return (
      <div className="container-fluid">
        <div id="add-recipe-form" className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <div
                  className="recipe-image"
                  id="add-recipe-image-container"
                  onClick={this.handleSelectImage}
                  role="presentation"
                >
                  <img
                    className="img-thumbnail"
                    src={recipeImage}
                    alt=""
                    srcSet=""
                    id="add-recipe-image"
                  />
                </div>
                <br />
                <input
                  style={{ display: 'none' }}
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
                    name="name"
                    value={name}
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
                    name="description"
                    value={description}
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
                    id="recipeDirections"
                    className="form-control"
                    name="directions"
                    value={directions}
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
                    placeholder="Comma separated list of ingredients"
                    name="ingredients"
                    value={ingredients}
                    onChange={this.onChange}
                  />
                  {errors.ingredients && <small className="form-text text-muted">
                    <span className="error-text"> {errors.ingredients} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <button className="btn btn-primary">
                    {
                      !this.state.isUploading &&
                      <h6 className="text-center"> Add Recipe </h6>
                    }
                    {
                      this.state.isUploading &&
                      <h6 className="text-center"> Uploading Image... </h6>
                    }
                    {
                      this.props.loading &&
                      <span> <MDSpinner /></span>
                    }
                  </button>
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
  addRecipeSuccess: state.addRecipe.addRecipeSuccess,
  loading: state.isUploading
});

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(addRecipe(recipe))
});

AddRecipePage.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
AddRecipePage.defaultProps = {
  errorMessage: null,
  addRecipeSuccess: null
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipePage);

