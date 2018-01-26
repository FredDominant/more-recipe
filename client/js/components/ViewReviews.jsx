import React from 'react';
import PropTypes from 'prop-types';

const ViewReviews = ({
  image,
  firstname,
  lastname,
  createdAt,
  content
}) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
        <div className="reviewer-image">
          <img
            src={image}
            alt={firstname}
            className="rounded float-left img-fluid"
            id="reviewer-image"
          />
        </div>
      </div>
      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
        <div className="content text-left mb-5">
          <h5 className="reviewer-name"> <small> {`${firstname} ${lastname}`} </small> </h5>
          <h6> <small>{content} </small></h6>
          <h6> <small id="review-date">{createdAt} </small> </h6>
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
