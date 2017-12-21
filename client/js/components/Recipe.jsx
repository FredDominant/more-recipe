import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import getOneRecipe from '../actions/getOneRecipe';
import upvoteRecipe from '../actions/upvote';
import addFavourites from '../actions/addFavourites';
import downvoteRecipe from '../actions/downvote';
import ViewReviews from '../components/ViewReviews';
import AddReview from '../components/AddReview';
import capitalize from '../utils/capitalize';
/**
 *
 *
 * @class Recipe
 * @extends {React.Component}
 */
class Recipe extends React.Component {
/**
 * Creates an instance of Recipe.
 * @param {any} props
 * @memberof Recipe
 */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      reviews: [],
      owner: ''
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  /**
   * @returns {null} null
   *
   * @param {any} nextProps
   * @memberof Recipe
   */
  componentWillMount() {
    this.props.getRecipeDetails(this.props.match.params.recipeId);
  }
  /**
   *
   * @return {null} null
   * @param {any} nextProps
   * @memberof Recipe
   */
  componentWillReceiveProps(nextProps) {
    const recipe = nextProps.recipe;
    const reviews = nextProps.recipe.Reviews;
    const owner = nextProps.recipe.User;
    this.setState({ recipe, reviews, owner });
  }

  /**
 * @description handles upvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleUpvote() {
    const recipeId = this.props.recipe.id;
    this.props.upvoteRecipe(recipeId);
  }

  /**
 * @description handles downvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleDownvote() {
    const recipeId = this.props.recipe.id;
    this.props.downvoteRecipe(recipeId);
  }

  /**
 * @description handles upvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleFavourite() {
    const recipeId = this.props.recipe.id;
    this.props.favourite(recipeId);
    console.log('favourited');
  }
  /**
   *
   *
   * @returns {component} react component
   * @memberof Recipe
   */
  render() {
    const ingredients = (this.state.recipe.ingredients) ? (this.state.recipe.ingredients) : '';
    console.log('ingredients is', ingredients);
    const splitIngredients = ingredients.split(',').map((item, i) => (
      <li key={`${i}`}>{item}</li>
    ));

    const { reviews } = this.state;
    const sortedReviews = reviews.sort((a, b) => (b.id - a.id));
    const allReviews = sortedReviews.map((review, i) => (
      <div key={`review ${i + 1}`} className="container">
        <ViewReviews
          image={review.User.picture}
          firstname={review.User.firstname}
          lastname={review.User.lastname}
          content={review.content}
        />
      </div>
    ));
    return (
      <div >
        <Navbar />
        <div className="container">
          <div className="container">
            <br />
            <div className="row">
              <div className="col-md-6 col-sm-8">
                <div className="image-container">
                  <img src={this.state.recipe.picture} alt="" height="50" width="50" className="img-thumbnail" />
                </div>
              </div>
              <div className="col-md-6">
                <h2>{this.state.recipe.name ? capitalize(this.state.recipe.name) : '' }</h2>
                <h5>{this.state.recipe.description ? capitalize(this.state.recipe.description) : '' }</h5>
                <ul>
                  {splitIngredients}
                </ul>
              </div>
            </div>
            <br />

            <h3>Ingredients: {this.state.recipe.ingredients}</h3>
            <h3>Recipe Owner: {`${this.state.owner.firstname} ${this.state.owner.lastname}`}</h3>
            <h3>Recipe Directions: {this.state.recipe.directions}</h3>
            <h3>Upvotes: {this.state.recipe.upvote}</h3>
            <h3>Downvotes: {this.state.recipe.downvote}</h3>
            <hr />
            {this.props.authenticated && <div className="actions">
              <div className="btn-group" role="group" >

                <button
                  type="button"
                  title="upvote this recipe"
                  className="btn btn-outline-danger"
                  onClick={this.handleUpvote}
                ><i className="far fa-thumbs-up" /></button>

                <button
                  type="button"
                  title="downvote this recipe"
                  className="btn btn-outline-danger"
                  onClick={this.handleDownvote}
                ><i className="far fa-thumbs-down" /></button>

                <button
                  type="button"
                  title="add to your favourites"
                  className="btn btn-outline-danger"
                  onClick={this.handleFavourite}
                ><i className="fab fa-gratipay" /></button>
              </div>
            </div> }
            <div className="container-fluid" id="review-body">
              <h5>Reviews</h5>
              <div className="add-review-form">
                {this.props.authenticated && <AddReview recipeId={this.state.recipe.id} />}
                <br />
              </div>
              { allReviews.length > 0 && <div>
                {allReviews}
              </div>}
              { !allReviews.length && <div className="emptyContent">
                <h2>There are currently no reviews for this recipe.</h2>
              </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Recipe.propTypes = {
  match: PropTypes.shape().isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  favourite: PropTypes.func.isRequired,
  recipe: PropTypes.shape(),
  authenticated: PropTypes.bool.isRequired
};
Recipe.defaultProps = {
  recipe: {}
};

const mapStateToProps = state => ({
  recipe: state.getOneRecipe.singleRecipe,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: recipeId => dispatch(getOneRecipe(recipeId)),
  upvoteRecipe: recipeId => dispatch(upvoteRecipe(recipeId)),
  downvoteRecipe: recipeId => dispatch(downvoteRecipe(recipeId)),
  favourite: recipeId => dispatch(addFavourites(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

