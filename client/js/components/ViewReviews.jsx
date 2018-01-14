import React from 'react';
import PropTypes from 'prop-types';

const ViewReviews = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
        <div className="reviewer-image">
          <img src={props.image} alt={props.firstname} className="rounded float-left img-fluid" id="reviewer-image" />
        </div>
      </div>
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-9">
        <div className="content text-left mb-5">
          <h5 className="reviewer-name"> {`${props.firstname} ${props.lastname}`} </h5>
          <h6> {props.content} </h6>
          <h6> <small id="review-date">{props.created} </small> </h6>
        </div>
      </div>
    </div>
  </div>
);

ViewReviews.propTypes = {
  content: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired
};

export default ViewReviews;
