import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import capitalize from '../utils/capitalize';
/**
 * @description renders a recipe item card
 *
 * @class RecipeItem
 *
 * @extends {React.Component}
 */
export class RecipeItem extends React.Component {
  /**
 * @description Creates an instance of RecipeItem.
 *
 * @param {object} props
 *
 * @memberof RecipeItem
 */
  constructor(props) {
    super(props);
    this.state = {};
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    this.onRemoveFavourite = this.onRemoveFavourite.bind(this);
  }
  /**
   *
   * @memberof RecipeItem
   *
   * @returns {null} null
   */
  onDeleteRecipe() {
    confirmAlert({
      title: 'Delete this recipe',
      message: 'Are you sure you want to delete this recipe ?',
      confirmLabel: 'Yes, delete!',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.onDelete(this.props.recipeId),
    });
  }
  /**
   *
   * @memberof RecipeItem
   *
   * @returns {null} null
   */
  onRemoveFavourite() {
    confirmAlert({
      title: 'Remove from favourite',
      message: 'Remove this recipe from your favourites ?',
      confirmLabel: 'Yes, remove!',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.removeRecipe(this.props.recipeId),
    });
  }
  /**
   *
   * @memberof RecipeItem
   *
   * @return {ReactElement} markup
   */
  render() {
    const {
      authenticated,
      image,
      recipeName,
      recipeId,
      owner,
      description,
      created,
      home,
      upvotes,
      downvotes,
      favourites,
      views,
      userRecipeCard,
      favouriteCard
    } = this.props;
    return (
      <div className="stuff">
        <div className="recipeCard container">
          <Card>
            <CardBody>
              <CardTitle>
                <img
                  src={image}
                  alt={recipeName}
                  className="img-thumbnail img-responsive"
                  id="recipe-images"
                  height="100"
                  width="100"
                />
                <br />
                <div id="recipe-title">
                  <span className="recipe-title text-left">
                    <Link to={`/recipe/${recipeId}`} id="recipe-details"> {capitalize(recipeName)} </Link>
                  </span>
                </div>
              </CardTitle>
              {
                owner &&
                <h6 className="recipe-owner">
                  <i className="fas fa-user-circle" /> {owner}
                </h6>
              }
              {
                home && <small> Created {created}</small>
              }
              <hr />
              <CardText>
                <span className="recipe-description text-left ">
                  {capitalize(description)}
                </span>
                <br />
              </CardText>
              {
                authenticated && <div className="all-buttons text-left">
                  <div className="btn-group" role="group" >

                    { home && <button
                      title="number of downvotes"
                      className="btn btn-outline-danger"
                      disabled
                    >
                      <i className="far fa-thumbs-up" />
                      <span id="likes"> {upvotes} </span>
                    </button>
                    }

                    { home && <button
                      title="number of downvotes"
                      className="btn btn-outline-danger"
                      disabled
                    >
                      <i className="far fa-thumbs-down" />
                      <span id="unlikes"> {downvotes} </span>
                    </button>
                    }

                    {
                      (userRecipeCard || home) && <button
                        title="number of favourites"
                        className="btn btn-outline-danger"
                        disabled
                      >
                        <i className="far fa-heart" />
                        <span> {favourites}</span>
                      </button>
                    }
                    {
                      !favouriteCard && <button
                        title="number of views"
                        className="btn btn-outline-danger"
                        disabled
                      >
                        <i className="fas fa-eye" />
                        <span id="views"> {views} </span>
                      </button>
                    }
                    {
                      userRecipeCard && <button
                        type="button"
                        title="edit this recipe"
                        className="btn btn-outline-danger"
                        id="edit-recipe"
                      >
                        <Link to={`/recipe/edit/${recipeId}`} className="edit-recipe-link">
                          <i className="far fa-edit" />
                        </Link>
                      </button>
                    }
                    {
                      favouriteCard && <button
                        type="button"
                        title="remove from favourites"
                        className="btn btn-outline-danger"
                        id="remove-favourite"
                        onClick={this.onRemoveFavourite}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    }

                    {
                      userRecipeCard && <button
                        type="button"
                        title="delete this recipe"
                        id="deleteRecipe"
                        className="btn btn-outline-danger"
                        onClick={this.onDeleteRecipe}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    }
                  </div>
                </div>
              }
              {
                !authenticated && <div className="container text-left">
                  <div className="row">
                    <div className="col-sm-3">
                      <i className="far fa-thumbs-up" />
                      <span id="likes"> {upvotes} </span>
                    </div>
                    <div className="col-sm-3">
                      <i className="far fa-thumbs-down" />
                      <span id="unlikes"> {downvotes} </span>
                    </div>
                    <div className="col-sm-3">
                      <i className="far fa-heart" />
                      <span id="likes"> {favourites} </span>
                    </div>
                    <div className="col-sm-3">
                      <i className="fas fa-eye" />
                      <span id="views"> {views} </span>
                    </div>
                  </div>
                </div>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
RecipeItem.propTypes = {
  recipeName: PropTypes.string.isRequired,
  owner: PropTypes.string,
  description: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  favourites: PropTypes.number,
  views: PropTypes.number,
  recipeId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  favouriteCard: PropTypes.string,
  userRecipeCard: PropTypes.string,
  removeRecipe: PropTypes.func,
  onDelete: PropTypes.func,
  created: PropTypes.string,
  home: PropTypes.string,
  authenticated: PropTypes.bool.isRequired
};
RecipeItem.defaultProps = {
  views: null,
  favouriteCard: null,
  removeRecipe: null,
  userRecipeCard: null,
  onDelete: null,
  created: null,
  home: null,
  owner: null,
  favourites: null
};
const mapStateToprops = state => ({
  authenticated: state.auth.isAuthenticated
});
export default connect(mapStateToprops, {})(RecipeItem);
