import React from 'react';
import PropTypes from 'prop-types';

const ViewReviews = ({
  imageUrl,
  firstName,
  lastName,
  createdAt,
  content
}) => (
  <div className="">
    <div className="row">
      <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
        <div className="reviewer-image">
          <img
            src={imageUrl}
            alt={firstName}
            className="rounded float-left img-fluid"
            id="reviewer-image"
          />
        </div>
      </div>
      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
        <div className="content text-left mb-5">
          <h5 className="reviewer-name"> <small> {`${firstName} ${lastName}`} </small> </h5>
          <h6> <small>{content} </small></h6>
          <h6> <small id="review-date">{createdAt} </small> </h6>
        </div>
      </div>
    </div>
  </div>
);
ViewReviews.propTypes = {
  imageUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
};

ViewReviews.defaultProps = {
  imageUrl: '',
  firstName: '',
  lastName: '',
  content: '',
  createdAt: ''
};
export default ViewReviews;
