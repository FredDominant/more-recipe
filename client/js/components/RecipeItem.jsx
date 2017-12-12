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
              <span className="icons"><i className="fas fa-thumbs-up" /> <span id="likes">{this.props.upvotes} </span></span>
              <span className="icons"><i className="fas fa-thumbs-down" /> <span id="unlikes">{this.props.downvotes} </span></span>
              <span className="icons"><i className="fas fa-eye" /> <span id="views">{this.props.views} </span></span>
            </CardText>
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
  views: PropTypes.number.isRequired,
  recipeId: PropTypes.number.isRequired,
  image: PropTypes.string
};
RecipeItem.defaultProps = {
  image: 'https://s3.amazonaws.com/libapps/accounts/7712/images/veggie-heart.jpg'
};

export default RecipeItem;
