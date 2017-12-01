import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import uploadImage from '../utils/uploadImage';
import recipeValidator from '../validation/recipeValidator';
import addRecipe from '../actions/addRecipe';
/**
 * @description componet holds form to add recipes
 *
 * @class AddRecipe
 * @extends {React.Component}
 */
class AddRecipe extends React.Component {
/**
 * Creates an instance of AddRecipe.
 * @param {any} props
 * @memberof AddRecipe
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
    const image = event.target.files[0];
    this.setState({ recipeImage: image });
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
    const { name, description, ingredients, directions, recipeImage } = this.state;
    console.log(this.state);
    console.log('recipe image name is', recipeImage.name);
    if (recipeImage.name) {
      // return `recipeImage is ${recipeImage}`;
      return uploadImage(recipeImage)
        .then((response) => {
          const recipeUrl = response.data.secure_url;
          this.setState({ recipeImage: recipeUrl });
          this.props.createRecipe(this.state);
          console.log('image url is', recipeUrl);
          console.log('done uploading', recipeImage);
        })
        .catch((error) => {
          this.setState({ uploadImageError: error.error.message });
        });
    }
    // return 'i run here';
    return this.props.createRecipe({ name, description, ingredients, directions });
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
   * @returns {HTML} html
   * @memberof AddRecipe
   */
  render() {
    const errors = this.state.errors;
    return (
      <div>
        <div className="modal fade" id="addRecipe" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content container">
              <div className="modal-header">
                <h5 className="modal-title"><span id="title"><h3 title="More Recipes and cooking tips">More Recipes</h3></span></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container error-body">
                  {this.state.addRecipeError && <div className="alert alert-dismissible alert-danger" role="alert">{this.props.errorMessage}</div>}
                  {this.state.uploadImageError && <div className="alert alert-dismissible alert-danger" role="alert">{'Error while uploading image'}</div>}
                  {errors.name && <div className="alert alert-dismissible alert-danger" role="alert">{errors.name}</div>}
                  {errors.description && <div className="alert alert-dismissible alert-danger" role="alert">{errors.description}</div>}
                  {errors.ingredients && <div className="alert alert-dismissible alert-danger" role="alert">{errors.ingredients}</div>}
                  {errors.directions && <div className="alert alert-dismissible alert-danger" role="alert">{errors.directions}</div>}
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Recipe Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="recipeName"
                      aria-describedby="small-recipe-name"
                      placeholder="Awesome Recipe!"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="recipe-description">Recipe Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      id="recipe-description"
                      placeholder="Awesome sauce made out of nothing!"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cook-directions">Ingredients:</label>
                    <textarea
                      className="form-control"
                      id="cook-directions"
                      name="ingredients"
                      rows="3"
                      placeholder="Onions, tomatoes, grilled chicken, nutmeg"
                      value={this.state.ingredients}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cook-directions">Directions to cook:</label>
                    <textarea
                      className="form-control"
                      name="directions"
                      id="cook-directionss"
                      rows="3"
                      placeholder="dice tomatoes, tear chicken, boil onions, mix with nutmeg"
                      value={this.state.directions}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="recipeImage">Recipe Image</label>
                    <input
                      type="file"
                      className="form-control-file"
                      name="file"
                      id="recipeImage"
                      onChange={this.onUpload}
                    />
                  </div>
                  <button className="btn btn-primary">Add Recipe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errorMessage: state.addRecipe.addRecipeErrorMessage
});

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(addRecipe(recipe))
});

AddRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
AddRecipe.defaultProps = {
  errorMessage: null
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);

