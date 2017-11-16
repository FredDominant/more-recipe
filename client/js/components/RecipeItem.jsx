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
                        <span className="recipe-title">Random Recipe Name Here </span> 
                        <br/>
                        <h6 className="recipe-owner"><span><i class="fa fa-user-circle-o" aria-hidden="true"></i> </span>RANDOM DUDE</h6>
                    </CardTitle>
                    <hr/>
                    <CardText>
                        <div className="recipe-description">
                            <h6> This is just a random recipe description. I love food, I really love food.</h6>
                        </div>
                        <hr/>
                        <div className="recipe-icons">
                            <span className="icons"><i className="fa fa-thumbs-up" aria-hidden="true"></i> <span id="likes">100</span></span>
                            <span className="icons"><i className="fa fa-thumbs-down" aria-hidden="true"></i> <span id="unlikes">16</span></span>
                            <span className="icons"><i className="fa fa-eye" aria-hidden="true"></i> <span id="views">45</span></span>
                        </div>
                        {/* <div className="row">
                            <span className="col-sm-4 recipe-body">
                                <span className="likes"><i className="fa fa-thumbs-up" aria-hidden="true"></i> <span id="likes">100</span></span>
                            </span>
                            <span className="col-sm-4">
                                <span className="unlikes"><i className="fa fa-thumbs-down" aria-hidden="true"></i> <span id="dislikes">15</span></span>
                            </span>
                            <span className="col-sm-4">
                                <span className="views"><i className="fa fa-eye" aria-hidden="true"></i> <span id="views">4</span></span>
                            </span>
                        </div> */}
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
  }
}
export default RecipeItem;
