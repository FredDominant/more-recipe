import React from 'react';
import PropTypes from 'prop-types';

const ViewReviews = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-3">
        <div className="reviewer-image">
          <img src="" alt="" height="100" width="20" className="img-rounded" />
        </div>
      </div>
      <div className="col-sm-9">
        <div className="content">
          <h6> {props.content} </h6>
          <h6> - <small>{`${props.firstname} ${props.lastname}`} </small> </h6>
        </div>
      </div>
    </div>
    <hr />
  </div>
);

ViewReviews.propTypes = {
  content: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired
};

export default ViewReviews;
