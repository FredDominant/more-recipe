import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDelete = props => (
  <div className="modal" tabIndex="-1" role="dialog" id="confirmDelete">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <h5 className="text-center mt-3 mb-4">Are you sure you want to delete this recipe ?</h5>
          <div className="container text-center">
            <button
              type="button"
              className="btn btn-danger mr-5"
              data-dismiss="modal"
              // onClick={() => { console.log('recipe Id is', props.recipeId); }}
              onClick={() => { props.removeRecipe(props.recipeId); }}
            >Delete</button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
ConfirmDelete.propTypes = {
  removeRecipe: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired
};
export default ConfirmDelete;

