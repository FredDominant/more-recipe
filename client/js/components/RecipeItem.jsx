import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Card,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';

import capitalize from '../utils/capitalize';
/**
 * @description renders a recipe item card
 * @class RecipeItem
 * @extends {React.Component}
 */
class RecipeItem extends React.Component {
  /**
 * Creates an instance of RecipeItem.
 * @param {any} props
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
   * @returns {node} JSX
   */
  render() {
    return (
      <div className="stuff">
        <div className="recipeCard container">
          <Card>
            <CardBody>
              <CardTitle>
                <img
                  src={this.props.image}
                  alt={this.props.recipeName}
                  className="img-thumbnail img-responsive"
                  id="recipe-images"
                  height="100"
                  width="100"
                />
                <br />
                <div id="recipe-title">
                  <span className="recipe-title text-left">
                    <Link to={`/recipe/${this.props.recipeId}`}> {capitalize(this.props.recipeName)} </Link>
                  </span>
                </div>
              </CardTitle>
              {
                this.props.owner && <h6 className="recipe-owner"><i className="fas fa-user-circle" /> <span /> {this.props.owner}</h6>
              }
              {this.props.home && <small> Created {this.props.created}</small>}
              <hr />
              <CardText>
                <span className="recipe-description text-left">
                  {capitalize(this.props.description)}
                </span>
                <br />
              </CardText>
              {
                this.props.authenticated && <div className="all-buttons text-left">
                  <div className="btn-group" role="group" >

                    <button
                      title="number of downvotes"
                      className="btn btn-outline-danger"
                      disabled
                    ><i className="far fa-thumbs-up" />
                      <span id="likes">{this.props.upvotes} </span></button>

                    <button
                      title="number of downvotes"
                      className="btn btn-outline-danger"
                      disabled
                    ><i className="far fa-thumbs-down" />
                      <span id="unlikes">{this.props.downvotes} </span></button>

                    <button
                      title="number of views"
                      className="btn btn-outline-danger"
                      disabled
                    ><i className="fas fa-eye" />
                      <span id="views">{this.props.views} </span></button>
                    {this.props.userRecipeCard && <button
                      type="button"
                      title="edit this recipe"
                      className="btn btn-outline-danger"
                    >
                      <Link to={`/recipe/edit/${this.props.recipeId}`}> <i className="far fa-edit" /> </Link>
                    </button>
                    }
                    {this.props.favouriteCard && <button
                      type="button"
                      title="remove from favourites"
                      className="btn btn-outline-danger"
                      onClick={this.onRemoveFavourite}
                    ><i className="fas fa-trash-alt" /></button>}

                    {this.props.userRecipeCard && <button
                      type="button"
                      title="delete this recipe"
                      className="btn btn-outline-danger"
                      onClick={this.onDeleteRecipe}
                    ><i className="fas fa-trash-alt" /> </button>}
                  </div>
                </div>
              }
              {
                !this.props.authenticated && <div className="container text-left">
                  <div className="row">
                    <div className="col-sm-4"><i className="far fa-thumbs-up" />
                      <span id="likes"> {this.props.upvotes} </span></div>
                    <div className="col-sm-4"><i className="far fa-thumbs-down" />
                      <span id="unlikes"> {this.props.downvotes} </span></div>
                    <div className="col-sm-4"><i className="fas fa-eye" />
                      <span id="views"> {this.props.views} </span></div>
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
  owner: null
};
const mapStateToprops = state => ({
  authenticated: state.auth.isAuthenticated
});
export default connect(mapStateToprops, {})(RecipeItem);
