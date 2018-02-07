import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from './Footer';
import getOneRecipe from '../actions/getOneRecipe';
import upvoteRecipe from '../actions/upvote';
import addFavourites from '../actions/addFavourites';
import downvoteRecipe from '../actions/downvote';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import NotFoundPage from '../components/NotFoundPage';
import capitalize from '../utils/capitalize';
import Loading from '../components/Loading';
/**
 *
 * @class Recipe
 *
 * @extends {React.Component}
 */
export class Recipe extends React.Component {
/**
 * @description Creates an instance of Recipe.
 *
 * @param {any} props
 *
 * @memberof Recipe
 */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      favourited: '',
      owner: '',
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  /**
   * @returns {null} null
   *
   * @param {any} nextProps
   *
   * @memberof Recipe
   */
  componentWillMount() {
    this.props.getRecipeDetails(this.props.match.params.recipeId);
  }
  /**
   *
   * @return {null} null
   *
   * @param {any} nextProps
   *
   * @memberof Recipe
   */
  componentWillReceiveProps(nextProps) {
    const recipe = (nextProps.recipe) ? (nextProps.recipe) : {};
    const reviews = (recipe.Reviews) ? (recipe.Reviews) : [];
    const owner = (recipe.User) ? (recipe.User) : {};
    this.setState({ recipe, reviews, owner, favourited: nextProps.favourited });
  }

  /**
 * @description handles upvote event
 *
 * @returns {null} null
 *
 * @memberof Recipe
 */
  handleUpvote() {
    const recipeId = this.props.recipe.id;
    this.props.upvoteRecipe(recipeId);
  }

  /**
 * @description handles downvote event
 *
 * @returns {null} null
 *
 * @memberof Recipe
 */
  handleDownvote() {
    const recipeId = this.props.recipe.id;
    this.props.downvoteRecipe(recipeId);
  }

  /**
 * @description handles upvote event
 *
 * @returns {null} null
 *
 * @memberof Recipe
 */
  handleFavourite() {
    const recipeId = this.props.recipe.id;
    this.props.favourite(recipeId);
  }
  /**
   *
   * @returns {component} react component
   *
   * @memberof Recipe
   */
  render() {
    const { fetching, authenticated } = this.props;
    const { recipe, owner, favourited } = this.state;
    if ((fetching) && !(recipe.id)) {
      return (
        <div className="container loading-icon-container">
          <div className="text-center mt-30 loading-icon">
            <Loading size={100} />
          </div>
        </div>
      );
    }
    if (!recipe.id) {
      return <NotFoundPage />;
    }
    const ingredients = (recipe.ingredients) ? (recipe.ingredients) : '';
    const splitIngredients = ingredients.split(',').map((item, i) => (
      <li className="list-group-item text-left" key={`ingredient ${i + 1}`}>{capitalize(item)}</li>
    ));

    const { directions } = this.state.recipe;
    return (
      <div >
        <div className="container">
          <div className="container">
            <br />
            <div className="row">
              <div className="col-md-6 col-sm-8">
                <div className="image-container">
                  <img
                    className="img-thumbnail img-fluid"
                    src={recipe.picture}
                    alt={recipe.name}
                    height="50"
                    width="50"
                  />
                </div>
              </div>
              <div className="col-md-6 container">
                <h2 className="text-left recipe-details-name ml-5">{recipe.name ? capitalize(recipe.name) : '' }</h2>
                <h5 className="text-left recipe-details-description ml-5">{recipe.description ? capitalize(recipe.description) : '' }</h5>
                <h5 className="text-left ml-5 recipe-detail-user"> <small> By: {`${capitalize(owner.firstName)} ${capitalize(owner.lastName)}`}</small></h5>
                <div className="actions ml-5 mb-3">
                  {
                    !authenticated && <div className="container text-left">
                      <span className="mr-3"><i className="far fa-thumbs-up" />
                        <span> {recipe.upvote}</span> </span>
                      <span className="mr-3"><i className="far fa-thumbs-down" />
                        <span> {recipe.downvote}</span> </span>
                      <span><i className="far fa-heart" />
                        <span> {recipe.favourites}</span> </span>
                    </div>
                  }
                  { authenticated &&
                  <div className="btn-group" role="group" >

                    <button
                      type="button"
                      title="upvote this recipe"
                      className="btn btn-outline-danger"
                      id="upvote"
                      onClick={this.handleUpvote}
                      disabled={fetching}
                    ><i className="far fa-thumbs-up" />
                      <span> {recipe.upvote}</span></button>

                    <button
                      type="button"
                      title="downvote this recipe"
                      className="btn btn-outline-danger"
                      id="downvote"
                      onClick={this.handleDownvote}
                      disabled={fetching}
                    ><i className="far fa-thumbs-down" />
                      <span> {recipe.downvote}</span></button>

                    <button
                      style={{
                        backgroundColor: favourited === true ? 'red' : 'white',
                        color: favourited === true ? 'white' : 'red'
                      }}
                      type="button"
                      title="add to your favourites"
                      className="btn btn-outline-danger"
                      id="favourite"
                      onClick={this.handleFavourite}
                    > <i className="far fa-heart" /></button>
                  </div>
                  }
                </div>
                <br />
                <h5 className="text-left ml-5 mb-3">INGREDIENTS</h5>
                <hr />
                <ul className="align-left container">
                  {splitIngredients}
                </ul>
              </div>
              <div className="container mt-3 mb-3 text-left">
                <h5 className="text-left ">DIRECTIONS</h5>
                <hr />
                {capitalize(directions)}
              </div>
            </div>
            <br />
            <div className="container-fluid" id="review-body">
              <h5 className="text-left mt-3 mb-3 ml-5">REVIEWS</h5>
              <div className="add-review-form align-center">
                {authenticated && <AddReview recipeId={recipe.id} />}
                <br />
              </div>
              <div className="container review-body">
                <Reviews recipeId={parseInt(this.props.match.params.recipeId, 10)} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
  authenticated: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  favourited: PropTypes.bool
};
Recipe.defaultProps = {
  recipe: {},
  favourited: false
};

const mapStateToProps = state => ({
  recipe: state.getOneRecipe.singleRecipe,
  favourited: state.getOneRecipe.favourited,
  authenticated: state.auth.isAuthenticated,
  error: state.getOneRecipe.errorMessage,
  fetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: recipeId => dispatch(getOneRecipe(recipeId)),
  upvoteRecipe: recipeId => dispatch(upvoteRecipe(recipeId)),
  downvoteRecipe: recipeId => dispatch(downvoteRecipe(recipeId)),
  favourite: recipeId => dispatch(addFavourites(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
