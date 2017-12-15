import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import getOneRecipe from '../actions/getOneRecipe';

// import PropTypes from 'prop-types';
/**
 *
 *
 * @class UpdateRecipe
 * @extends {React.Component}
 */
class UpdateRecipe extends React.Component {
  /**
 * Creates an instance of UpdateRecipe.
 * @param {any} props
 * @memberof UpdateRecipe
 */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   *
   * @returns {null} null
   * @memberof UpdateRecipe
   */
  componentWillMount() {
    // console.log('props is', this.props);
    const recipeId = this.props.match.params.recipeId;
    // console.log(recipeId);
    this.props.getRecipeDetails(recipeId);
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof UpdateRecipe
   */
  render() {
    return (
      <div>
        <Navbar />
        <br />
        <div className="container">
          <form>
            <div className="row">
              <div className="col-sm-4">
                <div className="recipe-image">
                  <img className="img-thumbnail" src="" alt="" srcSet="" />
                </div>
                <br />
                <label htmlFor="upload" className="file-upload__label">upload image</label>
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange=""
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
                    value=""
                    onChange=""
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipeDescription">Recipe Description</label>
                  <input
                    type="text"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="An awesome sauce by Michael"
                    name="description"
                    value=""
                    onChange=""
                  />
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
                    value=""
                    onChange=""
                  />
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
                    value=""
                    onChange=""
                  />
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
  recipeDetails: state
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(getOneRecipe(id))
});

UpdateRecipe.propTypes = {
  match: PropTypes.shape().isRequired,
  getRecipeDetails: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe);
