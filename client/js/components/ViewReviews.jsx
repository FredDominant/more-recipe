import React from 'react';
import PropTypes from 'prop-types';

const ViewReviews = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-1">
        <div className="reviewer-image">
          <img src={props.image} alt={props.firstname} className="img-thumbnail" id="reviewer-image" />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="content">
          <h6> <strong> {`${props.firstname} ${props.lastname}`} </strong> </h6>
          <h6> <small> {props.content} </small> </h6>
        </div>
      </div>
    </div>
    <hr />
  </div>
);

ViewReviews.propTypes = {
  content: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ViewReviews;
