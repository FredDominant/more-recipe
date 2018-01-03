import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Card,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';

/**
 * @description
 * @argument {props} props
 * @returns {jsx} JSX
 */
const RecipeItem = props =>
  (
    <div className="recipeCard container">
      <Card>
        <CardBody>
          <CardTitle>
            <img
              src={props.image}
              alt={props.recipeName}
              className="img-thumbnail img-responsive"
              id="recipe-images"
              height="100"
              width="100"
            />
            <br />
            <div id="recipe-title">
              <span className="recipe-title">
                <Link to={`/recipe/${props.recipeId}`}> {props.recipeName} </Link>
              </span>
            </div>
          </CardTitle>
          <h6 className="recipe-owner"><i className="fas fa-user-circle" /> <span /> {props.owner}</h6>
          {props.home && <small> Created {props.created}</small>}
          <hr />
          <CardText>
            <span className="recipe-description">
              {props.description}
            </span>
            <br />
          </CardText>
          <div className="btn-group" role="group" >

            <span
              title="upvote this recipe"
              className="btn btn-outline-danger"
              disabled
            ><i className="far fa-thumbs-up" /> <span id="likes">{props.upvotes} </span></span>

            <span
              title="downvote this recipe"
              className="btn btn-outline-danger"
              disabled
            ><i className="far fa-thumbs-down" /> <span id="unlikes">{props.downvotes} </span></span>

            <span
              title="add to your favourites"
              className="btn btn-outline-danger"
              disabled
            ><i className="fas fa-eye" /> <span id="views">{props.views} </span></span>
            {props.userRecipeCard && <button
              type="button"
              title="edit this recipe"
              className="btn btn-outline-danger"
            >
              <Link to={`/recipe/edit/${props.recipeId}`}> <i className="far fa-edit" /> </Link>
            </button>
            }
            {props.favouriteCard && <button
              type="button"
              title="remove from favourites"
              className="btn btn-outline-danger"
              onClick={() => { props.removeRecipe(props.recipeId); }}
            ><i className="fas fa-trash-alt" /></button>}

            {props.userRecipeCard && <button
              type="button"
              title="delete this recipe"
              className="btn btn-outline-danger"
              onClick={() => { props.onDelete(props.recipeId); }}
            ><i className="fas fa-trash-alt" /> </button>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
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
  userRecipeCard: PropTypes.string,
  removeRecipe: PropTypes.func,
  onDelete: PropTypes.func,
  created: PropTypes.string,
  home: PropTypes.string
};
RecipeItem.defaultProps = {
  views: null,
  favouriteCard: null,
  removeRecipe: null,
  userRecipeCard: null,
  onDelete: null,
  created: null,
  home: null
};

export default RecipeItem;
