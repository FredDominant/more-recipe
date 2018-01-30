import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';
import getOneRecipe from '../actions/getOneRecipe';
import updateRecipe from '../actions/updateRecipe';
import recipeValidator from '../validation/recipeValidator';

/**
 *
 * @class UpdateRecipe
 *
 * @extends {React.Component}
 */
class UpdateRecipe extends React.Component {
  /**
 * @description Creates an instance of UpdateRecipe.
 *
 * @param {any} props
 *
 * @memberof UpdateRecipe
 */
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      ingredients: '',
      directions: '',
      picture: '',
      errors: '',
      selectedImage: false,
      toggleEdit: true
    };
    this.onChange = this.onChange.bind(this);
    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof UpdateRecipe
   */
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId);
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} nextProps
   *
   * @memberof UpdateRecipe
   */
  componentWillReceiveProps(nextProps) {
    const { id, name, description, directions, ingredients, picture } = nextProps.recipeDetails;
    this.setState({ id, name, directions, description, ingredients, picture });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  onUpload(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ picture: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ selectedImage: true });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  onToggleEdit(event) {
    event.preventDefault();
    this.setState({ toggleEdit: !this.state.toggleEdit });
  }
  /**
*
* @returns {boolean} isValid

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
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  handleSubmit(event) {
    event.preventDefault();
    const { id } = this.state;
    if (this.isValid()) {
      this.props.updateRecipe(this.state, id);
      this.setState({ errors: {} });
    }
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof UpdateRecipe
   */
  render() {
    const {
      name,
      description,
      ingredients,
      directions,
      picture,
      toggleEdit,
      errors
    } = this.state;
    return (
      <div>
        <div className="container">
          <br />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="recipe-image">
                    <img
                      className="img-thumbnail img-responsive"
                      src={picture}
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <br />
                  <label htmlFor="upload" className="file-upload__label">upload image</label>
                  <input
                    type="file"
                    name="file"
                    accept=".png,.gif,.jpg,.jpeg"
                    id="file-upload"
                    onChange={this.onUpload}
                    disabled={toggleEdit}
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
                      value={name}
                      onChange={this.onChange}
                      disabled={toggleEdit}
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
                      value={description}
                      onChange={this.onChange}
                      disabled={toggleEdit}
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
                      value={directions}
                      onChange={this.onChange}
                      disabled={toggleEdit}
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
                      value={ingredients}
                      onChange={this.onChange}
                      disabled={toggleEdit}
                    />
                    {errors.ingredients && <small className="form-text text-muted">
                      <span className="error-text"> {errors.ingredients} </span>
                    </small>}
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4 col-sm-6 col-lg-4">
                        <button
                          className="btn btn-success"
                          onClick={this.onToggleEdit}
                        >
                          {
                            !this.state.toggleEdit && <span><i className="fas fa-lock" /></span>
                          }
                          {
                            this.state.toggleEdit && <span><i className="fas fa-unlock" /></span>
                          }
                        </button>
                      </div>
                      <div className="col-md-4 col-sm-6 col-lg-4">
                        <button
                          className="btn btn-primary"
                          disabled={toggleEdit}
                        >Update Recipe</button>
                      </div>
                      <div className="col-md-4 col-sm-6 col-lg-4" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipeDetails: state.getOneRecipe.singleRecipe,
  errorMessage: state.getOneRecipe.errorMessage,
  updateSuccess: state.getOneRecipe.editRecipeSuccess,
  updateError: state.getOneRecipe.editRecipeError
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(getOneRecipe(id)),
  updateRecipe: (recipe, id) => dispatch(updateRecipe(recipe, id))
});

UpdateRecipe.propTypes = {
  match: PropTypes.shape().isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  recipeDetails: PropTypes.shape(),
  updateRecipe: PropTypes.func.isRequired,
};

UpdateRecipe.defaultProps = {
  recipeDetails: {},
  updateSuccess: '',
  updateError: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe);
