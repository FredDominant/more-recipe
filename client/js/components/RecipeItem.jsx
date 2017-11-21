import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button } from 'reactstrap';

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
  render() {
    return (
        <div className="recipeCard">
            <Card>
                <CardImg src='https://s3.amazonaws.com/libapps/accounts/7712/images/veggie-heart.jpg' alt='recipeName' />
                <CardBody>
                    <CardTitle>
                        <span className="recipe-title">{this.props.recipeName}</span>
                        <br/>
                    </CardTitle>
                    <h6 className="recipe-owner"><span><i className="fa fa-user-circle-o" aria-hidden="true"></i> </span>{this.props.owner}</h6>
                    <hr/>
                    <CardText>
                        <div className="recipe-description">
                            <h6> {this.props.description}</h6>
                        </div>
                        <hr/>
                        <div className="recipe-icons">
                            <span className="icons"><i className="fa fa-thumbs-up" aria-hidden="true"></i> <span id="likes">{this.props.upvotes} </span></span>
                            <span className="icons"><i className="fa fa-thumbs-down" aria-hidden="true"></i> <span id="unlikes">{this.props.downvotes} </span></span>
                            <span className="icons"><i className="fa fa-eye" aria-hidden="true"></i> <span id="views">{this.props.views} </span></span>
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
  }
}
export default RecipeItem;
