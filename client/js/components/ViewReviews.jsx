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
          <h6> <small id="review-date">{props.createdAt} </small> </h6>
        </div>
      </div>
    </div>
  </div>
);
ViewReviews.propTypes = {
  image: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
};

ViewReviews.defaultProps = {
  image: '',
  firstname: '',
  lastname: '',
  content: '',
  createdAt: ''
};
export default ViewReviews;
