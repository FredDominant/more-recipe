import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import getOneRecipe from '../actions/getOneRecipe';
import upvoteRecipe from '../actions/upvote';
import downvoteRecipe from '../actions/downvote';
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
      recipe: '',
      review: '',
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
    console.log(nextProps, 'nextprops');
    const recipe = nextProps.recipe;
    const reviews = nextProps.recipe.Reviews;
    const owner = nextProps.recipe.User;
    console.log(reviews);
    // const success = nextProps.upvotes.upvoteRecipe;
    this.setState({ recipe, reviews, owner });
  }

  /**
 * @description handles upvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleUpvote() {
    const recipeId = this.props.recipe.id;
    console.log('upvoting recipe with id', recipeId);
    this.props.upvoteRecipe(recipeId);
  }

  /**
 * @description handles downvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleDownvote() {
    const recipeId = this.props.recipe.id;
    console.log('downvoting recipe with id', this.state.recipe.id);
    this.props.downvoteRecipe(recipeId);
  }

  /**
 * @description handles upvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleFavourite() {
    console.log('favouriting recipe with id', this.state.recipe.id);
  }

  /**
   *
   *
   * @returns {component} react component
   * @memberof Recipe
   */
  render() {
    return (
      <div>
        <Navbar user="registered" />
        <div className="container">
          <h3>Recipe Name: {this.state.recipe.name}</h3>
          {/* <h3>Recipe Owner: {`${this.state.owner.firstname} ${this.state.owner.lastname}`}</h3> */}
          <h3>Recipe Description: {this.state.recipe.description}</h3>
          <h3>Recipe Ingredients: {this.state.recipe.ingredients}</h3>
          <h3>Recipe Directions: {this.state.recipe.directions}</h3>
          <h3>Upvotes: {this.state.recipe.upvote}</h3>
          <h3>Downvotes: {this.state.recipe.downvote}</h3>
          <hr />
          <div className="actions">
            <button onClick={this.handleUpvote} className="btn btn-primary">upvote</button>
            <button onClick={this.handleDownvote} className="btn btn-warning">downvote</button>
            <button onClick={this.handleFavourite} className="btn btn-success">favourite</button>
          </div>
          <hr />
          <div className="container">
            <h5>
              {this.state.review}
            </h5>
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
  recipe: PropTypes.shape(),
  // upvotes: PropTypes.bool.isRequired
};
Recipe.defaultProps = {
  recipe: null
};

const mapStateToProps = state => ({
  recipe: state.getOneRecipe.singleRecipe,
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: recipeId => dispatch(getOneRecipe(recipeId)),
  upvoteRecipe: recipeId => dispatch(upvoteRecipe(recipeId)),
  downvoteRecipe: recipeId => dispatch(downvoteRecipe(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

