import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

const UserRecipeCard = props => (
  <div>
    <Card>
      <CardImg src={props.image} />
      <CardBody>
        <CardTitle><Link to={`/recipe/edit/${props.id}`}>{props.name}</Link></CardTitle>
        <CardText>{props.description}</CardText>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => { props.onView(props.id); }}
          ><i className="fas fa-angle-double-right" /></button>

          <button
            type="button"
            className="btn btn-outline-danger"
          >
            <Link to={`/recipe/edit/${props.id}`}> <i className="far fa-edit" /> </Link>
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => { props.onDelete(props.id); }}
          ><i className="far fa-trash-alt" /></button>
        </div>
      </CardBody>
    </Card>
  </div>
);

UserRecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default UserRecipeCard;
