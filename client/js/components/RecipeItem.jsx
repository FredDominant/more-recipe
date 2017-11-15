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
                <CardImg src='recipe image url' alt='recipeName' />
                <CardBody>
                    <CardTitle> recipe name </CardTitle>
                    <CardText>
                        Recipe description will be here
                        <div className="row">
                            <span className="col-sm-4">
                                <span className="likes"><i class="fa fa-thumbs-up" aria-hidden="true"></i>: <span id="likes">likes</span></span>
                            </span>
                            <br/>
                            <span className="col-sm-4">
                                <span className="unlikes"><i class="fa fa-thumbs-down" aria-hidden="true"></i>: <span id="dislikes">unlikes</span></span>
                            </span>
                            <br/>
                            <span className="col-sm-4">
                                <span className="views"><i class="fa fa-eye" aria-hidden="true"></i>: <span id="views">views</span></span>
                            </span>
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
  }
}
export default RecipeItem;
