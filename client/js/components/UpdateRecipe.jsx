import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
/**
 *
 *
 * @class UpdateRecipe
 * @extends {React.Component}
 */
class UpdateRecipe extends React.Component {
  /**
 * Creates an instance of UpdateRecipe.
 * @param {any} props
 * @memberof UpdateRecipe
 */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof UpdateRecipe
   */
  render() {
    return (
      <div>
        <div className="modal fade" id="update-recipe-modal" tabIndex="-1" role="dialog" aria-labelledby="update-recipe-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateRecipe">Update Recipe</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div id="update-recipe-form">
                  <form onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col-xs-3">
                        <div id="update-recipe-image">
                          <img src={this.state.recipeImage} alt="" className="img-rounded" />
                        </div>
                        <input
                          type="file"
                          name="file"
                          id="update-recipe-upload"
                          onChange={this.onUpload}
                        />
                      </div>
                      <div className="col-xs-6" />
                      <div className="form-group">
                        <label htmlFor="recipeName">Recipe Name</label>
                        <input
                          id="recipeName"
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="recipeDescription">Recipe Description</label>
                        <input
                          id="recipeDescription"
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.description}
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="update-recipeDirections">Recipe Directions</label>
                        <input
                          id="update-recipeDirections"
                          type="text"
                          className="form-control"
                          name="directions"
                          value={this.state.directions}
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="update-recipeIngredients">Recipe Ingredients</label>
                        <input
                          id="update-recipeIngredients"
                          type="text"
                          className="form-control"
                          name="ingredients"
                          value={this.state.ingredients}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary">Create Recipe</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateRecipe;
