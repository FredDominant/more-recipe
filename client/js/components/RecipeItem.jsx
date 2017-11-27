import React from 'react';
import PropTypes from 'prop-types';

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
          <CardImg src="https://s3.amazonaws.com/libapps/accounts/7712/images/veggie-heart.jpg" alt="recipeName" />
          <CardBody>
            <CardTitle>
              <span className="recipe-title">{this.props.recipeName}</span>
              <br />
            </CardTitle>
            <h6 className="recipe-owner"><span><i className="fa fa-user-circle-o" aria-hidden="true" /> </span>{this.props.owner}</h6>
            <hr />
            <CardText>
              <span className="recipe-description">
                {this.props.description}
              </span>
              <br />
              <span className="icons"><i className="fa fa-thumbs-up" aria-hidden="true" /> <span id="likes">{this.props.upvotes} </span></span>
              <span className="icons"><i className="fa fa-thumbs-down" aria-hidden="true" /> <span id="unlikes">{this.props.downvotes} </span></span>
              <span className="icons"><i className="fa fa-eye" aria-hidden="true" /> <span id="views">{this.props.views} </span></span>
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
  views: PropTypes.number.isRequired
};

export default RecipeItem;
