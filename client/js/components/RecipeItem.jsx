import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';

/**
 * @description
 *
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
  }
  /**
   *
   * @returns {null} null
   * @memberof RecipeItem
   */
  render() {
    return (
      <div className="recipeCard">
        <Card>
          <CardImg src={this.props.image} alt={this.props.recipeName} />
          <CardBody>
            <CardTitle>
              <span className="recipe-title">
                <Link to={`/recipe/${this.props.recipeId}`}> {this.props.recipeName} </Link>
              </span>
              <br />
            </CardTitle>
            <h6 className="recipe-owner"><i className="fas fa-user-circle" /> <span /> {this.props.owner}</h6>
            <hr />
            <CardText>
              <span className="recipe-description">
                {this.props.description}
              </span>
              <br />

              {/* <span className="icons"><i className="fas fa-thumbs-up" /> <span id="likes">{this.props.upvotes} </span></span>
              <span className="icons"><i className="fas fa-thumbs-down" /> <span id="unlikes">{this.props.downvotes} </span></span>
              <span className="icons"><i className="fas fa-eye" /> <span id="views">{this.props.views} </span></span> */}
            </CardText>
            <div className="btn-group" role="group" >

              <span
                title="upvote this recipe"
                className="btn btn-outline-danger"
                disabled
              ><i className="far fa-thumbs-up" /> <span id="likes">{this.props.upvotes} </span></span>

              <span
                title="downvote this recipe"
                className="btn btn-outline-danger"
                disabled
              ><i className="far fa-thumbs-down" /> <span id="unlikes">{this.props.downvotes} </span></span>

              <span
                title="add to your favourites"
                className="btn btn-outline-danger"
                disabled
              ><i className="fas fa-eye" /> <span id="views">{this.props.views} </span></span>

              {this.props.favouriteCard && <button
                type="button"
                title="remove from favourites"
                className="btn btn-outline-danger"
                onClick={() => { this.props.removeRecipe(this.props.recipeId); }}
              ><i className="fas fa-trash-alt" /> <span id="views">{this.props.views} </span></button>}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
RecipeItem.propTypes = {
  recipeName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  views: PropTypes.number,
  recipeId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  favouriteCard: PropTypes.string,
  removeRecipe: PropTypes.func
};
RecipeItem.defaultProps = {
  views: null,
  favouriteCard: null,
  removeRecipe: null
};

export default RecipeItem;
